import React from 'react';
import { Star, Quote } from 'lucide-react';

export default function TestimonialCard({ testimonial }) {
  return (
    <div
      className="paintters-card"
      style={{
        padding: '36px 32px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        position: 'relative'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '24px',
          right: '28px',
          color: 'var(--color-primary-light)'
        }}
      >
        <Quote size={48} />
      </div>

      <div>
        {/* Star rating */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '18px' }}>
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} size={16} fill="#FFB800" color="#FFB800" />
          ))}
        </div>

        {/* Quote text */}
        <p style={{ fontSize: '15px', color: 'var(--color-text-main)', lineHeight: '1.7', fontStyle: 'italic', marginBottom: '28px' }}>
          "{testimonial.quote}"
        </p>
      </div>

      {/* Author info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '2px solid var(--color-primary)'
          }}
        />
        <div>
          <h5 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--color-text-main)' }}>
            {testimonial.name}
          </h5>
          <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontWeight: '500' }}>
            {testimonial.role}
          </span>
        </div>
      </div>
    </div>
  );
}
