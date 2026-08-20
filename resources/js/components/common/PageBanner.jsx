import React from 'react';
import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function PageBanner({
  title,
  subtitle,
  breadcrumb = [],
  backgroundImage = '/images/projects/gallery-interior.jpg'
}) {
  return (
    <section
      style={{
        position: 'relative',
        paddingTop: '160px',
        paddingBottom: '90px',
        backgroundImage: `linear-gradient(rgba(16, 22, 58, 0.82), rgba(16, 22, 58, 0.88)), url('${backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: '#FFFFFF',
        textAlign: 'center',
        overflow: 'hidden'
      }}
      className="page-hero-banner"
    >
      {/* Decorative Brand Accent Background Swoosh */}
      <div
        style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          backgroundColor: 'rgba(242, 101, 34, 0.12)',
          pointerEvents: 'none'
        }}
      />

      <div className="container-custom" style={{ position: 'relative', zIndex: 2 }}>
        <ScrollReveal animation="fade-up" duration={600}>
          
          {/* Breadcrumb Navigation */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: '6px 18px',
              borderRadius: 'var(--radius-full)',
              fontSize: '13px',
              fontWeight: '600',
              marginBottom: '20px',
              backdropFilter: 'blur(4px)'
            }}
          >
            <Link href="/" style={{ color: '#CBD5E1', textDecoration: 'none' }}>
              Home
            </Link>
            <ChevronRight size={14} style={{ color: 'var(--color-secondary)' }} />
            <span style={{ color: 'var(--color-secondary)' }}>{title}</span>
          </div>

          {/* Page Main Title */}
          <h1
            style={{
              fontSize: '52px',
              fontWeight: '900',
              color: '#FFFFFF',
              lineHeight: '1.1',
              marginBottom: '14px',
              fontFamily: 'var(--font-heading)',
              letterSpacing: '-0.5px',
              textShadow: '0 4px 16px rgba(0, 0, 0, 0.4)'
            }}
            className="page-banner-title"
          >
            {title}
          </h1>

          {/* Subtitle Slogan */}
          {subtitle && (
            <p
              style={{
                fontSize: '17px',
                color: '#E2E8F0',
                maxWidth: '620px',
                margin: '0 auto',
                lineHeight: '1.6',
                fontWeight: '500'
              }}
            >
              {subtitle}
            </p>
          )}

        </ScrollReveal>
      </div>

      <style>{`
        .page-banner-title {
          color: #FFFFFF !important;
        }
        @media (max-width: 768px) {
          .page-hero-banner {
            padding-top: 130px !important;
            padding-bottom: 70px !important;
          }
          .page-banner-title {
            font-size: 38px !important;
          }
        }
      `}</style>
    </section>
  );
}


