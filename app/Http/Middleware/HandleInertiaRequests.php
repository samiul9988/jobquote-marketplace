<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $settings = \App\Models\Setting::pluck('value', 'key')->toArray();

        // Secret payment fields must never reach the frontend in plaintext.
        // Strip them out, but expose a boolean "_set" flag so the UI knows
        // whether a value already exists without revealing it.
        $secretKeys = ['bkash_app_key', 'bkash_app_secret', 'bkash_password', 'sslcommerz_store_password'];
        foreach ($secretKeys as $secretKey) {
            $settings[$secretKey . '_set'] = ! empty($settings[$secretKey]);
            unset($settings[$secretKey]);
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'settings' => $settings,
        ];
    }
}

