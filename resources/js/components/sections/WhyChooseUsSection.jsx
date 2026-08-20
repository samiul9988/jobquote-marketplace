import { usePage } from '@inertiajs/react';
import React from 'react';
import { ShieldCheck, Clock, Sparkles, UserCheck, HeartHandshake, Sparkle, ArrowRight } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import Button from '../common/Button';
import ScrollReveal from '../common/ScrollReveal';
import { whyChoosePoints } from '../../data/siteData';

const iconMap = {
  ShieldCheck: ShieldCheck,
  Clock: Clock,
  Sparkles: Sparkles,
  UserCheck: UserCheck,
  HeartHandshake: HeartHandshake,
  Sparkle: Sparkle
};

export default function WhyChooseUsSection({ onOpenQuote }) {
  const { settings = {} } = usePage().props;
  const dynWhyPoints = [1,2,3,4,5,6].map(n => ({
    id: n,
    icon: settings[`home_why${n}_icon`] || (whyChoosePoints[n-1] ? whyChoosePoints[n-1].icon : ''),
    title: settings[`home_why${n}_title`] || (whyChoosePoints[n-1] ? whyChoosePoints[n-1].title : ''),
    description: settings[`home_why${n}_desc`] || (whyChoosePoints[n-1] ? whyChoosePoints[n-1].description : ''),
  }));
  return (
    <section style={{ padding: '100px 0', backgroundColor: 'var(--color-light)' }}>
      <div className="container-custom">
        
        {/* Section Header */}
        <ScrollReveal animation="fade-up">
          <SectionHeader
            badge="Why Choose Us"
            title="Built on Trust, Delivered with Pride"
            description="We take a transparent, reliable, and professional approach to home improvement, ensuring you receive high-standard results with total peace of mind."
            align="center"
          />
        </ScrollReveal>

        {/* 6 Clean Trust Pillar Cards with Cascading Scroll Reveal */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
            marginTop: '50px'
          }}
          className="why-choose-grid"
        >
          {dynWhyPoints.map((point, idx) => {
            const IconComp = iconMap[point.icon] || ShieldCheck;
            return (
              <ScrollReveal key={point.id} animation="fade-up" delay={idx * 90} duration={600}>
                <div
                  className="paintters-card why-card"
                  style={{
                    padding: '36px 30px',
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--color-border)',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    gap: '20px',
                    alignItems: 'flex-start',
                    height: '100%'
                  }}
                >
                  {/* Icon Box */}
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '16px',
                      backgroundColor: 'var(--color-primary-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      color: 'var(--color-primary)',
                      transition: 'all 0.3s ease'
                    }}
                    className="why-icon-box"
                  >
                    <IconComp size={24} />
                  </div>

                  {/* Content */}
                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--color-primary)', marginBottom: '8px' }}>
                      {point.title}
                    </h4>
                    <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: '1.65' }}>
                      {point.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Bottom CTA bar */}
        <ScrollReveal animation="fade-up" delay={200}>
          <div
            style={{
              marginTop: '50px',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '16px',
              flexWrap: 'wrap'
            }}
          >
            <span style={{ fontSize: '16px', fontWeight: '700', color: 'var(--color-text-main)' }}>
              Have a project in mind for your home?
            </span>
            <Button
              variant="secondary"
              onClick={onOpenQuote}
              icon={ArrowRight}
              iconPosition="right"
            >
              Get a Free Quote Today
            </Button>
          </div>
        </ScrollReveal>

      </div>

      <style>{`
        .why-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
          border-color: var(--color-secondary);
        }
        .why-card:hover .why-icon-box {
          background-color: var(--color-secondary);
          color: #FFFFFF;
        }
      `}</style>
    </section>
  );
}
