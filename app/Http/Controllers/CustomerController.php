<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customer;
use App\Models\CustomerLog;

class CustomerController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
            'status' => 'nullable|in:Lead,Active,Inactive',
            'credit_limit' => 'nullable|numeric|min:0',
        ]);

        $customer = Customer::create([
            'name' => $validated['name'],
            'email' => $validated['email'] ?? null,
            'phone' => $validated['phone'] ?? null,
            'address' => $validated['address'] ?? null,
            'status' => $validated['status'] ?? 'Lead',
            'credit_limit' => $validated['credit_limit'] ?? 0,
            'source' => 'Manual',
        ]);

        CustomerLog::create([
            'customer_id' => $customer->id,
            'action' => 'created',
            'description' => 'Customer added manually by ' . $request->user()->name,
            'created_by' => $request->user()->id,
        ]);

        return back()->with('success', 'Customer added successfully!');
    }

    public function update(Request $request, $id)
    {
        $customer = Customer::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
            'status' => 'nullable|in:Lead,Active,Inactive',
            'credit_limit' => 'nullable|numeric|min:0',
        ]);

        $customer->update([
            'name' => $validated['name'],
            'email' => $validated['email'] ?? null,
            'phone' => $validated['phone'] ?? null,
            'address' => $validated['address'] ?? null,
            'status' => $validated['status'] ?? $customer->status,
            'credit_limit' => $validated['credit_limit'] ?? $customer->credit_limit,
        ]);

        CustomerLog::create([
            'customer_id' => $customer->id,
            'action' => 'updated',
            'description' => 'Customer details updated',
            'created_by' => $request->user()->id,
        ]);

        return back()->with('success', 'Customer updated successfully!');
    }

    public function destroy($id)
    {
        $customer = Customer::findOrFail($id);
        $customer->delete();

        return back()->with('success', 'Customer deleted successfully!');
    }

    public function addNote(Request $request, $id)
    {
        $request->validate([
            'note' => 'required|string',
        ]);

        $customer = Customer::findOrFail($id);
        $notes = $customer->notes ?? [];
        $notes[] = [
            'text' => $request->input('note'),
            'created_at' => now()->toDateTimeString(),
        ];
        $customer->update(['notes' => $notes]);

        CustomerLog::create([
            'customer_id' => $customer->id,
            'action' => 'note_added',
            'description' => 'Note added',
            'created_by' => $request->user()->id,
        ]);

        return back()->with('success', 'Note added successfully!');
    }

    public function updateStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:Lead,Active,Inactive',
        ]);

        $customer = Customer::findOrFail($id);
        $customer->update(['status' => $validated['status']]);

        CustomerLog::create([
            'customer_id' => $customer->id,
            'action' => 'status_changed',
            'description' => "Status changed to {$validated['status']}",
            'created_by' => $request->user()->id,
        ]);

        return back()->with('success', 'Customer status updated!');
    }

    /**
     * Bulk import customers from a CSV file.
     * Expected columns (any order, case-insensitive): name, email, phone, address, status.
     */
    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:csv,txt',
        ]);

        $path = $request->file('file')->getRealPath();
        $handle = fopen($path, 'r');

        $imported = 0;
        $skipped = 0;
        $errors = [];

        if ($handle === false) {
            return back()->with('import_result', [
                'imported' => 0,
                'skipped' => 0,
                'errors' => ['Could not read the uploaded file.'],
            ]);
        }

        $headerRow = fgetcsv($handle);
        if (!$headerRow) {
            fclose($handle);
            return back()->with('import_result', [
                'imported' => 0,
                'skipped' => 0,
                'errors' => ['The CSV file appears to be empty.'],
            ]);
        }

        $headerMap = [];
        foreach ($headerRow as $idx => $col) {
            $headerMap[strtolower(trim($col))] = $idx;
        }

        if (!array_key_exists('name', $headerMap)) {
            fclose($handle);
            return back()->with('import_result', [
                'imported' => 0,
                'skipped' => 0,
                'errors' => ['A "name" column is required in the CSV header.'],
            ]);
        }

        $rowNum = 1;
        while (($row = fgetcsv($handle)) !== false) {
            $rowNum++;
            if (count($row) === 1 && trim((string) $row[0]) === '') {
                continue; // skip blank lines
            }

            $get = function (string $key) use ($row, $headerMap) {
                if (!array_key_exists($key, $headerMap)) return null;
                $idx = $headerMap[$key];
                return isset($row[$idx]) ? trim((string) $row[$idx]) : null;
            };

            $name = $get('name');
            if (empty($name)) {
                $errors[] = "Row {$rowNum}: missing name, skipped.";
                continue;
            }

            $email = $get('email') ?: null;
            $phone = $get('phone') ?: null;
            $address = $get('address') ?: null;
            $status = $get('status');
            if (!in_array($status, ['Lead', 'Active', 'Inactive'], true)) {
                $status = 'Lead';
            }

            $existing = null;
            if ($email) {
                $existing = Customer::where('email', $email)->first();
            }
            if (!$existing && $phone) {
                $existing = Customer::where('phone', $phone)->first();
            }

            if ($existing) {
                $skipped++;
                continue;
            }

            $customer = Customer::create([
                'name' => $name,
                'email' => $email,
                'phone' => $phone,
                'address' => $address,
                'status' => $status,
                'source' => 'CSV Import',
            ]);

            CustomerLog::create([
                'customer_id' => $customer->id,
                'action' => 'imported',
                'description' => 'Imported via CSV',
                'created_by' => $request->user()->id,
            ]);

            $imported++;
        }

        fclose($handle);

        return back()->with('import_result', [
            'imported' => $imported,
            'skipped' => $skipped,
            'errors' => $errors,
        ]);
    }
}
