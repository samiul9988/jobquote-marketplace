import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import Button from '../common/Button';
import ScrollReveal from '../common/ScrollReveal';
import { services } from '../../data/siteData';

export default function ServicesSection({ onSelectService }) {
  return (
    <section id="services" style={{ padding: '100px 0', backgroundColor: '#FFFFFF' }}>
      <div className="container-custom">
        
        {/* Section Header */}
        <ScrollReveal animation="fade-up">
          <SectionHeader
            badge="Our Core Services"
            title="Professional Home Improvement & Property Solutions"
            description="We specialize in two core trade areas, delivering exceptional quality, clean execution, and reliable service across Liverpool."
            align="center"
          />
        </ScrollReveal>

        {/* 2 Major Service Cards Grid with Staggered Scroll Reveal */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '32px',
            marginTop: '50px'
          }}
          className="services-cards-grid"
        >
          {services.map((service, idx) => (
            <ScrollReveal key={service.id} animation="fade-up" delay={idx * 160} duration={650}>
              <div
                className="paintters-card service-master-card"
                style={{
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: 'var(--shadow-md)',
                  transition: 'all 0.3s ease',
                  border: '1px solid var(--color-border)',
                  backgroundColor: '#FFFFFF',
                  height: '100%'
                }}
              >
                {/* Image Container with Tag Badge */}
                <div style={{ position: 'relative', height: '280px', overflow: 'hidden' }}>
                  <img
                    src={service.image}
                    alt={service.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                    className="service-img"
                  />
                  
                  {/* Badge Tag */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '20px',
                      left: '20px',
                      backgroundColor: 'var(--color-primary)',
                      color: '#FFFFFF',
                      padding: '6px 16px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '12px',
                      fontWeight: '700',
                      letterSpacing: '0.5px'
                    }}
                  >
                    {service.badge}
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: '36px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  
                  <h3 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--color-primary)', marginBottom: '8px' }}>
                    {service.title}
                  </h3>
                  
                  <p style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-secondary)', marginBottom: '14px' }}>
                    {service.tagline}
                  </p>

                  <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: '1.7', marginBottom: '24px' }}>
                    {service.description}
                  </p>

                  {/* Sub-services Checklist */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px', flexGrow: 1 }}>
                    {service.features.map((item, fIdx) => (
                      <div key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <CheckCircle2 size={16} style={{ color: 'var(--color-secondary)', flexShrink: 0 }} />
                        <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-text-main)' }}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Card CTA */}
                  <Button
                    variant="secondary"
                    fullWidth
                    href={`/services/${service.service_id}`} inertiaLink={true}
                    icon={ArrowRight}
                    iconPosition="right"
                  >
                    Request a Free Quote
                  </Button>

                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>

      <style>{`
        .service-master-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-lg);
          border-color: var(--color-secondary);
        }
        .service-master-card:hover .service-img {
          transform: scale(1.05);
        }
        @media (max-width: 768px) {
          .services-cards-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
