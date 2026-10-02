import React from 'react';
import { Link } from '@inertiajs/react';
import { CreditCard, ShieldCheck, ArrowRight, Landmark } from 'lucide-react';
import ScrollReveal from '../common/ScrollReveal';

export default function PaymentBannerSection() {
  return (
    <section style={{ padding: '70px 0', backgroundColor: 'var(--color-light)' }}>
      <div className="container-custom">
        <ScrollReveal animation="fade-up" duration={650}>
          <div
            className="payment-banner-wrapper"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-md)',
              padding: '40px 48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '32px',
              flexWrap: 'wrap'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '22px', flex: '1 1 380px' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '18px',
                  backgroundColor: 'var(--color-primary-light, #EEF2FF)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <CreditCard size={28} />
              </div>
              <div>
                <h3
                  style={{
                    fontSize: '22px',
                    fontWeight: '800',
                    color: '#0F172A',
                    margin: '0 0 6px 0',
                    fontFamily: 'var(--font-heading)'
                  }}
                >
                  Already a Customer? Pay Your Invoice Online
                </h3>
                <p style={{ fontSize: '14px', color: '#64748B', margin: 0, lineHeight: '1.6', maxWidth: '520px' }}>
                  View our bank, bKash and other receiving account details and settle your invoice or deposit quickly and securely.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '10px', fontSize: '12px', color: '#94A3B8', fontWeight: '600' }}>
                  <ShieldCheck size={14} color="#22C55E" />
                  <span>Verified payment accounts, monitored by our finance team</span>
                </div>
              </div>
            </div>

            <Link
              href="/payment-info"
              style={{
                flexShrink: 0,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'var(--color-primary)',
                color: '#FFFFFF',
                fontSize: '15px',
                fontWeight: '700',
                padding: '15px 28px',
                borderRadius: '9999px',
                textDecoration: 'none',
                boxShadow: 'var(--shadow-primary)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <Landmark size={18} />
              <span>Make a Payment</span>
              <ArrowRight size={17} />
            </Link>
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .payment-banner-wrapper {
            padding: 28px 24px !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            text-align: left;
          }
          .payment-banner-wrapper > a {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
