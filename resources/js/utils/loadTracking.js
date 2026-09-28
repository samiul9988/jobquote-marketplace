// Injects third-party tracking scripts (Meta Pixel, GA4, GTM) once, and
// exposes a helper to refire pageview events on Inertia client-side navigation.
// This should only ever be called after the visitor has given consent
// (or when consent isn't required per the admin's settings).

export function loadTrackingScripts(settings = {}) {
  if (!settings || !(settings.tracking_enabled === '1' || settings.tracking_enabled === true)) {
    return;
  }

  // --- Meta Pixel ---
  if (settings.meta_pixel_id && !window.__fbPixelLoaded) {
    window.__fbPixelLoaded = true;
    /* eslint-disable */
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = true;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */
    window.fbq('init', settings.meta_pixel_id);
    window.fbq('track', 'PageView');
  }

  // --- Google Analytics (GA4) via gtag.js ---
  if (settings.ga4_measurement_id && !window.__ga4Loaded) {
    window.__ga4Loaded = true;
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${settings.ga4_measurement_id}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', settings.ga4_measurement_id);
  }

  // --- Google Tag Manager ---
  if (settings.gtm_container_id && !window.__gtmLoaded) {
    window.__gtmLoaded = true;
    /* eslint-disable */
    (function (w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
      var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != 'dataLayer' ? '&l=' + l : '';
      j.async = true;
      j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', settings.gtm_container_id);
    /* eslint-enable */
  }
}

// Refires pageview events for already-loaded scripts. Meant to be called on
// Inertia's `navigate` event after the initial scripts have been injected.
export function trackPageView(settings = {}, url) {
  if (!settings || !(settings.tracking_enabled === '1' || settings.tracking_enabled === true)) {
    return;
  }

  if (window.__fbPixelLoaded && typeof window.fbq === 'function') {
    window.fbq('track', 'PageView');
  }

  if (window.__ga4Loaded && typeof window.gtag === 'function' && settings.ga4_measurement_id) {
    window.gtag('event', 'page_view', { page_path: url });
  }
}
