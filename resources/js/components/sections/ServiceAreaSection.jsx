import React from 'react';
import { MapPin, Navigation, CheckCircle2, ArrowRight } from 'lucide-react';
import Button from '../common/Button';
import ScrollReveal from '../common/ScrollReveal';
import { serviceAreas } from '../../data/siteData';

export default function ServiceAreaSection({ onOpenQuote }) {
  return (
    <section style={{ padding: '90px 0', backgroundColor: 'var(--color-light)' }}>
      <div className="container-custom">
        <ScrollReveal animation="fade-up" duration={700}>
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              padding: '56px 48px',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-md)',
              display: 'grid',
              gridTemplateColumns: '1.2fr 0.8fr',
              gap: '48px',
              alignItems: 'center'
            }}
            className="service-area-card"
          >
            {/* Left Column: Information & Coverage */}
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'var(--color-secondary-light)',
                  color: 'var(--color-secondary)',
                  fontSize: '13px',
                  fontWeight: '800',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  padding: '6px 16px',
                  borderRadius: 'var(--radius-full)',
                  marginBottom: '16px'
                }}
              >
                <MapPin size={15} />
                <span>Service Location</span>
              </div>

              <h3 style={{ fontSize: '32px', fontWeight: '800', color: 'var(--color-primary)', marginBottom: '14px' }}>
                Proudly Serving Liverpool & Surrounding Districts
              </h3>

              <p style={{ fontSize: '15px', color: 'var(--color-text-muted)', lineHeight: '1.7', marginBottom: '28px' }}>
                {serviceAreas.note} Based at 21 Alexander Road, Liverpool (L22 1RJ), we provide prompt, reliable home improvement and property services across:
              </p>

              {/* Coverage Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                  marginBottom: '32px'
                }}
                className="coverage-tags-grid"
              >
                {serviceAreas.coverage.map((area, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: 'var(--color-text-main)'
                    }}
                  >
                    <CheckCircle2 size={16} style={{ color: 'var(--color-secondary)', flexShrink: 0 }} />
                    <span>{area}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <Button
                  variant="secondary"
                  onClick={onOpenQuote}
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Check Coverage & Get Quote
                </Button>
              </div>
            </div>

            {/* Right Column: Visual UK Pin Highlight Card with Float Animation */}
            <div
              className="float-animation"
              style={{
                backgroundColor: 'var(--color-primary)',
                borderRadius: 'var(--radius-lg)',
                padding: '40px 32px',
                color: '#FFFFFF',
                textAlign: 'center',
                boxShadow: 'var(--shadow-primary)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  color: 'var(--color-secondary)'
                }}
              >
                <Navigation size={32} />
              </div>

              <h4 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '8px' }}>
                Local Liverpool Trades
              </h4>

              <p style={{ fontSize: '14px', color: '#CBD5E1', lineHeight: '1.6', marginBottom: '20px' }}>
                Fast response times, local know-how, and dependable scheduling for homeowners and landlords.
              </p>

              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  padding: '12px 20px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '13px',
                  fontWeight: '700',
                  color: '#FFFFFF'
                }}
              >
                📍 L22 1RJ, Liverpool, UK
              </div>
            </div>

          </div>
        </ScrollReveal>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .service-area-card {
            grid-template-columns: 1fr !important;
            padding: 36px 24px !important;
          }
          .coverage-tags-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
