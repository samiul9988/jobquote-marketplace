import React, { useState, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { Menu, X, User, Hammer, PaintRoller } from 'lucide-react';
import Logo from '../common/Logo';

export default function Navbar({ onOpenQuote, onToggleMobileMenu, isMobileMenuOpen, onOpenLogin }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showTradeModal, setShowTradeModal] = useState(false);
  const { url, props } = usePage();
  const user = props.auth?.user;
  const location = { pathname: url };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        position: isScrolled ? 'fixed' : 'absolute',
        top: isScrolled ? '10px' : '20px',
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '0 20px',
        pointerEvents: 'none',
        transition: 'all 0.3s ease'
      }}
    >
      <header
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          backgroundColor: '#FFFFFF',
          borderRadius: '9999px',
          padding: '10px 24px',
          boxShadow: '0 12px 35px rgba(36, 45, 138, 0.12)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'auto',
          transition: 'all 0.3s ease'
        }}
        className="paintters-floating-navbar"
      >
        {/* 1. Official Logo */}
        <Logo hideTextOnMobile={true} />

        {/* 2. Desktop Navigation with bullet dots */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
          className="desktop-floating-nav"
        >
          {navItems.map((item, idx) => {
            const isActive = location.pathname === item.path || (item.path === '/' && location.pathname === '');
            return (
              <React.Fragment key={item.name}>
                {idx > 0 && (
                  <span style={{ color: '#CBD5E1', fontSize: '13px', userSelect: 'none' }}>
                    •
                  </span>
                )}
                {item.path.startsWith('/#') ? (
                  <a
                    href={item.path}
                    style={{
                      fontSize: '14px',
                      fontWeight: '700',
                      color: 'var(--color-text-main)',
                      padding: '6px 4px',
                      transition: 'color 0.2s ease',
                      textDecoration: 'none'
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.color = 'var(--color-secondary)')}
                    onMouseOut={(e) => (e.currentTarget.style.color = 'var(--color-text-main)')}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    href={item.path}
                    style={{
                      fontSize: '14px',
                      fontWeight: '700',
                      color: isActive ? 'var(--color-secondary)' : 'var(--color-text-main)',
                      padding: '6px 4px',
                      transition: 'color 0.2s ease',
                      textDecoration: 'none'
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.color = 'var(--color-secondary)')}
                    onMouseOut={(e) => {
                      if (!isActive) e.currentTarget.style.color = 'var(--color-text-main)';
                    }}
                  >
                    {item.name}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </nav>

        {/* 3. Right Side: Get a Free Quote + Login / Sign Up */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>

          {/* Standard Login / Sign Up Link */}
          {user ? (
            <Link
              href="/dashboard"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                backgroundColor: 'var(--color-secondary)',
                color: '#FFFFFF',
                borderRadius: 'var(--radius-full)',
                fontWeight: '600',
                fontSize: '14px',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
              className="btn-hover-effect hide-on-mobile"
            >
              <User size={18} />
              <span>Dashboard</span>
            </Link>
          ) : (
            <Link
              href="/login"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                backgroundColor: 'var(--color-primary)',
                color: '#FFFFFF',
                borderRadius: 'var(--radius-full)',
                fontWeight: '600',
                fontSize: '14px',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
              className="btn-hover-effect hide-on-mobile"
            >
              <User size={18} />
              <span>Login / Sign Up</span>
            </Link>
          )}

          {/* Primary CTA: Get a Free Quote */}
          <button
            onClick={onOpenQuote}
            style={{
              backgroundColor: 'var(--color-secondary)',
              color: '#FFFFFF',
              fontSize: '14px',
              fontWeight: '700',
              padding: '11px 24px',
              borderRadius: '9999px',
              boxShadow: '0 6px 20px rgba(242, 101, 34, 0.35)',
              transition: 'all 0.3s ease',
              border: 'none',
              cursor: 'pointer'
            }}
            className="navbar-get-started-btn"
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-secondary-hover)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 24px rgba(242, 101, 34, 0.45)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-secondary)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(242, 101, 34, 0.35)';
            }}
          >
            Get a Free Quote
          </button>

          {/* Quote: Find a Tradesperson popup */}
          <button
            onClick={() => setShowTradeModal(true)}
            style={{
              backgroundColor: 'var(--color-secondary)',
              color: '#FFFFFF',
              fontSize: '14px',
              fontWeight: '700',
              padding: '11px 24px',
              borderRadius: '9999px',
              boxShadow: '0 6px 20px rgba(242, 101, 34, 0.35)',
              transition: 'all 0.3s ease',
              border: 'none',
              cursor: 'pointer'
            }}
            className="navbar-get-started-btn navbar-quote-btn"
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-secondary-hover)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 24px rgba(242, 101, 34, 0.45)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-secondary)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(242, 101, 34, 0.35)';
            }}
          >
            Quote
          </button>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={onToggleMobileMenu}
            style={{
              display: 'none',
              padding: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-light)',
              color: 'var(--color-text-main)',
              border: 'none',
              cursor: 'pointer'
            }}
            className="mobile-nav-toggle"
            aria-label="Toggle Navigation"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>


      {showTradeModal && (
        <div
          onClick={() => setShowTradeModal(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', pointerEvents: 'auto', zIndex: 2000 }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ background: '#fff', borderRadius: '20px', padding: '28px', maxWidth: '480px', width: '100%', position: 'relative', boxShadow: '0 20px 50px rgba(0,0,0,0.25)' }}
          >
            <button onClick={() => setShowTradeModal(false)} aria-label="Close" style={{ position: 'absolute', top: '14px', right: '14px', border: 'none', background: 'transparent', cursor: 'pointer' }}>
              <X size={22} />
            </button>
            <h3 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 6px', color: 'var(--color-text-main)' }}>Find a Tradesperson</h3>
            <p style={{ fontSize: '15px', margin: '0 0 20px', color: '#475569' }}>What type of work do you need doing?</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              {[
                { key: 'carpentry', label: 'Carpentry / Joinery', Icon: Hammer },
                { key: 'painting', label: 'Painting & Decorating', Icon: PaintRoller }
              ].map(({ key, label, Icon }) => (
                <button
                  key={key}
                  onClick={() => router.visit(`/find-tradesperson?trade=${key}`)}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '14px', padding: '28px 12px', border: '1px solid #E2E8F0', borderRadius: '8px', background: '#fff', cursor: 'pointer', fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)' }}
                >
                  <Icon size={38} strokeWidth={2} />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      <style>{`
        @media (max-width: 1080px) {
          .desktop-floating-nav {
            display: none !important;
          }
          .mobile-nav-toggle {
            display: flex !important;
          }
          .paintters-floating-navbar {
            padding: 8px 18px !important;
            border-radius: 20px !important;
          }
        }
        @media (max-width: 600px) {
          .navbar-login-link {
            display: none !important;
          }
          .navbar-get-started-btn {
            padding: 9px 18px !important;
            font-size: 13px !important;
          }
        }
      `}</style>
    </div>
  );
}
