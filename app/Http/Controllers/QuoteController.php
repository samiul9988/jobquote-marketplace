<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Quote;

class QuoteController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'service' => 'nullable|string|max:255',
            'propertyType' => 'nullable|string|max:255',
            'projectSize' => 'nullable|string|max:255',
            'message' => 'nullable|string'
        ]);
        
        Quote::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'service' => $validated['service'] ?? null,
            'property_type' => $validated['propertyType'] ?? null,
            'project_size' => $validated['projectSize'] ?? null,
            'message' => $validated['message'] ?? null,
        ]);
        
        return back()->with('success', 'Quote request submitted successfully!');
    }

    public function storeTrade(Request $request)
    {
        $request->validate([
            'trade' => 'required|string|max:255',
            'answers' => 'required|string',
            'description' => 'nullable|string|max:5000',
            'photos' => 'nullable|array|max:5',
            'photos.*' => 'image|max:5120',
        ]);

        $answers = json_decode($request->input('answers'), true);
        if (!is_array($answers)) {
            $answers = [];
        }

        $paths = [];
        foreach ($request->file('photos', []) as $photo) {
            $paths[] = '/storage/' . $photo->store('quotes', 'public');
        }

        $lines = [];
        foreach ($answers as $question => $answer) {
            $lines[] = $question . ': ' . (is_array($answer) ? implode(', ', $answer) : $answer);
        }
        if ($request->filled('description')) {
            $lines[] = 'Details: ' . $request->input('description');
        }

        Quote::create([
            'name' => 'Website enquiry',
            'email' => '',
            'phone' => '',
            'service' => $request->input('trade'),
            'message' => implode("\n", $lines),
            'details' => $answers,
            'photos' => $paths,
        ]);

        return back()->with('success', 'Quote request submitted successfully!');
    }

    public function markAsRead($id)
    {
        $quote = Quote::findOrFail($id);
        $quote->update(['status' => 'Read']);
        return back();
    }
}
