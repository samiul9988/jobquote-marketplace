<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\HeroImage;
use Illuminate\Support\Facades\Storage;

class HeroImageController extends Controller
{
    public function store(Request $request)
    {
        $request->validate(['images.*' => 'required|image|max:8192']);
        $count = HeroImage::count();
        foreach ($request->file('images') as $file) {
            $path = $file->store('hero', 'public');
            HeroImage::create(['image' => '/storage/' . $path, 'order' => ++$count, 'status' => 'Active']);
        }
        return back()->with('success', 'Hero images uploaded!');
    }

    public function destroy($id)
    {
        $img = HeroImage::findOrFail($id);
        Storage::disk('public')->delete(str_replace('/storage/', '', $img->image));
        $img->delete();
        return back()->with('success', 'Image deleted!');
    }

    public function toggleStatus($id)
    {
        $img = HeroImage::findOrFail($id);
        $img->status = $img->status === 'Active' ? 'Inactive' : 'Active';
        $img->save();
        return back()->with('success', 'Status updated!');
    }

    public function updateOrder(Request $request)
    {
        foreach ($request->order as $item) {
            HeroImage::where('id', $item['id'])->update(['order' => $item['order']]);
        }
        return response()->json(['success' => true]);
    }
}
