import { usePage } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { heroData } from '../../data/siteData';

export default function HeroSection({ onOpenQuote, heroImages = [] }) {
  const { settings = {} } = usePage().props;
  const heroData_dyn = {
    headline: settings.home_hero_headline || heroData.headline,
    subtitle: settings.home_hero_subtitle || heroData.subtitle,
    primaryBtnText: settings.home_hero_btn1 || heroData.primaryBtnText,
    secondaryBtnText: settings.home_hero_btn2 || heroData.secondaryBtnText,
    trustIndicators: heroData.trustIndicators,
  };
  // High-resolution trade project background images for continuous smooth Ken Burns zoom
  const staticFallbackImages = [
    { url: "/images/projects/gallery-interior.jpg", title: "Contemporary Interior Decorating" },
    { url: "/images/projects/service-carpentry.jpg", title: "Master Carpentry & Joinery" },
    { url: "/images/projects/service-painting.jpg", title: "Professional Painting & Decorating" },
    { url: "/images/projects/gallery-doors.jpg", title: "Solid Oak Door & Joinery Installation" },
  ];
  const backgroundImages = heroImages.length > 0
    ? heroImages.map((img, i) => ({ url: img.image, title: "Slide " + (i + 1) }))
    : staticFallbackImages;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState(0);

  // Preload all background images
  useEffect(() => {
    backgroundImages.forEach((img) => {
      const imgObj = new Image();
      imgObj.src = img.url;
    });
  }, []);

  // Automatic seamless transition every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setPrevIdx(currentIdx);
      setCurrentIdx((prev) => (prev + 1) % backgroundImages.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [currentIdx, backgroundImages.length]);

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '880px',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '100px',
        paddingBottom: '90px',
        overflow: 'hidden'
      }}
      className="paintters-hero-authentic"
    >
      {/* Seamless Dual-Buffer Background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          zIndex: 0
        }}
      >
        {/* Previous Image Underneath Layer */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url('${backgroundImages[prevIdx].url}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
            backgroundRepeat: 'no-repeat',
            transform: 'scale(1.12)',
            zIndex: 1
          }}
        />

        {/* Active Image Top Layer with Smooth Ken Burns */}
        <div
          key={currentIdx}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url('${backgroundImages[currentIdx].url}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
            backgroundRepeat: 'no-repeat',
            zIndex: 2,
            animation: 'heroKenBurns 6.5s ease-out forwards'
          }}
        />

        {/* Soft Ambient Light Gradient Overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.08)',
            pointerEvents: 'none',
            zIndex: 3
          }}
        />
      </div>

      <div className="container-custom" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            alignItems: 'center'
          }}
          className="hero-grid-authentic"
        >
          {/* Left Column: Authentic White Brush Stroke Badge with Slogan & Dual Buttons */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              transform: 'translateY(-15px)'
            }}
            className="brush-badge-wrapper"
          >
            <div
              style={{
                position: 'relative',
                maxWidth: '660px',
                width: '100%',
                minHeight: '660px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '75px 50px',
                textAlign: 'center'
              }}
              className="brush-stroke-container"
            >
              {/* Larger Authentic White Acrylic Brush Stroke Image */}
              <img
                src="/images/brush-stroke-badge.png"
                alt="Brush Stroke Badge"
                style={{
                  position: 'absolute',
                  top: '-15%',
                  left: '-15%',
                  width: '130%',
                  height: '130%',
                  objectFit: 'contain',
                  zIndex: 1,
                  pointerEvents: 'none',
                  filter: 'drop-shadow(0 20px 45px rgba(0, 0, 0, 0.15))'
                }}
                className="brush-stroke-image"
              />

              {/* Content Inside Brush Stroke */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  maxWidth: '470px'
                }}
                className="brush-content-wrapper"
              >
                {/* Official Slogan Headline */}
                <h1
                  style={{
                    fontSize: '48px',
                    fontWeight: '900',
                    color: 'var(--color-primary)',
                    lineHeight: '1.1',
                    marginBottom: '16px',
                    fontFamily: 'var(--font-heading)',
                    letterSpacing: '-0.5px'
                  }}
                  className="brush-hero-title"
                >
                  Built on Trust,<br />
                  <span style={{ color: 'var(--color-secondary)' }}>Finished with Excellence.</span>
                </h1>

                {/* Subtitle Paragraph */}
                <p
                  style={{
                    fontSize: '14px',
                    color: '#475569',
                    lineHeight: '1.65',
                    marginBottom: '24px',
                    fontWeight: '500',
                    textAlign: 'center'
                  }}
                  className="brush-hero-desc"
                >
                  {heroData_dyn.subtitle}
                </p>

                {/* Dual Action Buttons */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    flexWrap: 'wrap',
                    marginBottom: '24px'
                  }}
                  className="hero-buttons-wrapper"
                >
                  {/* Primary CTA: Get a Free Quote */}
                  <button
                    onClick={onOpenQuote}
                    style={{
                      backgroundColor: 'var(--color-secondary)',
                      color: '#FFFFFF',
                      fontSize: '15px',
                      fontWeight: '700',
                      padding: '14px 32px',
                      borderRadius: '9999px',
                      boxShadow: '0 8px 22px rgba(242, 101, 34, 0.4)',
                      transition: 'all 0.3s ease',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--color-secondary-hover)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 12px 28px rgba(242, 101, 34, 0.5)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--color-secondary)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 8px 22px rgba(242, 101, 34, 0.4)';
                    }}
                  >
                    {heroData_dyn.primaryBtnText}
                  </button>

                  {/* Secondary CTA: View Our Services */}
                  <a
                    href="#services"
                    style={{
                      backgroundColor: 'var(--color-primary-light)',
                      color: 'var(--color-primary)',
                      fontSize: '15px',
                      fontWeight: '700',
                      padding: '14px 28px',
                      borderRadius: '9999px',
                      border: '1.5px solid var(--color-border)',
                      transition: 'all 0.3s ease',
                      textDecoration: 'none',
                      display: 'inline-block'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                      e.currentTarget.style.color = '#FFFFFF';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--color-primary-light)';
                      e.currentTarget.style.color = 'var(--color-primary)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {heroData_dyn.secondaryBtnText}
                  </a>
                </div>

                {/* 4 Quick Trust Indicators (No fake stats) */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '8px 12px',
                    width: '100%',
                    paddingTop: '16px',
                    borderTop: '1px dashed #E2E8F0'
                  }}
                  className="hero-trust-grid"
                >
                  {heroData_dyn.trustIndicators.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '12px',
                        fontWeight: '700',
                        color: 'var(--color-primary)'
                      }}
                    >
                      <CheckCircle2 size={15} style={{ color: 'var(--color-secondary)', flexShrink: 0 }} />
                      <span style={{ whiteSpace: 'nowrap' }}>{item}</span>
                    </div>
                  ))}
                </div>

              </div>

            </div>

          </div>

          {/* Right Column Spacer */}
          <div className="hero-right-spacer" />
        </div>

        {/* Minimalist Background Slider Indicator Dots */}
        <div
          style={{
            position: 'absolute',
            bottom: '-40px',
            right: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            zIndex: 20
          }}
          className="hero-slider-dots"
        >
          {backgroundImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setPrevIdx(currentIdx);
                setCurrentIdx(idx);
              }}
              style={{
                width: idx === currentIdx ? '28px' : '8px',
                height: '8px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: idx === currentIdx ? 'var(--color-secondary)' : 'rgba(255, 255, 255, 0.6)',
                transition: 'all 0.4s ease',
                border: 'none',
                cursor: 'pointer',
                padding: 0
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>

      <style>{`
        @keyframes heroKenBurns {
          0% {
            opacity: 0;
            transform: scale(1.0);
          }
          15% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            opacity: 1;
            transform: scale(1.14);
          }
        }
        @media (max-width: 991px) {
          .hero-grid-authentic {
            grid-template-columns: 1fr !important;
          }
          .brush-badge-wrapper {
            justify-content: center !important;
            transform: translateY(0) !important;
          }
          .paintters-hero-authentic {
            min-height: 860px !important;
            min-height: 90vh !important;
            padding-top: 130px !important;
            padding-bottom: 80px !important;
          }
          .brush-hero-title {
            font-size: 34px !important;
          }
          .brush-stroke-container {
            max-width: 580px !important;
            min-height: 580px !important;
            padding: 65px 35px !important;
          }
          .brush-stroke-image {
            top: -12% !important;
            left: -14% !important;
            width: 128% !important;
            height: 124% !important;
            object-fit: fill !important;
          }
          .hero-slider-dots {
            bottom: 20px !important;
            right: 50% !important;
            transform: translateX(50%) !important;
          }
        }
        @media (max-width: 640px) {
          .paintters-hero-authentic {
            min-height: 820px !important;
            min-height: 92vh !important;
            padding-top: 120px !important;
            padding-bottom: 70px !important;
          }
          .brush-stroke-container {
            max-width: 92% !important;
            min-height: 520px !important;
            padding: 60px 24px 50px !important;
            margin: 0 auto !important;
          }
          .brush-stroke-image {
            top: -10% !important;
            left: -16% !important;
            width: 132% !important;
            height: 122% !important;
            object-fit: fill !important;
          }
          .brush-hero-title {
            font-size: 28px !important;
            line-height: 1.16 !important;
            margin-bottom: 12px !important;
          }
          .brush-hero-desc {
            font-size: 13.5px !important;
            line-height: 1.5 !important;
            margin-bottom: 18px !important;
          }
          .hero-buttons-wrapper {
            gap: 10px !important;
            margin-bottom: 18px !important;
          }
          .hero-buttons-wrapper button,
          .hero-buttons-wrapper a {
            padding: 12px 24px !important;
            font-size: 14px !important;
          }
          .hero-trust-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 6px 10px !important;
            padding-top: 14px !important;
          }
        }
        @media (max-width: 480px) {
          .paintters-hero-authentic {
            min-height: 800px !important;
            min-height: 92vh !important;
            padding-top: 115px !important;
            padding-bottom: 65px !important;
          }
          .brush-stroke-container {
            max-width: 95% !important;
            min-height: 500px !important;
            padding: 55px 18px 45px !important;
          }
          .brush-stroke-image {
            top: -9% !important;
            left: -14% !important;
            width: 128% !important;
            height: 120% !important;
            object-fit: fill !important;
          }
          .brush-hero-title {
            font-size: 25px !important;
            line-height: 1.18 !important;
            margin-bottom: 10px !important;
          }
          .brush-hero-desc {
            font-size: 12.5px !important;
            line-height: 1.48 !important;
            margin-bottom: 15px !important;
          }
          .hero-buttons-wrapper {
            gap: 8px !important;
            margin-bottom: 14px !important;
          }
          .hero-buttons-wrapper button,
          .hero-buttons-wrapper a {
            padding: 11px 20px !important;
            font-size: 13px !important;
          }
          .hero-trust-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 6px 6px !important;
            padding-top: 12px !important;
          }
          .hero-trust-grid div {
            font-size: 11px !important;
          }
        }
        @media (max-width: 360px) {
          .paintters-hero-authentic {
            min-height: 760px !important;
            min-height: 94vh !important;
            padding-top: 100px !important;
            padding-bottom: 50px !important;
          }
          .brush-stroke-container {
            max-width: 98% !important;
            padding: 48px 14px 38px !important;
          }
          .brush-stroke-image {
            top: -8% !important;
            left: -12% !important;
            width: 124% !important;
            height: 118% !important;
            object-fit: fill !important;
          }
          .brush-hero-title {
            font-size: 22px !important;
          }
          .brush-hero-desc {
            font-size: 11.5px !important;
          }
          .hero-buttons-wrapper {
            flex-direction: column !important;
            width: 100% !important;
          }
          .hero-buttons-wrapper button,
          .hero-buttons-wrapper a {
            width: 100% !important;
            text-align: center !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
}
