<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AccountController extends Controller
{
    public function store(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            abort(403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|min:8',
            'role' => 'required|in:admin,staff',
            'hourly_rate' => 'nullable|numeric|min:0',
        ]);

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
            'hourly_rate' => $validated['hourly_rate'] ?? null,
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        return back()->with('success', 'Account created successfully!');
    }

    public function update(Request $request, $id)
    {
        if ($request->user()->role !== 'admin') {
            abort(403);
        }

        $user = User::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $id,
            'role' => 'required|in:admin,staff',
            'password' => 'nullable|string|min:8',
            'hourly_rate' => 'nullable|numeric|min:0',
        ]);

        if ($id == $request->user()->id && $validated['role'] !== 'admin') {
            return back()->withErrors(['role' => 'You cannot change your own role.']);
        }

        $data = [
            'name' => $validated['name'],
            'email' => $validated['email'],
            'role' => $validated['role'],
            'hourly_rate' => $validated['hourly_rate'] ?? null,
        ];

        if (!empty($validated['password'])) {
            $data['password'] = Hash::make($validated['password']);
        }

        $user->update($data);

        return back()->with('success', 'Account updated successfully!');
    }

    public function destroy(Request $request, $id)
    {
        if ($request->user()->role !== 'admin') {
            abort(403);
        }

        if ($id == $request->user()->id) {
            return back()->withErrors(['id' => 'You cannot delete your own account.']);
        }

        $user = User::findOrFail($id);

        if ($user->role === 'admin' && User::where('role', 'admin')->count() <= 1) {
            return back()->withErrors(['id' => 'You cannot delete the last remaining admin.']);
        }

        $user->delete();

        return back()->with('success', 'Account deleted successfully!');
    }

    public function toggleStatus(Request $request, $id)
    {
        if ($request->user()->role !== 'admin') {
            abort(403);
        }

        if ($id == $request->user()->id) {
            return back()->withErrors(['id' => 'You cannot deactivate your own account.']);
        }

        $user = User::findOrFail($id);
        $user->update(['is_active' => !$user->is_active]);

        return back()->with('success', 'Account status updated!');
    }
}
