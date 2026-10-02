import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { router } from '@inertiajs/react';
import { X, Hammer, PaintRoller } from 'lucide-react';
import { logTrackingEvent } from '../../utils/loadTracking';

// "Find a Tradesperson" trade-picker popup. Replaces the old QuoteModal as the
// action behind every "Get a Free Quote" button site-wide (see MainLayout.jsx).
export default function TradeQuoteModal({ isOpen, onClose }) {
  // Lock background scroll while open, and render via a portal straight onto
  // <body> so no ancestor's CSS (transforms, overflow, etc.) can clip or
  // reposition a `position: fixed` overlay on mobile.
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, width: '100vw', height: '100dvh', background: 'rgba(15,23,42,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box', padding: '20px', zIndex: 2000, overflowY: 'auto' }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="trade-quote-modal"
        style={{ background: '#fff', borderRadius: '20px', padding: '28px', maxWidth: '480px', width: '100%', maxHeight: 'calc(100vh - 40px)', overflowY: 'auto', boxSizing: 'border-box', position: 'relative', boxShadow: '0 20px 50px rgba(0,0,0,0.25)' }}
      >
        <button onClick={onClose} aria-label="Close" style={{ position: 'absolute', top: '14px', right: '14px', border: 'none', background: 'transparent', cursor: 'pointer' }}>
          <X size={22} />
        </button>
        <h3 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 6px', color: 'var(--color-text-main)', paddingRight: '28px' }}>Find a Tradesperson</h3>
        <p style={{ fontSize: '15px', margin: '0 0 20px', color: '#475569' }}>What type of work do you need doing?</p>
        <div className="trade-quote-options" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', minWidth: 0 }}>
          {[
            { key: 'carpentry', label: 'Carpentry / Joinery', Icon: Hammer },
            { key: 'painting', label: 'Painting & Decorating', Icon: PaintRoller }
          ].map(({ key, label, Icon }) => (
            <button
              key={key}
              onClick={() => {
                logTrackingEvent('cta_click', { page_url: `/find-tradesperson?trade=${key}` });
                router.visit(`/find-tradesperson?trade=${key}`);
              }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '14px', padding: '28px 12px', border: '1px solid #E2E8F0', borderRadius: '8px', background: '#fff', cursor: 'pointer', fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)' }}
            >
              <Icon size={38} strokeWidth={2} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 480px) {
          .trade-quote-modal { padding: 22px !important; border-radius: 16px !important; }
          .trade-quote-options { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>,
    document.body
  );
}
