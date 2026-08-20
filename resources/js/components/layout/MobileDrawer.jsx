import React from 'react';
import { Link , usePage} from '@inertiajs/react';
import { Phone, Mail, MapPin, X, ArrowRight } from 'lucide-react';
import Logo from '../common/Logo';
import Button from '../common/Button';
import { siteInfo } from '../../data/siteData';

export default function MobileDrawer({ isOpen, onClose, onOpenQuote }) {
  const { settings = {} } = usePage().props;
  if (!isOpen) return null;

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Our Services", path: "/services" },
    { name: "Gallery", path: "/gallery" },
    { name: "Reviews", path: "/reviews" },
    { name: "Careers", path: "/careers" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(10, 20, 28, 0.65)',
        zIndex: 2000,
        display: 'flex',
        justifyContent: 'flex-end',
        backdropFilter: 'blur(4px)'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '85%',
          maxWidth: '360px',
          height: '100%',
          backgroundColor: '#FFFFFF',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflowY: 'auto',
          boxShadow: 'var(--shadow-lg)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <Logo />
            <button
              onClick={onClose}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-text-main)',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Nav items */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {navItems.map((link) => {
              if (link.path.startsWith('/#')) {
                return (
                  <a
                    key={link.name}
                    href={link.path}
                    onClick={onClose}
                    style={{
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '16px',
                      fontWeight: '700',
                      color: 'var(--color-text-main)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      textDecoration: 'none'
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-primary-light)')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <span>{link.name}</span>
                    <ArrowRight size={16} color="var(--color-primary)" />
                  </a>
                );
              }
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={onClose}
                  style={{
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '16px',
                    fontWeight: '700',
                    color: 'var(--color-text-main)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    textDecoration: 'none'
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-primary-light)')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <span>{link.name}</span>
                  <ArrowRight size={16} color="var(--color-primary)" />
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Contact & Action */}
        <div style={{ paddingTop: '24px', borderTop: '1px solid var(--color-border)' }}>
          <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: 'var(--color-text-muted)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Phone size={14} color="var(--color-primary)" />
              <span>{(settings.phone || siteInfo.phone)}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Mail size={14} color="var(--color-primary)" />
              <span>{(settings.email || siteInfo.email)}</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Button
              variant="secondary"
              fullWidth
              onClick={() => {
                onClose();
                onOpenQuote();
              }}
            >
              Get a Free Quote
            </Button>

            <Link
              href="/login"
              onClick={onClose}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: 'var(--radius-full)',
                border: '1.5px solid var(--color-primary)',
                backgroundColor: 'transparent',
                color: 'var(--color-primary)',
                fontSize: '14px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
            >
              Login / Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


