import React from 'react';

export default function SectionHeader({
  badge,
  title,
  description,
  align = 'center',
  light = false,
  className = ''
}) {
  const alignmentStyles = {
    center: { textAlign: 'center', margin: '0 auto' },
    left: { textAlign: 'left', margin: '0' },
    right: { textAlign: 'right', margin: '0 0 0 auto' }
  }[align];

  return (
    <div
      className={`section-header-block ${className}`}
      style={{
        ...alignmentStyles,
        maxWidth: align === 'center' ? '700px' : '600px',
        marginBottom: '48px'
      }}
    >
      {badge && (
        <span className={`section-badge ${light ? 'badge-white' : ''}`}>
          {badge}
        </span>
      )}
      {title && (
        <h2 className={`section-title ${light ? 'title-white' : ''}`}>
          {title}
        </h2>
      )}
      {description && (
        <p className={`section-desc ${light ? 'desc-white' : ''}`} style={align === 'center' ? { margin: '0 auto' } : {}}>
          {description}
        </p>
      )}
    </div>
  );
}
