<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Service;
use Illuminate\Support\Facades\Storage;

class ServiceController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'icon' => 'required|string|max:255',
            'short_description' => 'required|string',
            'description' => 'required|string',
            'features' => 'nullable|array',
            'image' => 'nullable|image|max:4096'
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('services', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        Service::create($validated);
        return back()->with('success', 'Service added successfully!');
    }

    public function update(Request $request, $id)
    {
        $service = Service::findOrFail($id);
        
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'icon' => 'required|string|max:255',
            'short_description' => 'required|string',
            'description' => 'required|string',
            'features' => 'nullable|array',
            'image' => 'nullable|image|max:4096'
        ]);

        if ($request->hasFile('image')) {
            // Delete old uploaded image if it exists
            if ($service->image && str_contains($service->image, '/storage/services/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $service->image));
            }
            $path = $request->file('image')->store('services', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        $service->update($validated);
        return back()->with('success', 'Service updated successfully!');
    }

    public function destroy($id)
    {
        $service = Service::findOrFail($id);
        if ($service->image && str_contains($service->image, '/storage/services/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $service->image));
        }
        $service->delete();
        return back()->with('success', 'Service deleted successfully!');
    }

    public function toggleStatus($id)
    {
        $service = Service::findOrFail($id);
        $service->status = $service->status === 'Active' ? 'Inactive' : 'Active';
        $service->save();
        return back()->with('success', 'Service status updated!');
    }
}
