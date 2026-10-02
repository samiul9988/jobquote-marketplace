<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FinanceAccount;

class FinanceAccountController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:cash,bank,mobile',
            'account_number' => 'nullable|string|max:100',
            'opening_balance' => 'nullable|numeric',
            'status' => 'nullable|in:Active,Inactive',
        ]);

        FinanceAccount::create([
            'name' => $validated['name'],
            'type' => $validated['type'],
            'account_number' => $validated['account_number'] ?? null,
            'opening_balance' => $validated['opening_balance'] ?? 0,
            'status' => $validated['status'] ?? 'Active',
        ]);

        return back()->with('success', 'Account created successfully!');
    }

    public function update(Request $request, $id)
    {
        $account = FinanceAccount::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:cash,bank,mobile',
            'account_number' => 'nullable|string|max:100',
            'opening_balance' => 'nullable|numeric',
            'status' => 'nullable|in:Active,Inactive',
        ]);

        $account->update([
            'name' => $validated['name'],
            'type' => $validated['type'],
            'account_number' => $validated['account_number'] ?? null,
            'opening_balance' => $validated['opening_balance'] ?? $account->opening_balance,
            'status' => $validated['status'] ?? $account->status,
        ]);

        return back()->with('success', 'Account updated successfully!');
    }

    public function destroy($id)
    {
        $account = FinanceAccount::findOrFail($id);
        $account->delete();

        return back()->with('success', 'Account deleted successfully!');
    }
}
