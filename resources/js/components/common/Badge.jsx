import React from 'react';

export default function Badge({ children, variant = 'primary', className = '' }) {
  const styles = {
    primary: { background: 'var(--color-primary-light)', color: 'var(--color-primary)' },
    accent: { background: 'var(--color-accent-light)', color: 'var(--color-accent)' },
    dark: { background: 'var(--color-dark)', color: '#FFFFFF' },
    white: { background: '#FFFFFF', color: 'var(--color-primary)', boxShadow: 'var(--shadow-sm)' }
  }[variant] || {};

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 12px',
        borderRadius: 'var(--radius-full)',
        fontSize: '12px',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        ...styles
      }}
    >
      {children}
    </span>
  );
}
