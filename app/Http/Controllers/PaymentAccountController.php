<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PaymentAccount;

class PaymentAccountController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'label' => 'required|string|max:255',
            'type' => 'required|in:bank,bkash,nagad,paypal,other',
            'account_name' => 'nullable|string|max:255',
            'account_number' => 'nullable|string|max:100',
            'bank_name' => 'nullable|string|max:255',
            'sort_code' => 'nullable|string|max:50',
            'iban' => 'nullable|string|max:100',
            'swift_code' => 'nullable|string|max:50',
            'instructions' => 'nullable|string|max:2000',
            'order' => 'nullable|integer',
            'status' => 'nullable|in:Active,Inactive',
        ]);

        PaymentAccount::create([
            ...$validated,
            'order' => $validated['order'] ?? 0,
            'status' => $validated['status'] ?? 'Active',
        ]);

        return back()->with('success', 'Payment account added successfully!');
    }

    public function update(Request $request, $id)
    {
        $account = PaymentAccount::findOrFail($id);

        $validated = $request->validate([
            'label' => 'required|string|max:255',
            'type' => 'required|in:bank,bkash,nagad,paypal,other',
            'account_name' => 'nullable|string|max:255',
            'account_number' => 'nullable|string|max:100',
            'bank_name' => 'nullable|string|max:255',
            'sort_code' => 'nullable|string|max:50',
            'iban' => 'nullable|string|max:100',
            'swift_code' => 'nullable|string|max:50',
            'instructions' => 'nullable|string|max:2000',
            'order' => 'nullable|integer',
            'status' => 'nullable|in:Active,Inactive',
        ]);

        $account->update([
            ...$validated,
            'order' => $validated['order'] ?? $account->order,
            'status' => $validated['status'] ?? $account->status,
        ]);

        return back()->with('success', 'Payment account updated successfully!');
    }

    public function destroy($id)
    {
        PaymentAccount::findOrFail($id)->delete();

        return back()->with('success', 'Payment account deleted successfully!');
    }
}
