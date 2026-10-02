<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Quote;
use App\Models\Customer;
use App\Models\CustomerLog;

class QuoteController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'service' => 'nullable|string|max:255',
            'propertyType' => 'nullable|string|max:255',
            'projectSize' => 'nullable|string|max:255',
            'message' => 'nullable|string'
        ]);

        $customer = $this->findOrCreateCustomer([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
        ], 'Quote Form');

        Quote::create([
            'customer_id' => $customer->id,
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'service' => $validated['service'] ?? null,
            'property_type' => $validated['propertyType'] ?? null,
            'project_size' => $validated['projectSize'] ?? null,
            'message' => $validated['message'] ?? null,
        ]);

        return back()->with('success', 'Quote request submitted successfully!');
    }

    public function storeTrade(Request $request)
    {
        $validated = $request->validate([
            'trade' => 'required|string|max:255',
            'answers' => 'required|string',
            'description' => 'nullable|string|max:5000',
            'photos' => 'nullable|array|max:5',
            'photos.*' => 'image|max:5120',
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'required|email|max:255',
            'address' => 'nullable|string|max:500',
            'postcode' => 'required|string|max:10',
        ]);

        $answers = json_decode($request->input('answers'), true);
        if (!is_array($answers)) {
            $answers = [];
        }

        $paths = [];
        foreach ($request->file('photos', []) as $photo) {
            $paths[] = '/storage/' . $photo->store('quotes', 'public');
        }

        $lines = [];
        foreach ($answers as $question => $answer) {
            $lines[] = $question . ': ' . (is_array($answer) ? implode(', ', $answer) : $answer);
        }
        if ($request->filled('description')) {
            $lines[] = 'Details: ' . $request->input('description');
        }

        $customer = $this->findOrCreateCustomer([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'address' => $validated['address'],
        ], 'Find a Tradesperson');

        Quote::create([
            'customer_id' => $customer->id,
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'address' => $validated['address'],
            'postcode' => $validated['postcode'],
            'service' => $request->input('trade'),
            'message' => implode("\n", $lines),
            'details' => $answers,
            'photos' => $paths,
        ]);

        return back()->with('success', 'Quote request submitted successfully!');
    }

    public function markAsRead($id)
    {
        $quote = Quote::findOrFail($id);
        $quote->update(['status' => 'Read']);
        return back();
    }

    /**
     * Find an existing customer by email or phone, or create a new one.
     * Updates the customer's info with better data when available, without
     * overwriting non-empty existing fields with empty ones.
     */
    private function findOrCreateCustomer(array $data, string $source): Customer
    {
        $email = trim($data['email'] ?? '');
        $phone = trim($data['phone'] ?? '');

        $customer = null;
        if ($email !== '') {
            $customer = Customer::where('email', $email)->first();
        }
        if (!$customer && $phone !== '') {
            $customer = Customer::where('phone', $phone)->first();
        }

        if (!$customer) {
            $customer = Customer::create([
                'name' => $data['name'] ?? 'Website enquiry',
                'email' => $email !== '' ? $email : null,
                'phone' => $phone !== '' ? $phone : null,
                'address' => $data['address'] ?? null,
                'status' => 'Lead',
                'source' => $source,
            ]);

            CustomerLog::create([
                'customer_id' => $customer->id,
                'action' => 'created',
                'description' => 'Auto-created from a website quote request',
                'created_by' => null,
            ]);

            return $customer;
        }

        $updates = [];
        if (!empty($data['name']) && empty($customer->name)) {
            $updates['name'] = $data['name'];
        }
        if ($email !== '' && empty($customer->email)) {
            $updates['email'] = $email;
        }
        if ($phone !== '' && empty($customer->phone)) {
            $updates['phone'] = $phone;
        }
        if (!empty($data['address']) && empty($customer->address)) {
            $updates['address'] = $data['address'];
        }
        if (!empty($updates)) {
            $customer->update($updates);
        }

        return $customer;
    }
}
