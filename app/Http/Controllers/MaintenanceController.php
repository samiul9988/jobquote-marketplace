<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\View\View;
use Inertia\Inertia;
use Inertia\Response;

class MaintenanceController extends Controller
{
    public function show(Request $request): Response
    {
        return Inertia::render('MaintenanceActivationPage', [
            'active' => app()->isDownForMaintenance(),
            'key' => $request->query('key'),
            'status' => session('status'),
        ]);
    }

    public function toggle(Request $request): RedirectResponse
    {
        if (app()->isDownForMaintenance()) {
            Artisan::call('up');

            $status = 'Maintenance mode is now off — the site is live for everyone.';
        } else {
            Artisan::call('down', [
                '--render' => 'errors.503',
                '--retry' => 60,
            ]);

            $status = 'Maintenance mode is now on — visitors will see the maintenance page.';
        }

        return redirect()->route('maintenance.show', $request->filled('key') ? ['key' => $request->input('key')] : [])
            ->with('status', $status);
    }

    public function preview(): View
    {
        return view('errors.503');
    }
}
