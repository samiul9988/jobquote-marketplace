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
            background: 'rgba(0, 0, 0, 0.2)',
            pointerEvents: 'none',
            zIndex: 3
          }}
        />

        {/* Premium Seamless White Gradient Fade */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.95) 30%, rgba(255,255,255,0.5) 55%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 4
          }}
          className="hero-gradient-fade"
        />
      </div>



      <div className="container-custom" style={{ position: 'relative', zIndex: 10, width: '100%', paddingTop: '100px', paddingBottom: '90px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            alignItems: 'center'
          }}
          className="hero-grid-authentic"
        >
          {/* Left Column: Authentic White Brush Stroke Badge with Slogan & Dual Buttons */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
            }}
            className="brush-badge-wrapper"
          >
            <div
              style={{
                position: 'relative',
                maxWidth: '660px',
                width: '100%',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                flexDirection: 'column',
                textAlign: 'left',
                padding: '40px 40px 40px 0',
                zIndex: 10
              }}
              className="content-card-wrapper"
            >
              
              <div
                style={{
                  position: 'relative',
                  zIndex: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  maxWidth: '560px'
                }}
                className="brush-content-wrapper"
              >
                <div style={{
                    fontSize: '13px',
                    fontWeight: '800',
                    color: 'var(--color-primary)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginBottom: '20px'
                }}>
                    Professional Painting & Decorating Services
                </div>

                {/* Official Slogan Headline */}
                <h1
                  style={{
                    fontSize: '64px',
                    fontWeight: '900',
                    color: 'var(--color-primary)',
                    lineHeight: '1.1',
                    marginBottom: '24px',
                    fontFamily: 'var(--font-heading)',
                    letterSpacing: '-1px'
                  }}
                  className="brush-hero-title"
                >
                  Built on Trust,<br />
                  <span style={{ color: 'var(--color-secondary)' }}>Finished with <br className="hidden-mobile"/> Excellence.</span>
                </h1>

                {/* Subtitle Paragraph */}
                <p
                  style={{
                    fontSize: '18px',
                    color: '#475569',
                    lineHeight: '1.65',
                    marginBottom: '40px',
                    fontWeight: '500',
                    textAlign: 'left',
                    maxWidth: '480px'
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
                    justifyContent: 'flex-start',
                    gap: '16px',
                    flexWrap: 'wrap',
                    marginBottom: '24px'
                  }}
                  className="hero-buttons-wrapper"
                >
                  {/* Primary CTA: Get a Free Quote */}
                  <button
                    onClick={onOpenQuote}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      backgroundColor: 'var(--color-secondary)',
                      color: '#FFFFFF',
                      fontSize: '16px',
                      fontWeight: '700',
                      padding: '16px 36px',
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    {heroData_dyn.primaryBtnText}
                  </button>

                  {/* Secondary CTA: View Our Services */}
                  <a
                    href="#services"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      backgroundColor: '#FFFFFF',
                      color: 'var(--color-primary)',
                      fontSize: '16px',
                      fontWeight: '700',
                      padding: '16px 36px',
                      borderRadius: '9999px',
                      border: '1.5px solid var(--color-primary)',
                      transition: 'all 0.3s ease',
                      textDecoration: 'none',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = '#f8fafc';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = '#FFFFFF';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path><path d="M9 11a5 5 0 1 0 5 5"></path><line x1="12" y1="16" x2="12" y2="22"></line><line x1="12" y1="16" x2="6" y2="16"></line></svg>
                    {heroData_dyn.secondaryBtnText}
                  </a>
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
            bottom: '40px',
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
            justify-content: flex-start !important;
            transform: translateY(0) !important;
          }
          .paintters-hero-authentic {
            min-height: 860px !important;
            min-height: 90vh !important;
          }
          .brush-hero-title {
            font-size: 48px !important;
          }
          .hero-gradient-fade {
            background: linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.95) 45%, rgba(255,255,255,0.8) 75%, transparent 100%) !important;
          }
          .content-card-wrapper {
            max-width: 100% !important;
            padding: 40px 20px 40px 0 !important;
          }
        }
        @media (max-width: 640px) {
          .hero-gradient-fade {
            background: linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.95) 55%, rgba(255,255,255,0) 100%) !important;
          }
          .paintters-hero-authentic {
            min-height: 820px !important;
            min-height: 92vh !important;
          }
          .content-card-wrapper {
            padding: 30px 10px 30px 0 !important;
          }
          .brush-hero-title {
            font-size: 38px !important;
            line-height: 1.16 !important;
            margin-bottom: 12px !important;
          }
          .brush-hero-desc {
            font-size: 16px !important;
            line-height: 1.5 !important;
            margin-bottom: 24px !important;
          }
          .hero-buttons-wrapper {
            gap: 12px !important;
            margin-bottom: 18px !important;
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .hero-buttons-wrapper button,
          .hero-buttons-wrapper a {
            width: 100% !important;
            justify-content: center !important;
            padding: 14px 24px !important;
            font-size: 15px !important;
          }
          .hidden-mobile {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
