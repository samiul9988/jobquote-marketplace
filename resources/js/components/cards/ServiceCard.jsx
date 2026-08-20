import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import * as Icons from 'lucide-react';

export default function ServiceCard({ service, onSelectService }) {
  const IconComponent = Icons[service.icon] || Icons.Paintbrush;

  return (
    <div
      className="paintters-card"
      style={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      {/* Image with Tag */}
      <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
        <img
          src={service.image}
          alt={service.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
          className="service-card-img"
        />
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            left: '16px',
            backgroundColor: 'var(--color-primary)',
            color: '#FFFFFF',
            padding: '4px 14px',
            borderRadius: 'var(--radius-full)',
            fontSize: '12px',
            fontWeight: '700',
            textTransform: 'uppercase'
          }}
        >
          {service.category}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <IconComponent size={20} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--color-text-main)' }}>
              {service.title}
            </h3>
          </div>

          <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: '1.6', marginBottom: '20px' }}>
            {service.description}
          </p>

          {/* Sub-features */}
          {service.features && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
              {service.features.map((feat, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--color-text-main)', fontWeight: '500' }}>
                  <div style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Check size={12} />
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => onSelectService(service)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--color-primary)',
            fontSize: '14px',
            fontWeight: '700',
            paddingTop: '16px',
            borderTop: '1px solid var(--color-border)',
            width: '100%',
            justifyContent: 'space-between'
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = 'var(--color-primary-hover)')}
          onMouseOut={(e) => (e.currentTarget.style.color = 'var(--color-primary)')}
        >
          <span>Request This Service</span>
          <ArrowRight size={16} />
        </button>
      </div>

      <style>{`
        .paintters-card:hover .service-card-img {
          transform: scale(1.06);
        }
      `}</style>
    </div>
  );
}
