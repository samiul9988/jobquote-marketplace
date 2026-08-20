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

    public function markAsRead($id)
    {
        $quote = Quote::findOrFail($id);
        $quote->update(['status' => 'Read']);
        return back();
    }
}
