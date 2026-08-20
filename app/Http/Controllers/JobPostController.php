<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\JobPost;

class JobPostController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'rate' => 'required|string|max:255',
            'icon' => 'required|string|max:255',
            'description' => 'required|string',
            'requirements' => 'required|array'
        ]);

        JobPost::create($validated);

        return back()->with('success', 'Job post created successfully!');
    }

    public function update(Request $request, $id)
    {
        $job = JobPost::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'rate' => 'required|string|max:255',
            'icon' => 'required|string|max:255',
            'description' => 'required|string',
            'requirements' => 'required|array'
        ]);

        $job->update($validated);

        return back()->with('success', 'Job post updated successfully!');
    }

    public function destroy($id)
    {
        $job = JobPost::findOrFail($id);
        $job->delete();

        return back()->with('success', 'Job post deleted successfully!');
    }

    public function toggleStatus($id)
    {
        $job = JobPost::findOrFail($id);
        $job->update([
            'status' => $job->status === 'Active' ? 'Inactive' : 'Active'
        ]);

        return back()->with('success', 'Job post status updated!');
    }
}
