import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import Button from '../common/Button';

export default function PricingCard({ plan, onSelectPlan }) {
  return (
    <div
      className="paintters-card"
      style={{
        padding: '40px 32px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        borderColor: plan.isPopular ? 'var(--color-primary)' : 'var(--color-border)',
        boxShadow: plan.isPopular ? '0 15px 35px rgba(0, 135, 90, 0.15)' : 'var(--shadow-sm)',
        transform: plan.isPopular ? 'scale(1.03)' : 'none'
      }}
    >
      {plan.isPopular && (
        <div
          style={{
            position: 'absolute',
            top: '-14px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'var(--color-accent)',
            color: '#FFFFFF',
            fontSize: '11px',
            fontWeight: '800',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            padding: '4px 16px',
            borderRadius: 'var(--radius-full)',
            boxShadow: '0 4px 12px rgba(255, 94, 94, 0.3)'
          }}
        >
          Most Popular
        </div>
      )}

      <div>
        <h3 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--color-text-main)', marginBottom: '8px' }}>
          {plan.name}
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '24px', minHeight: '40px' }}>
          {plan.description}
        </p>

        {/* Price tag */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '28px', paddingBottom: '24px', borderBottom: '1px solid var(--color-border)' }}>
          <span style={{ fontSize: '42px', fontWeight: '900', color: 'var(--color-text-main)', fontFamily: 'var(--font-heading)' }}>
            {plan.price}
          </span>
          <span style={{ fontSize: '14px', color: 'var(--color-text-muted)', fontWeight: '600' }}>
            / {plan.period}
          </span>
        </div>

        {/* Features list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '36px' }}>
          {plan.features.map((feat, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: 'var(--color-text-main)' }}>
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '2px'
                }}
              >
                <Check size={13} />
              </div>
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant={plan.isPopular ? 'primary' : 'outline'}
        fullWidth
        icon={ArrowRight}
        onClick={() => onSelectPlan(plan)}
      >
        Choose This Plan
      </Button>
    </div>
  );
}
