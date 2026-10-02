<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Supplier;

class SupplierController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'address' => 'nullable|string|max:255',
            'opening_balance' => 'nullable|numeric',
            'status' => 'nullable|in:Active,Inactive',
        ]);

        Supplier::create([
            'name' => $validated['name'],
            'phone' => $validated['phone'] ?? null,
            'email' => $validated['email'] ?? null,
            'address' => $validated['address'] ?? null,
            'opening_balance' => $validated['opening_balance'] ?? 0,
            'status' => $validated['status'] ?? 'Active',
        ]);

        return back()->with('success', 'Supplier added successfully!');
    }

    public function update(Request $request, $id)
    {
        $supplier = Supplier::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'address' => 'nullable|string|max:255',
            'opening_balance' => 'nullable|numeric',
            'status' => 'nullable|in:Active,Inactive',
        ]);

        $supplier->update([
            'name' => $validated['name'],
            'phone' => $validated['phone'] ?? null,
            'email' => $validated['email'] ?? null,
            'address' => $validated['address'] ?? null,
            'opening_balance' => $validated['opening_balance'] ?? $supplier->opening_balance,
            'status' => $validated['status'] ?? $supplier->status,
        ]);

        return back()->with('success', 'Supplier updated successfully!');
    }

    public function destroy($id)
    {
        $supplier = Supplier::findOrFail($id);
        $supplier->delete();

        return back()->with('success', 'Supplier deleted successfully!');
    }
}
