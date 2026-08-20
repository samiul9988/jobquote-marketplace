<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Review;

class ReviewController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
            'service' => 'nullable|string|max:255',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string'
        ]);

        // Submitted reviews start as Pending for moderation
        Review::create(array_merge($validated, ['status' => 'Pending']));

        return back()->with('success', 'Your review has been submitted for moderation! It will be shown once approved.');
    }

    public function approve($id)
    {
        $review = Review::findOrFail($id);
        $review->update(['status' => 'Approved']);

        return back()->with('success', 'Review approved successfully!');
    }

    public function reject($id)
    {
        $review = Review::findOrFail($id);
        $review->update(['status' => 'Rejected']);

        return back()->with('success', 'Review rejected!');
    }

    public function destroy($id)
    {
        $review = Review::findOrFail($id);
        $review->delete();

        return back()->with('success', 'Review deleted successfully!');
    }
}
