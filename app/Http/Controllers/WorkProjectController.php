<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\WorkProject;

class WorkProjectController extends Controller
{
    public function store(Request $request)
    {
        $validated = $this->validateWorkProject($request);

        WorkProject::create([
            'title' => $validated['title'],
            'customer_id' => $validated['customer_id'],
            'quote_id' => $validated['quote_id'] ?? null,
            'status' => $validated['status'] ?? 'Active',
            'started_at' => $validated['started_at'] ?? null,
            'notes' => $validated['notes'] ?? null,
        ]);

        return back()->with('success', 'Project created successfully!');
    }

    public function update(Request $request, $id)
    {
        $workProject = WorkProject::findOrFail($id);
        $validated = $this->validateWorkProject($request);

        $workProject->update([
            'title' => $validated['title'],
            'customer_id' => $validated['customer_id'],
            'quote_id' => $validated['quote_id'] ?? $workProject->quote_id,
            'status' => $validated['status'] ?? $workProject->status,
            'started_at' => $validated['started_at'] ?? $workProject->started_at,
            'notes' => $validated['notes'] ?? $workProject->notes,
        ]);

        return back()->with('success', 'Project updated successfully!');
    }

    public function destroy($id)
    {
        $workProject = WorkProject::findOrFail($id);
        $workProject->delete();

        return back()->with('success', 'Project deleted successfully!');
    }

    public function updateStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:Active,Completed,On Hold',
        ]);

        $workProject = WorkProject::findOrFail($id);
        $data = ['status' => $validated['status']];
        if ($validated['status'] === 'Completed') {
            $data['completed_at'] = now();
        }
        $workProject->update($data);

        return back()->with('success', 'Project status updated!');
    }

    private function validateWorkProject(Request $request): array
    {
        return $request->validate([
            'title' => 'required|string|max:255',
            'customer_id' => 'required|exists:customers,id',
            'quote_id' => 'nullable|exists:quotes,id',
            'status' => 'nullable|in:Active,Completed,On Hold',
            'started_at' => 'nullable|date',
            'notes' => 'nullable|string',
        ]);
    }
}
