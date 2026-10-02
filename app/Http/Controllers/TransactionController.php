<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;

class TransactionController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|in:income,expense',
            'amount' => 'required|numeric|min:0.01',
            'category' => 'required|string|max:100',
            'description' => 'nullable|string|max:1000',
            'work_project_id' => 'nullable|exists:work_projects,id',
            'finance_account_id' => 'nullable|exists:finance_accounts,id',
            'supplier_id' => 'nullable|exists:suppliers,id',
            'date' => 'required|date',
        ]);

        Transaction::create([
            'type' => $validated['type'],
            'amount' => $validated['amount'],
            'category' => $validated['category'],
            'description' => $validated['description'] ?? null,
            'work_project_id' => $validated['work_project_id'] ?? null,
            'finance_account_id' => $validated['finance_account_id'] ?? null,
            'supplier_id' => $validated['supplier_id'] ?? null,
            'date' => $validated['date'],
            'source_type' => 'manual',
            'created_by' => $request->user()->id,
        ]);

        return back()->with('success', 'Transaction recorded successfully!');
    }

    public function destroy($id)
    {
        $transaction = Transaction::findOrFail($id);

        if ($transaction->source_type !== 'manual') {
            return back()->withErrors(['transaction' => 'Automatically generated transactions cannot be deleted directly.']);
        }

        $transaction->delete();

        return back()->with('success', 'Transaction deleted successfully!');
    }
}
