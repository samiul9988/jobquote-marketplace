import React from 'react';
import * as Icons from 'lucide-react';

export default function FeatureCard({ icon, title, description, stepNumber }) {
  const IconComponent = Icons[icon] || Icons.Sparkles;

  return (
    <div
      className="paintters-card"
      style={{
        padding: '32px 28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {stepNumber && (
        <span
          style={{
            position: 'absolute',
            top: '16px',
            right: '20px',
            fontSize: '32px',
            fontWeight: '900',
            color: 'var(--color-primary-light)',
            fontFamily: 'var(--font-heading)'
          }}
        >
          {stepNumber}
        </span>
      )}

      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          backgroundColor: 'var(--color-primary-light)',
          color: 'var(--color-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 15px rgba(0, 135, 90, 0.12)'
        }}
      >
        <IconComponent size={26} />
      </div>

      <div>
        <h4 style={{ fontSize: '19px', fontWeight: '800', color: 'var(--color-text-main)', marginBottom: '8px' }}>
          {title}
        </h4>
        <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
          {description}
        </p>
      </div>
    </div>
  );
}
