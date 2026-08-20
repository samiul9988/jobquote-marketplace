<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\ContactMessage;

class ContactMessageController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'email' => 'required|email|max:255',
            'postcode' => 'nullable|string|max:255',
            'service' => 'nullable|string|max:255',
            'timeline' => 'nullable|string|max:255',
            'message' => 'required|string'
        ]);
        
        ContactMessage::create($validated);
        
        return back()->with('success', 'Message sent successfully!');
    }

    public function markAsRead($id)
    {
        $message = ContactMessage::findOrFail($id);
        $message->update(['status' => 'Read']);
        return back();
    }
}
