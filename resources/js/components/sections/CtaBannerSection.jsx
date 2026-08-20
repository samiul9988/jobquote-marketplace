import { usePage } from '@inertiajs/react';
import React from 'react';
import { Phone, MessageCircle, ArrowRight } from 'lucide-react';
import Button from '../common/Button';
import ScrollReveal from '../common/ScrollReveal';
import { siteInfo } from '../../data/siteData';

export default function CtaBannerSection({ onOpenQuote }) {
  const { settings = {} } = usePage().props;
  return (
    <section style={{ padding: '80px 0', backgroundColor: '#FFFFFF' }}>
      <div className="container-custom">
        <ScrollReveal animation="zoom-in" duration={650}>
          <div
            style={{
              backgroundColor: 'var(--color-primary)',
              borderRadius: 'var(--radius-xl)',
              padding: '70px 48px',
              color: '#FFFFFF',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-primary)'
            }}
            className="cta-banner-wrapper"
          >
            {/* Subtle Ambient Decorative Circles */}
            <div
              style={{
                position: 'absolute',
                top: '-80px',
                right: '-80px',
                width: '260px',
                height: '260px',
                borderRadius: '50%',
                backgroundColor: 'rgba(242, 101, 34, 0.15)',
                pointerEvents: 'none'
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '-60px',
                left: '-60px',
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                pointerEvents: 'none'
              }}
            />

            <div style={{ position: 'relative', zIndex: 2, maxWidth: '750px', margin: '0 auto' }}>
              
              {/* Tag Badge */}
              <div
                style={{
                  display: 'inline-block',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  color: '#FFFFFF',
                  padding: '6px 18px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '13px',
                  fontWeight: '700',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  marginBottom: '18px'
                }}
              >
                Start Your Project Today
              </div>

              {/* Main Headline from Master Prompt */}
              <h2
                style={{
                  fontSize: '44px',
                  fontWeight: '900',
                  lineHeight: '1.15',
                  marginBottom: '16px',
                  fontFamily: 'var(--font-heading)'
                }}
                className="cta-main-title"
              >
                Ready to Improve Your Home?
              </h2>

              {/* Supporting Text */}
              <p
                style={{
                  fontSize: '16px',
                  color: '#CBD5E1',
                  lineHeight: '1.7',
                  marginBottom: '36px',
                  maxWidth: '600px',
                  margin: '0 auto 36px auto'
                }}
              >
                Tell us about your project and request your free quote today. We respond promptly with honest advice and clear pricing.
              </p>

              {/* 3 Action Buttons from Master Prompt */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '16px',
                  flexWrap: 'wrap'
                }}
                className="cta-buttons-group"
              >
                {/* 1. Get a Free Quote */}
                <button
                  onClick={onOpenQuote}
                  style={{
                    backgroundColor: 'var(--color-secondary)',
                    color: '#FFFFFF',
                    fontSize: '15px',
                    fontWeight: '700',
                    padding: '15px 32px',
                    borderRadius: '9999px',
                    boxShadow: '0 8px 22px rgba(242, 101, 34, 0.45)',
                    transition: 'all 0.3s ease',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-secondary-hover)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-secondary)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <span>Get a Free Quote</span>
                  <ArrowRight size={17} />
                </button>

                {/* 2. WhatsApp Us */}
                <a
                  href={(settings.whatsapp ? `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}?text=Hello` : siteInfo.whatsappUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: '#25D366',
                    color: '#FFFFFF',
                    fontSize: '15px',
                    fontWeight: '700',
                    padding: '15px 28px',
                    borderRadius: '9999px',
                    boxShadow: '0 8px 22px rgba(37, 211, 102, 0.35)',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.backgroundColor = '#20BD5A';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.backgroundColor = '#25D366';
                  }}
                >
                  <MessageCircle size={18} />
                  <span>WhatsApp Us</span>
                </a>

                {/* 3. Call Now */}
                <a
                  href={`tel:${(settings.phone || siteInfo.phone).replace(/\s+/g, '')}`}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    color: '#FFFFFF',
                    fontSize: '15px',
                    fontWeight: '700',
                    padding: '14px 28px',
                    borderRadius: '9999px',
                    border: '1.5px solid rgba(255, 255, 255, 0.3)',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.color = 'var(--color-primary)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                    e.currentTarget.style.color = '#FFFFFF';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Phone size={17} />
                  <span>Call Now</span>
                </a>

              </div>

            </div>
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .cta-banner-wrapper {
            padding: 48px 24px !important;
          }
          .cta-main-title {
            font-size: 32px !important;
          }
          .cta-buttons-group {
            flex-direction: column !important;
            width: 100% !important;
          }
          .cta-buttons-group button,
          .cta-buttons-group a {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
}
