import { usePage } from '@inertiajs/react';
import React from 'react';
import { Phone, MessageCircle, FileText } from 'lucide-react';
import { siteInfo } from '../../data/siteData';

export default function MobileStickyBar({ onOpenQuote }) {
  const { settings = {} } = usePage().props;
  return (
    <div
      className="mobile-sticky-cta-bar"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.12)',
        padding: '10px 16px',
        zIndex: 999,
        display: 'none',
        borderTop: '1px solid var(--color-border)'
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1.3fr',
          gap: '8px',
          maxWidth: '500px',
          margin: '0 auto'
        }}
      >
        {/* 1. CALL NOW */}
        <a
          href={`tel:${(settings.phone || siteInfo.phone).replace(/\s+/g, '')}`}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--color-light)',
            color: 'var(--color-primary)',
            padding: '8px 4px',
            borderRadius: '12px',
            textDecoration: 'none',
            fontSize: '11px',
            fontWeight: '800',
            gap: '3px'
          }}
        >
          <Phone size={16} />
          <span>CALL NOW</span>
        </a>

        {/* 2. WHATSAPP */}
        <a
          href={(settings.whatsapp ? `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}?text=Hello` : siteInfo.whatsappUrl)}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#E8FBF0',
            color: '#128C7E',
            padding: '8px 4px',
            borderRadius: '12px',
            textDecoration: 'none',
            fontSize: '11px',
            fontWeight: '800',
            gap: '3px'
          }}
        >
          <MessageCircle size={16} />
          <span>WHATSAPP</span>
        </a>

        {/* 3. FREE QUOTE */}
        <button
          onClick={onOpenQuote}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--color-secondary)',
            color: '#FFFFFF',
            padding: '8px 4px',
            borderRadius: '12px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '11px',
            fontWeight: '800',
            gap: '3px',
            boxShadow: '0 4px 12px rgba(242, 101, 34, 0.3)'
          }}
        >
          <FileText size={16} />
          <span>FREE QUOTE</span>
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mobile-sticky-cta-bar {
            display: block !important;
          }
          body {
            padding-bottom: 60px !important;
          }
        }
      `}</style>
    </div>
  );
}
