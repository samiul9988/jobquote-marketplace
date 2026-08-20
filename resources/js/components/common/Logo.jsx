import { usePage } from '@inertiajs/react';
import React from 'react';
import { Link } from '@inertiajs/react';

export default function Logo({ className = '', light = false, hideTextOnMobile = false }) {
  const { settings = {} } = usePage().props;
  const logoUrl = settings.logo || '/images/logo.png';

  return (
    <Link
      href="/"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        textDecoration: 'none'
      }}
      className={`site-brand-logo ${hideTextOnMobile ? 'hide-text-mobile' : ''} ${className}`}
    >
      {/* Exact Original Logo Image */}
      <div
        style={{
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}
      >
        <img
          src={logoUrl}
          alt="SK Home Solutions"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain'
          }}
        />
      </div>

      {/* Brand Name Text */}
      <div
        className="brand-logo-text"
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <div
          style={{
            fontSize: '20px',
            fontWeight: '900',
            fontFamily: 'var(--font-heading)',
            lineHeight: '1.1',
            letterSpacing: '-0.3px',
            color: light ? '#FFFFFF' : 'var(--color-primary)'
          }}
        >
          SK HOME
        </div>
        <div
          style={{
            fontSize: '11px',
            fontWeight: '800',
            letterSpacing: '1.5px',
            color: 'var(--color-secondary)',
            textTransform: 'uppercase',
            marginTop: '1px'
          }}
        >
          SOLUTIONS UK
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .site-brand-logo.hide-text-mobile .brand-logo-text {
            display: none !important;
          }
        }
      `}</style>
    </Link>
  );
}



