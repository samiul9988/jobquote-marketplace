<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customer;

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
        ]);

        Customer::create([
            'name' => $validated['name'],
            'email' => $validated['email'] ?? null,
            'phone' => $validated['phone'] ?? null,
            'address' => $validated['address'] ?? null,
            'status' => $validated['status'] ?? 'Lead',
            'source' => 'Manual',
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
        ]);

        $customer->update([
            'name' => $validated['name'],
            'email' => $validated['email'] ?? null,
            'phone' => $validated['phone'] ?? null,
            'address' => $validated['address'] ?? null,
            'status' => $validated['status'] ?? $customer->status,
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

        return back()->with('success', 'Note added successfully!');
    }

    public function updateStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:Lead,Active,Inactive',
        ]);

        $customer = Customer::findOrFail($id);
        $customer->update(['status' => $validated['status']]);

        return back()->with('success', 'Customer status updated!');
    }
}
