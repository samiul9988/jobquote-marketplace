<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Project;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'categoryKey' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
            'tag' => 'nullable|string|max:255',
            'image' => 'required|image|max:2048',
            'description' => 'nullable|string'
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('gallery', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        Project::create($validated);
        return back()->with('success', 'Project added successfully!');
    }

    public function update(Request $request, $id)
    {
        $project = Project::findOrFail($id);
        
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'categoryKey' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
            'tag' => 'nullable|string|max:255',
            'image' => 'nullable|image|max:2048',
            'description' => 'nullable|string'
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('gallery', 'public');
            $validated['image'] = '/storage/' . $path;
            
            // Delete old image if it's not a default placeholder
            if ($project->image && str_contains($project->image, '/storage/gallery/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $project->image));
            }
        }

        $project->update($validated);
        return back()->with('success', 'Project updated successfully!');
    }

    public function destroy($id)
    {
        $project = Project::findOrFail($id);
        
        // Delete image if it's not a default placeholder
        if ($project->image && str_contains($project->image, '/storage/gallery/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $project->image));
        }

        $project->delete();
        return back()->with('success', 'Project deleted successfully!');
    }

    public function toggleStatus($id)
    {
        $project = Project::findOrFail($id);
        $project->status = $project->status === 'Active' ? 'Inactive' : 'Active';
        $project->save();
        return back()->with('success', 'Project status updated!');
    }
}
