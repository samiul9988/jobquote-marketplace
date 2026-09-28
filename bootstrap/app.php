<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
        ]);
        $middleware->alias([
            'staff' => \App\Http\Middleware\EnsureIsStaff::class,
        ]);
        // /track-event is a stateless public analytics beacon (sendBeacon/fetch,
        // not an Inertia form post) so it never carries the X-XSRF-TOKEN header.
        // It's rate-limited and write-only, so excluding it from CSRF is safe.
        $middleware->validateCsrfTokens(except: [
            'track-event',
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->shouldRenderJsonWhen(
            fn (Request $request) => $request->is('api/*') || $request->expectsJson(),
        );
    })->create();

