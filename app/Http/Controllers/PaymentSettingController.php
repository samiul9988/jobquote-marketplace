<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;

class PaymentSettingController extends Controller
{
    /**
     * Secret fields that should never be overwritten with a blank value
     * once they already have a saved value in the settings table.
     */
    protected array $secretFields = [
        'bkash_app_key',
        'bkash_app_secret',
        'bkash_password',
        'sslcommerz_store_password',
    ];

    public function update(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            abort(403);
        }

        $validated = $request->validate([
            'bkash_enabled' => 'boolean',
            'bkash_merchant_number' => 'nullable|string|max:20',
            'bkash_app_key' => 'nullable|string',
            'bkash_app_secret' => 'nullable|string',
            'bkash_username' => 'nullable|string',
            'bkash_password' => 'nullable|string',
            'bkash_mode' => 'nullable|in:sandbox,live',
            'sslcommerz_enabled' => 'boolean',
            'sslcommerz_store_id' => 'nullable|string',
            'sslcommerz_store_password' => 'nullable|string',
            'sslcommerz_mode' => 'nullable|in:sandbox,live',
        ]);

        foreach ($validated as $key => $value) {
            // Secret fields: only overwrite when the admin actually typed something.
            // An empty submit for a secret field means "keep the existing value".
            if (in_array($key, $this->secretFields, true) && ! $request->filled($key)) {
                continue;
            }

            if ($key === 'bkash_enabled' || $key === 'sslcommerz_enabled') {
                $value = $value ? '1' : '0';
            } else {
                $value = $value ?? '';
            }

            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }

        return back()->with('success', 'Payment settings updated successfully!');
    }
}
