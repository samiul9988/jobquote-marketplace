import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from '@inertiajs/react';
import { ArrowRight, ChevronLeft, ChevronRight, Eye, Sparkles } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import ScrollReveal from '../common/ScrollReveal';
import { portfolioItems } from '../../data/siteData';

export default function PortfolioSection({ onOpenLightbox }) {
  const [activeTab, setActiveTab] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const categories = [
    { id: 'all', label: 'All Works' },
    { id: 'painting', label: 'Painting & Decorating' },
    { id: 'carpentry', label: 'Carpentry & Joinery' }
  ];

  // Filter items based on active category
  const filteredItems = activeTab === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.categoryKey === activeTab);

  const totalItems = filteredItems.length;

  // Reset index when category tab changes
  const handleTabChange = (catId) => {
    setActiveTab(catId);
    setCurrentIndex(0);
  };

  const nextSlide = useCallback(() => {
    if (totalItems === 0) return;
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  }, [totalItems]);

  const prevSlide = useCallback(() => {
    if (totalItems === 0) return;
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  }, [totalItems]);

  // Autoplay functionality
  useEffect(() => {
    if (isHovered || totalItems <= 1) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(interval);
  }, [isHovered, nextSlide, totalItems]);

  // Touch swipe support for mobile
  const minSwipeDistance = 45;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Helper to compute card 3D position relative to currentIndex
  const getCardStyle = (index) => {
    if (totalItems === 0) return { display: 'none' };

    let diff = index - currentIndex;

    // Handle circular wrap-around difference
    if (diff > totalItems / 2) diff -= totalItems;
    if (diff < -totalItems / 2) diff += totalItems;

    if (diff === 0) {
      // CENTER ACTIVE CARD (Matching uploaded 3D reference)
      return {
        transform: 'translateX(-50%) translateY(0px) scale(1.08)',
        zIndex: 10,
        opacity: 1,
        filter: 'drop-shadow(0 25px 45px rgba(36, 45, 138, 0.25))',
        pointerEvents: 'auto',
        visibility: 'visible',
        left: '50%'
      };
    } else if (diff === -1) {
      // LEFT PEEKING CARD
      return {
        transform: 'translateX(-125%) translateY(12px) scale(0.88)',
        zIndex: 5,
        opacity: 0.85,
        filter: 'drop-shadow(0 15px 30px rgba(0, 0, 0, 0.15)) brightness(0.92)',
        cursor: 'pointer',
        pointerEvents: 'auto',
        visibility: 'visible',
        left: '50%'
      };
    } else if (diff === 1) {
      // RIGHT PEEKING CARD
      return {
        transform: 'translateX(25%) translateY(12px) scale(0.88)',
        zIndex: 5,
        opacity: 0.85,
        filter: 'drop-shadow(0 15px 30px rgba(0, 0, 0, 0.15)) brightness(0.92)',
        cursor: 'pointer',
        pointerEvents: 'auto',
        visibility: 'visible',
        left: '50%'
      };
    } else if (diff === -2) {
      // FAR LEFT CARD (fading)
      return {
        transform: 'translateX(-190%) translateY(20px) scale(0.75)',
        zIndex: 2,
        opacity: 0,
        pointerEvents: 'none',
        visibility: 'hidden',
        left: '50%'
      };
    } else if (diff === 2) {
      // FAR RIGHT CARD (fading)
      return {
        transform: 'translateX(90%) translateY(20px) scale(0.75)',
        zIndex: 2,
        opacity: 0,
        pointerEvents: 'none',
        visibility: 'hidden',
        left: '50%'
      };
    } else {
      // HIDDEN OFFSTAGE CARDS
      return {
        transform: 'translateX(-50%) scale(0.6)',
        zIndex: 1,
        opacity: 0,
        pointerEvents: 'none',
        visibility: 'hidden',
        left: '50%'
      };
    }
  };

  const activeItem = filteredItems[currentIndex] || filteredItems[0];

  return (
    <section
      id="gallery"
      style={{
        padding: '100px 0 90px',
        backgroundColor: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="container-custom">
        
        {/* Section Header */}
        <ScrollReveal animation="fade-up">
          <SectionHeader
            badge="Recent Project Showcase"
            title="Completed Work & Craftsmanship"
            description="Explore a selection of our recent painting, decorating, and carpentry projects completed for satisfied property owners."
            align="center"
          />
        </ScrollReveal>

        {/* Category Filter Tabs */}
        <ScrollReveal animation="fade-up" delay={100}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '12px',
              marginTop: '36px',
              marginBottom: '42px',
              flexWrap: 'wrap'
            }}
            className="gallery-filter-tabs"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleTabChange(cat.id)}
                style={{
                  padding: '10px 26px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '14px',
                  fontWeight: '700',
                  backgroundColor: activeTab === cat.id ? 'var(--color-primary)' : 'var(--color-light)',
                  color: activeTab === cat.id ? '#FFFFFF' : 'var(--color-text-main)',
                  border: activeTab === cat.id ? 'none' : '1px solid var(--color-border)',
                  cursor: 'pointer',
                  boxShadow: activeTab === cat.id ? '0 6px 18px rgba(36, 45, 138, 0.25)' : 'none',
                  transition: 'all 0.25s ease'
                }}
                onMouseOver={(e) => {
                  if (activeTab !== cat.id) {
                    e.currentTarget.style.backgroundColor = 'var(--color-primary-light)';
                    e.currentTarget.style.color = 'var(--color-primary)';
                  }
                }}
                onMouseOut={(e) => {
                  if (activeTab !== cat.id) {
                    e.currentTarget.style.backgroundColor = 'var(--color-light)';
                    e.currentTarget.style.color = 'var(--color-text-main)';
                  }
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* 3D Centered Carousel Slider (Matching Uploaded Image) */}
        <div
          className="coverflow-carousel-wrapper"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '20px 0 10px'
          }}
        >
          {/* Main Slider Stage */}
          <div
            className="coverflow-slider-stage"
            style={{
              position: 'relative',
              width: '100%',
              height: '470px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              perspective: '1200px'
            }}
          >
            {filteredItems.map((item, index) => {
              const cardStyle = getCardStyle(index);
              const isCenter = index === currentIndex;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (isCenter) {
                      onOpenLightbox(item);
                    } else {
                      setCurrentIndex(index);
                    }
                  }}
                  className={`coverflow-card ${isCenter ? 'active-center-card' : 'side-card'}`}
                  style={{
                    position: 'absolute',
                    top: '20px',
                    width: '460px',
                    maxWidth: '85vw',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '24px',
                    border: '7px solid #FFFFFF',
                    boxShadow: isCenter
                      ? '0 20px 45px rgba(36, 45, 138, 0.22)'
                      : '0 12px 28px rgba(0, 0, 0, 0.12)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.55s cubic-bezier(0.25, 1, 0.5, 1)',
                    ...cardStyle
                  }}
                >
                  {/* Image Container with White Border Styling */}
                  <div
                    style={{
                      height: '270px',
                      position: 'relative',
                      overflow: 'hidden',
                      borderRadius: '16px 16px 0 0',
                      backgroundColor: '#F1F5F9'
                    }}
                    className="card-img-box"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease'
                      }}
                      className="slider-project-img"
                    />

                    {/* Category Tag Pill */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '14px',
                        left: '14px',
                        backgroundColor: 'rgba(36, 45, 138, 0.88)',
                        backdropFilter: 'blur(8px)',
                        color: '#FFFFFF',
                        padding: '5px 14px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '11px',
                        fontWeight: '800',
                        letterSpacing: '0.3px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                      }}
                    >
                      {item.category}
                    </div>

                    {/* Center Hover / Quick Action Badge */}
                    <div
                      className="card-quick-overlay"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'rgba(36, 45, 138, 0.55)',
                        backdropFilter: 'blur(3px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0,
                        transition: 'opacity 0.3s ease'
                      }}
                    >
                      <div
                        style={{
                          width: '52px',
                          height: '52px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--color-secondary)',
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 8px 24px rgba(242, 101, 34, 0.45)',
                          transform: 'scale(0.9)',
                          transition: 'transform 0.2s ease'
                        }}
                      >
                        <Eye size={24} />
                      </div>
                    </div>
                  </div>

                  {/* Card Description Content */}
                  <div style={{ padding: '20px 22px 22px', backgroundColor: '#FFFFFF' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <h4
                        style={{
                          fontSize: '17px',
                          fontWeight: '800',
                          color: 'var(--color-primary)',
                          fontFamily: 'var(--font-heading)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {item.title}
                      </h4>
                    </div>

                    <p
                      style={{
                        fontSize: '13px',
                        color: 'var(--color-text-muted)',
                        lineHeight: '1.55',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        marginBottom: '12px'
                      }}
                    >
                      {item.description}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-secondary)' }}>
                        📍 {item.location}
                      </span>
                      <span
                        style={{
                          fontSize: '12px',
                          fontWeight: '700',
                          color: 'var(--color-primary)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        Preview <ArrowRight size={13} />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Left / Right Arrow Navigation Buttons */}
          <button
            onClick={prevSlide}
            aria-label="Previous Project"
            style={{
              position: 'absolute',
              top: '50%',
              left: '10px',
              transform: 'translateY(-50%)',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              color: 'var(--color-primary)',
              boxShadow: '0 8px 24px rgba(36, 45, 138, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer',
              zIndex: 30,
              transition: 'all 0.3s ease'
            }}
            className="slider-arrow-btn prev-btn"
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-secondary)';
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.color = 'var(--color-primary)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
            }}
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next Project"
            style={{
              position: 'absolute',
              top: '50%',
              right: '10px',
              transform: 'translateY(-50%)',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              color: 'var(--color-primary)',
              boxShadow: '0 8px 24px rgba(36, 45, 138, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer',
              zIndex: 30,
              transition: 'all 0.3s ease'
            }}
            className="slider-arrow-btn next-btn"
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-secondary)';
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.color = 'var(--color-primary)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
            }}
          >
            <ChevronRight size={24} />
          </button>

          {/* 3 Animated Looping Dots Indicator */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px',
              marginTop: '32px'
            }}
            className="slider-pagination-dots"
          >
            {[0, 1, 2].map((dotIdx) => {
              const activeDotIndex = totalItems > 0 ? currentIndex % 3 : 0;
              const isActive = activeDotIndex === dotIdx;

              return (
                <button
                  key={dotIdx}
                  onClick={() => {
                    const groupBase = Math.floor(currentIndex / 3) * 3;
                    const nextIdx = (groupBase + dotIdx) % totalItems;
                    setCurrentIndex(nextIdx);
                  }}
                  aria-label={`Slide index ${dotIdx + 1}`}
                  style={{
                    position: 'relative',
                    width: isActive ? '34px' : '9px',
                    height: '9px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: isActive ? 'var(--color-secondary)' : '#CBD5E1',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    overflow: 'hidden',
                    boxShadow: isActive ? '0 2px 10px rgba(242, 101, 34, 0.45)' : 'none',
                    transition: 'all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}
                  onMouseOver={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                  }}
                  onMouseOut={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = '#CBD5E1';
                  }}
                >
                  {/* Smooth active progress glow animation */}
                  {isActive && (
                    <span
                      key={currentIndex}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        width: '100%',
                        background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.5) 50%, transparent 100%)',
                        animation: 'dotProgressGlow 2s ease-in-out infinite'
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* View Full Gallery CTA Button */}
        <ScrollReveal animation="fade-up" delay={200}>
          <div style={{ marginTop: '45px', textAlign: 'center' }}>
            <Link
              href="/gallery"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '13px 34px',
                borderRadius: 'var(--radius-full)',
                border: '1.5px solid var(--color-primary)',
                color: 'var(--color-primary)',
                fontSize: '14px',
                fontWeight: '700',
                textDecoration: 'none',
                transition: 'all 0.25s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 22px rgba(36, 45, 138, 0.25)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--color-primary)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span>Explore Full Gallery ({portfolioItems.length}+ Projects)</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </ScrollReveal>

      </div>

      <style>{`
        @keyframes dotProgressGlow {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .coverflow-card:hover .slider-project-img {
          transform: scale(1.05);
        }
        .active-center-card:hover .card-quick-overlay {
          opacity: 1 !important;
        }
        .active-center-card:hover .card-quick-overlay div {
          transform: scale(1) !important;
        }
        
        @media (max-width: 991px) {
          .coverflow-slider-stage {
            height: 440px !important;
          }
          .coverflow-card {
            width: 400px !important;
          }
          .card-img-box {
            height: 230px !important;
          }
        }

        @media (max-width: 768px) {
          .coverflow-slider-stage {
            height: 410px !important;
          }
          .coverflow-card {
            width: 320px !important;
            border-width: 5px !important;
          }
          .card-img-box {
            height: 190px !important;
          }
          .slider-arrow-btn {
            width: 40px !important;
            height: 40px !important;
          }
          .slider-arrow-btn.prev-btn {
            left: 2px !important;
          }
          .slider-arrow-btn.next-btn {
            right: 2px !important;
          }
        }

        @media (max-width: 480px) {
          .coverflow-slider-stage {
            height: 380px !important;
          }
          .coverflow-card {
            width: 290px !important;
            border-width: 5px !important;
          }
          .card-img-box {
            height: 170px !important;
          }
        }
      `}</style>
    </section>
  );
}


