<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TimeEntry;

class TimeEntryController extends Controller
{
    public function clockIn(Request $request)
    {
        $validated = $request->validate([
            'work_project_id' => 'nullable|exists:work_projects,id',
        ]);

        $alreadyClockedIn = TimeEntry::where('user_id', $request->user()->id)
            ->whereNull('clock_out')
            ->exists();

        if ($alreadyClockedIn) {
            return back()->withErrors(['clock' => 'You are already clocked in.']);
        }

        TimeEntry::create([
            'user_id' => $request->user()->id,
            'work_project_id' => $validated['work_project_id'] ?? null,
            'clock_in' => now(),
        ]);

        return back()->with('success', 'Clocked in successfully!');
    }

    public function clockOut(Request $request)
    {
        $entry = TimeEntry::where('user_id', $request->user()->id)
            ->whereNull('clock_out')
            ->first();

        if (!$entry) {
            return back()->withErrors(['clock' => 'You are not currently clocked in.']);
        }

        $validated = $request->validate([
            'notes' => 'nullable|string|max:1000',
        ]);

        $entry->clock_out = now();
        if (!empty($validated['notes'])) {
            $entry->notes = $validated['notes'];
        }
        $entry->save();

        return back()->with('success', 'Clocked out successfully!');
    }

    public function store(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            abort(403);
        }

        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'work_project_id' => 'nullable|exists:work_projects,id',
            'clock_in' => 'required|date',
            'clock_out' => 'nullable|date|after:clock_in',
            'notes' => 'nullable|string|max:1000',
        ]);

        TimeEntry::create($validated);

        return back()->with('success', 'Time entry added successfully!');
    }

    public function update(Request $request, $id)
    {
        if ($request->user()->role !== 'admin') {
            abort(403);
        }

        $entry = TimeEntry::findOrFail($id);

        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'work_project_id' => 'nullable|exists:work_projects,id',
            'clock_in' => 'required|date',
            'clock_out' => 'nullable|date|after:clock_in',
            'notes' => 'nullable|string|max:1000',
        ]);

        $entry->update($validated);

        return back()->with('success', 'Time entry updated successfully!');
    }

    public function destroy(Request $request, $id)
    {
        if ($request->user()->role !== 'admin') {
            abort(403);
        }

        TimeEntry::findOrFail($id)->delete();

        return back()->with('success', 'Time entry deleted successfully!');
    }
}
