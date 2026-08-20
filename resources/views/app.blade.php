<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        @php
            $favicon = \App\Models\Setting::where("key", "site_favicon")->value("value");
        @endphp
        @if($favicon)
            <link rel="icon" href="{{ $favicon }}" />
        @endif
    <title>SK Hour - Laravel Inertia</title>
    @viteReactRefresh
    @vite(['resources/js/app.jsx', 'resources/js/index.css'])
    @inertiaHead
  </head>
  <body>
    @inertia
  </body>
</html>
