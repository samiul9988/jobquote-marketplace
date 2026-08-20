import React from 'react';
import { X } from 'lucide-react';

export default function Lightbox({ isOpen, onClose, image, title, category }) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(10, 20, 28, 0.9)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        backdropFilter: 'blur(8px)'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          maxWidth: '900px',
          width: '100%',
          maxHeight: '90vh',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 10,
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'rgba(18, 30, 40, 0.7)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          aria-label="Close Lightbox"
        >
          <X size={20} />
        </button>

        <div style={{ maxHeight: '70vh', overflow: 'hidden', background: '#000' }}>
          <img
            src={image}
            alt={title}
            style={{
              width: '100%',
              height: '100%',
              maxHeight: '70vh',
              objectFit: 'contain',
              display: 'block'
            }}
          />
        </div>

        <div style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-primary)', textTransform: 'uppercase' }}>
              {category}
            </span>
            <h4 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--color-text-main)', marginTop: '2px' }}>
              {title}
            </h4>
          </div>
          <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
            Paintters High-Standard Finish
          </span>
        </div>
      </div>
    </div>
  );
}
