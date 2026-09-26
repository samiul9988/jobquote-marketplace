<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Setting;
use Illuminate\Support\Facades\Storage;

class SettingController extends Controller
{
    public function update(Request $request)
    {
        $data = $request->except(['_token', 'logo', 'site_favicon']);

        foreach ($data as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }

        if ($request->hasFile('site_favicon')) {
            $path = $request->file('site_favicon')->store('logos', 'public');
            Setting::updateOrCreate(['key' => 'site_favicon'], ['value' => '/storage/' . $path]);
        }

        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('logos', 'public');
            Setting::updateOrCreate(['key' => 'logo'], ['value' => '/storage/' . $path]);
        }

        return back()->with('success', 'Global Settings updated successfully!');
    }

    public function updateAbout(Request $request)
    {
        // Image fields that need file upload handling
        $imageKeys = ['about_hero_bg', 'about_main_image', 'about_secondary_image'];

        // Save all non-file fields
        $data = $request->except(array_merge(['_token'], $imageKeys));
        foreach ($data as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value ?? '']);
        }

        // Handle image uploads
        foreach ($imageKeys as $key) {
            if ($request->hasFile($key)) {
                // Delete old image if stored in our storage
                $old = Setting::where('key', $key)->value('value');
                if ($old && str_contains($old, '/storage/about/')) {
                    Storage::disk('public')->delete(str_replace('/storage/', '', $old));
                }
                $path = $request->file($key)->store('about', 'public');
                Setting::updateOrCreate(['key' => $key], ['value' => '/storage/' . $path]);
            }
        }

        return back()->with('about_success', 'About page content updated!');
    }

    public function updateHome(Request $request)
    {
        $data = $request->except(['_token']);
        
        foreach ($data as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value ?? '']);
        }

        return back()->with('home_success', 'Home page content updated!');
    }
}

