import React, { useState, useEffect, useRef } from 'react';
import { usePage, router } from '@inertiajs/react';
import { loadTrackingScripts, trackPageView } from '../../utils/loadTracking';

const DEFAULT_TEXT = 'We use cookies to improve your experience and for analytics. By continuing, you agree to our use of cookies.';

export default function CookieConsentBanner() {
  const { settings = {} } = usePage().props;
  const [isVisible, setIsVisible] = useState(false);
  const scriptsLoadedRef = useRef(false);
  const navListenerAttachedRef = useRef(false);

  const consentRequired = settings.cookie_consent_enabled === '1' || settings.cookie_consent_enabled === true;

  const startScripts = () => {
    if (scriptsLoadedRef.current) return;
    scriptsLoadedRef.current = true;
    loadTrackingScripts(settings);

    if (!navListenerAttachedRef.current) {
      navListenerAttachedRef.current = true;
      router.on('navigate', (event) => {
        if (!scriptsLoadedRef.current) return;
        const url = event?.detail?.page?.url || window.location.pathname;
        trackPageView(settings, url);
      });
    }
  };

  useEffect(() => {
    if (!consentRequired) {
      // Consent isn't required by admin settings — fire tracking immediately, no banner.
      startScripts();
      return;
    }

    let stored = null;
    try {
      stored = localStorage.getItem('cookie_consent');
    } catch (e) {
      stored = null;
    }

    if (stored === 'accepted') {
      startScripts();
    } else if (stored === 'declined') {
      // Do nothing — visitor already opted out.
    } else {
      setIsVisible(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consentRequired, settings.tracking_enabled, settings.meta_pixel_id, settings.ga4_measurement_id, settings.gtm_container_id]);

  const handleAccept = () => {
    try {
      localStorage.setItem('cookie_consent', 'accepted');
    } catch (e) {
      // ignore storage errors (private browsing, etc.)
    }
    setIsVisible(false);
    startScripts();
  };

  const handleDecline = () => {
    try {
      localStorage.setItem('cookie_consent', 'declined');
    } catch (e) {
      // ignore storage errors
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const bannerText = settings.cookie_banner_text || DEFAULT_TEXT;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: 'var(--color-dark, #0F172A)',
        color: '#FFFFFF',
        padding: '20px 24px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.15)'
      }}
    >
      <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.5, maxWidth: '640px', flex: '1 1 320px', color: '#E2E8F0' }}>
        {bannerText}
      </p>
      <div style={{ display: 'flex', gap: '12px', flexShrink: 0 }}>
        <button
          onClick={handleDecline}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.3)',
            backgroundColor: 'transparent',
            color: '#FFFFFF',
            fontWeight: 600,
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          Decline
        </button>
        <button
          onClick={handleAccept}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: 'var(--color-secondary)',
            color: '#FFFFFF',
            fontWeight: 700,
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
