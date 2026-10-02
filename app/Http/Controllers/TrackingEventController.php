<?php

namespace App\Http\Controllers;

use App\Models\TrackingEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TrackingEventController extends Controller
{
    /**
     * Public beacon endpoint — logs a single site-side tracking event.
     * Called via navigator.sendBeacon / fetch from the public site, no auth.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'event_type' => ['required', 'string', 'max:30'],
            'page_url' => ['required', 'string', 'max:500'],
            'page_title' => ['nullable', 'string', 'max:255'],
            'referrer' => ['nullable', 'string', 'max:500'],
            'session_id' => ['required', 'string', 'max:64'],
        ]);

        TrackingEvent::create([
            'event_type' => $validated['event_type'],
            'page_url' => $validated['page_url'],
            'page_title' => $validated['page_title'] ?? null,
            'referrer' => $validated['referrer'] ?? null,
            'session_id' => $validated['session_id'],
            'created_at' => now(),
        ]);

        return response()->noContent();
    }

    /**
     * Auth+staff polling endpoint for the admin "Live Site Activity" panel.
     */
    public function live(Request $request)
    {
        $today = now()->startOfDay();
        $fiveMinAgo = now()->subMinutes(5);

        $todayPageviews = TrackingEvent::where('created_at', '>=', $today)
            ->where('event_type', 'pageview')
            ->count();

        $todayUniqueSessions = TrackingEvent::where('created_at', '>=', $today)
            ->distinct('session_id')
            ->count('session_id');

        $last5MinEvents = TrackingEvent::where('created_at', '>=', $fiveMinAgo)->count();

        $todayEventsByType = TrackingEvent::where('created_at', '>=', $today)
            ->select('event_type', DB::raw('count(*) as total'))
            ->groupBy('event_type')
            ->pluck('total', 'event_type');

        $recent = TrackingEvent::orderByDesc('created_at')
            ->limit(25)
            ->get(['id', 'event_type', 'page_url', 'page_title', 'referrer', 'created_at']);

        // Per-page breakdown for today: how many times each page was viewed,
        // and by how many unique visitors (sessions).
        $pageBreakdown = TrackingEvent::where('created_at', '>=', $today)
            ->where('event_type', 'pageview')
            ->select('page_url', DB::raw('count(*) as views'), DB::raw('count(distinct session_id) as visitors'))
            ->groupBy('page_url')
            ->orderByDesc('views')
            ->limit(25)
            ->get();

        // Per-link click breakdown for today (e.g. the "Carpentry" / "Painting"
        // trade buttons inside the Find a Tradesperson popup).
        $clickBreakdown = TrackingEvent::where('created_at', '>=', $today)
            ->where('event_type', 'cta_click')
            ->select('page_url', DB::raw('count(*) as clicks'), DB::raw('count(distinct session_id) as visitors'))
            ->groupBy('page_url')
            ->orderByDesc('clicks')
            ->get();

        return response()->json([
            'stats' => [
                'today_pageviews' => $todayPageviews,
                'today_unique_sessions' => $todayUniqueSessions,
                'last_5_min_events' => $last5MinEvents,
                'today_events_by_type' => $todayEventsByType,
            ],
            'recent' => $recent,
            'pages' => $pageBreakdown,
            'clicks' => $clickBreakdown,
        ]);
    }
}
