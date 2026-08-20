import { usePage } from '@inertiajs/react';
import React from 'react';
import { CheckCircle2, ArrowRight, MapPin } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import Button from '../common/Button';
import ScrollReveal from '../common/ScrollReveal';
import { aboutData, siteInfo } from '../../data/siteData';

export default function AboutSection({ onOpenQuote }) {
  const { settings = {} } = usePage().props;
  const dynAbout = {
    badge: settings.home_about_badge || aboutData.badge,
    title: settings.home_about_title || aboutData.title,
    description: settings.home_about_desc || aboutData.description,
    commitments: [
      settings.home_about_commit1 || (aboutData.commitments && aboutData.commitments[0]) || '',
      settings.home_about_commit2 || (aboutData.commitments && aboutData.commitments[1]) || '',
      settings.home_about_commit3 || (aboutData.commitments && aboutData.commitments[2]) || '',
      settings.home_about_commit4 || (aboutData.commitments && aboutData.commitments[3]) || '',
    ].filter(Boolean),
    serviceLocation: aboutData.serviceLocation,
  };
  // duplicate removed
  return (
    <section id="about" style={{ padding: '100px 0', backgroundColor: 'var(--color-light)' }}>
      <div className="container-custom">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.05fr 1fr',
            gap: '60px',
            alignItems: 'center'
          }}
          className="about-grid"
        >
          {/* Left Column: Layered Images Collage with Slide In Right */}
          <ScrollReveal animation="fade-right" duration={700}>
            <div style={{ position: 'relative' }} className="about-img-wrapper">
              
              {/* Main Primary Image */}
              <div
                style={{
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-lg)',
                  height: '460px'
                }}
              >
                <img
                  src="/images/projects/service-painting.jpg"
                  alt="SK Home Solutions Painting Work"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Secondary Layered Image */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-35px',
                  right: '-30px',
                  width: '55%',
                  height: '240px',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  border: '6px solid #FFFFFF',
                  boxShadow: 'var(--shadow-lg)'
                }}
                className="about-secondary-img"
              >
                <img
                  src="/images/projects/service-carpentry.jpg"
                  alt="SK Home Solutions Carpentry Work"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Location Trust Badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '25px',
                  left: '-20px',
                  backgroundColor: 'var(--color-primary)',
                  color: '#FFFFFF',
                  padding: '12px 20px',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                className="about-location-badge"
              >
                <MapPin size={18} style={{ color: 'var(--color-secondary)' }} />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '800' }}>Liverpool, UK</div>
                  <div style={{ fontSize: '11px', color: '#CBD5E1' }}>& Surrounding Areas</div>
                </div>
              </div>

            </div>
          </ScrollReveal>

          {/* Right Column: Introduction Content with Slide In Left */}
          <ScrollReveal animation="fade-left" duration={700} delay={150}>
            <div>
              <SectionHeader
                badge={dynAbout.badge}
                title={dynAbout.title}
                align="left"
              />

              <p style={{ fontSize: '15px', color: 'var(--color-text-muted)', lineHeight: '1.8', marginBottom: '24px' }}>
                {dynAbout.description}
              </p>

              {/* Commitments Checklist */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
                {dynAbout.commitments.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-secondary-light)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <CheckCircle2 size={16} style={{ color: 'var(--color-secondary)' }} />
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-text-main)' }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Dual CTAs */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <Button
                  variant="secondary"
                  onClick={onOpenQuote}
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Learn More About Us
                </Button>

                <a
                  href={`tel:${(settings.phone || siteInfo.phone).replace(/\s+/g, '')}`}
                  style={{
                    fontSize: '14px',
                    fontWeight: '700',
                    color: 'var(--color-primary)',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span>Call Us:</span>
                  <span style={{ color: 'var(--color-secondary)' }}>{(settings.phone || siteInfo.phoneDisplay)}</span>
                </a>
              </div>

            </div>
          </ScrollReveal>

        </div>
      </div>

      <style>{`
        @media (max-width: 991px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .about-secondary-img {
            right: 0 !important;
            bottom: -20px !important;
          }
          .about-location-badge {
            left: 10px !important;
          }
        }
      `}</style>
    </section>
  );
}
