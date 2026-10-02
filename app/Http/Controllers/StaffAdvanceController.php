<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\StaffAdvance;
use App\Models\Transaction;
use App\Models\User;

class StaffAdvanceController extends Controller
{
    public function store(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            abort(403);
        }

        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'amount' => 'required|numeric|min:0.01',
            'date' => 'required|date',
            'note' => 'nullable|string|max:500',
        ]);

        $user = User::findOrFail($validated['user_id']);

        $advance = StaffAdvance::create([
            'user_id' => $validated['user_id'],
            'amount' => $validated['amount'],
            'date' => $validated['date'],
            'note' => $validated['note'] ?? null,
            'deducted' => false,
            'created_by' => $request->user()->id,
        ]);

        Transaction::create([
            'type' => 'expense',
            'amount' => $validated['amount'],
            'category' => 'Staff Advance',
            'description' => "Advance to {$user->name}",
            'work_project_id' => null,
            'source_type' => 'advance',
            'source_id' => $advance->id,
            'date' => $validated['date'],
            'created_by' => $request->user()->id,
        ]);

        return back()->with('success', 'Advance recorded successfully!');
    }

    public function destroy(Request $request, $id)
    {
        if ($request->user()->role !== 'admin') {
            abort(403);
        }

        $advance = StaffAdvance::findOrFail($id);

        if ($advance->deducted) {
            return back()->withErrors(['advance' => 'This advance has already been applied to a paid salary and cannot be deleted.']);
        }

        Transaction::where('source_type', 'advance')->where('source_id', $id)->delete();

        $advance->delete();

        return back()->with('success', 'Advance deleted successfully!');
    }
}
