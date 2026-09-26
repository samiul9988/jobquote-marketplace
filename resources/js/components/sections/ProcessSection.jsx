import { usePage } from '@inertiajs/react';
import React from 'react';
import SectionHeader from '../common/SectionHeader';
import ScrollReveal from '../common/ScrollReveal';
import { processSteps } from '../../data/siteData';

export default function ProcessSection() {
  const { settings = {} } = usePage().props;
  const dynSteps = [1, 2, 3, 4].map(n => ({
    step: settings[`home_step${n}_num`] || (processSteps[n - 1] ? processSteps[n - 1].step : '0' + n),
    title: settings[`home_step${n}_title`] || (processSteps[n - 1] ? processSteps[n - 1].title : ''),
    description: settings[`home_step${n}_desc`] || (processSteps[n - 1] ? processSteps[n - 1].description : ''),
  }));
  return (
    <section style={{ padding: '100px 0', backgroundColor: 'var(--color-dark)', color: '#FFFFFF' }}>
      <div className="container-custom">

        {/* Section Header */}
        <ScrollReveal animation="fade-up">
          <SectionHeader
            badge="How It Works"
            title="Simple, Transparent 4-Step Process"
            description="From initial contact to the completed job, we make hiring trusted trades straightforward and stress-free."
            align="center"
            light={true}
          />
        </ScrollReveal>

        {/* 4 Process Cards with Step-by-step Scroll Reveal */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
            marginTop: '50px'
          }}
          className="process-grid"
        >
          {dynSteps.map((step, idx) => (
            <ScrollReveal key={step.step} animation="fade-up" delay={idx * 130} duration={650}>
              <div
                className="paintters-card process-card"
                style={{
                  backgroundColor: 'var(--color-dark-surface)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '36px 28px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  height: '100%'
                }}
              >
                {/* Step Number Top Badge */}
                <div
                  style={{
                    display: 'inline-block',
                    fontSize: '18px',
                    fontWeight: '900',
                    color: 'var(--color-secondary)',
                    backgroundColor: 'rgba(242, 101, 34, 0.12)',
                    padding: '6px 16px',
                    borderRadius: 'var(--radius-full)',
                    marginBottom: '20px'
                  }}
                >
                  Step {step.step}
                </div>

                <h4 style={{ fontSize: '20px', fontWeight: '800', color: '#FFFFFF', marginBottom: '12px' }}>
                  {step.title}
                </h4>

                <p style={{ fontSize: '14px', color: '#94A3B8', lineHeight: '1.7' }}>
                  {step.description}
                </p>

                {/* Watermark Number in Background */}
                <div
                  style={{
                    position: 'absolute',
                    right: '15px',
                    bottom: '-10px',
                    fontSize: '80px',
                    fontWeight: '900',
                    color: 'rgba(255, 255, 255, 0.03)',
                    pointerEvents: 'none',
                    userSelect: 'none',
                    fontFamily: 'var(--font-heading)'
                  }}
                >
                  {step.step}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>

      <style>{`
        .process-card:hover {
          transform: translateY(-5px);
          border-color: var(--color-secondary);
          background-color: var(--color-dark-card);
        }
      `}</style>
    </section>
  );
}
