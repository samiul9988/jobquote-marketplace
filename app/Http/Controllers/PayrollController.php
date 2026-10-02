<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SalaryPayment;
use App\Models\StaffAdvance;
use App\Models\TimeEntry;
use App\Models\Transaction;
use App\Models\User;

class PayrollController extends Controller
{
    public function generate(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            abort(403);
        }

        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'period_start' => 'required|date',
            'period_end' => 'required|date|after_or_equal:period_start',
        ]);

        $user = User::findOrFail($validated['user_id']);

        if (!$user->hourly_rate || (float) $user->hourly_rate <= 0) {
            return back()->withErrors(['payroll' => 'Set an hourly rate for this staff member first (in Account Management).']);
        }

        $periodStart = $validated['period_start'];
        $periodEnd = $validated['period_end'];

        $hoursWorked = TimeEntry::where('user_id', $user->id)
            ->whereNotNull('clock_out')
            ->whereBetween('clock_in', [$periodStart, $periodEnd])
            ->get()
            ->sum('hours');

        $grossAmount = round($hoursWorked * $user->hourly_rate, 2);

        $qualifyingAdvances = StaffAdvance::where('user_id', $user->id)
            ->where('deducted', false)
            ->where('date', '<=', $periodEnd)
            ->get();

        $advancesDeducted = $qualifyingAdvances->sum('amount');
        $advanceIds = $qualifyingAdvances->pluck('id')->toArray();

        $netAmount = round($grossAmount - $advancesDeducted, 2);

        $payment = SalaryPayment::create([
            'user_id' => $user->id,
            'period_start' => $periodStart,
            'period_end' => $periodEnd,
            'hours_worked' => $hoursWorked,
            'hourly_rate' => $user->hourly_rate,
            'gross_amount' => $grossAmount,
            'advances_deducted' => $advancesDeducted,
            'advance_ids' => $advanceIds,
            'net_amount' => $netAmount,
            'status' => 'Pending',
            'generated_at' => now(),
            'created_by' => $request->user()->id,
        ]);

        return back()->with('success', 'Salary generated successfully!');
    }

    public function markPaid(Request $request, $id)
    {
        if ($request->user()->role !== 'admin') {
            abort(403);
        }

        $payment = SalaryPayment::findOrFail($id);

        if ($payment->status === 'Paid') {
            return back()->withErrors(['payroll' => 'This salary payment has already been marked as paid.']);
        }

        $payment->status = 'Paid';
        $payment->paid_at = now();
        $payment->save();

        StaffAdvance::whereIn('id', $payment->advance_ids ?? [])->update(['deducted' => true]);

        Transaction::create([
            'type' => 'expense',
            'amount' => $payment->net_amount,
            'category' => 'Payroll',
            'description' => "Salary - {$payment->user->name} ({$payment->period_start->format('d M Y')} to {$payment->period_end->format('d M Y')})",
            'work_project_id' => null,
            'source_type' => 'payroll',
            'source_id' => $payment->id,
            'date' => now(),
            'created_by' => $request->user()->id,
        ]);

        return back()->with('success', 'Salary marked as paid!');
    }

    public function destroy(Request $request, $id)
    {
        if ($request->user()->role !== 'admin') {
            abort(403);
        }

        $payment = SalaryPayment::findOrFail($id);

        if ($payment->status === 'Paid') {
            return back()->withErrors(['payroll' => 'Paid salary records cannot be deleted.']);
        }

        $payment->delete();

        return back()->with('success', 'Salary record deleted successfully!');
    }
}
