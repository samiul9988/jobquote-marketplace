import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from '@inertiajs/react';
import { Star, CheckCircle2, MapPin, Quote, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import Button from '../common/Button';
import ScrollReveal from '../common/ScrollReveal';
import { reviews } from '../../data/siteData';

export default function TestimonialsSection({ onOpenQuote }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [cardsPerView, setCardsPerView] = useState(3);

  const totalReviews = reviews.length;

  // Responsive cards per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, totalReviews - cardsPerView);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Continuous Autoplay loop
  useEffect(() => {
    if (isHovered || totalReviews <= 1) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered, nextSlide, totalReviews]);

  // Touch swipe support for mobile
  const minSwipeDistance = 40;

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

  // Calculate percentage shift per slide
  const getTransform = () => {
    if (cardsPerView === 1) {
      return `translateX(calc(-${currentIndex * 100}% - ${currentIndex * 20}px))`;
    } else if (cardsPerView === 2) {
      return `translateX(calc(-${currentIndex * 50}% - ${currentIndex * 12}px))`;
    } else {
      return `translateX(calc(-${currentIndex * 33.333}% - ${currentIndex * 16}px))`;
    }
  };

  return (
    <section
      id="reviews"
      style={{
        padding: '100px 0 90px',
        backgroundColor: 'var(--color-light)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="container-custom">
        
        {/* Section Header */}
        <ScrollReveal animation="fade-up">
          <SectionHeader
            badge="Customer Feedback"
            title="What Our Clients Say About Us"
            description="Genuine reviews from homeowners and landlords who trust SK Home Solutions across Liverpool."
            align="center"
          />
        </ScrollReveal>

        {/* Standard Horizontal Loop Carousel */}
        <div
          className="normal-reviews-carousel-wrapper"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1240px',
            margin: '40px auto 10px',
            padding: '0 10px'
          }}
        >
          {/* Outer Viewport */}
          <div
            style={{
              overflow: 'hidden',
              width: '100%',
              padding: '12px 2px 24px'
            }}
          >
            {/* Sliding Flex Track */}
            <div
              style={{
                display: 'flex',
                gap: cardsPerView === 1 ? '20px' : '24px',
                transform: getTransform(),
                transition: 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
                willChange: 'transform'
              }}
            >
              {reviews.map((item) => (
                <div
                  key={item.id}
                  className="review-horizontal-card"
                  style={{
                    flex: cardsPerView === 1
                      ? '0 0 100%'
                      : cardsPerView === 2
                      ? '0 0 calc((100% - 24px) / 2)'
                      : '0 0 calc((100% - 48px) / 3)',
                    minWidth: 0,
                    backgroundColor: '#FFFFFF',
                    borderRadius: '24px',
                    padding: '32px 28px',
                    border: '1px solid var(--color-border)',
                    boxShadow: '0 8px 24px rgba(36, 45, 138, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '330px',
                    position: 'relative',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 16px 36px rgba(36, 45, 138, 0.14)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(36, 45, 138, 0.08)';
                  }}
                >
                  {/* Decorative Quote Mark */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '20px',
                      right: '24px',
                      color: 'var(--color-secondary-light)',
                      pointerEvents: 'none'
                    }}
                  >
                    <Quote size={36} />
                  </div>

                  {/* Top: 5 Stars + Verified Badge */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                        {[...Array(item.rating || 5)].map((_, s) => (
                          <Star key={s} size={16} fill="#F26522" color="#F26522" />
                        ))}
                      </div>

                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: '800',
                          color: 'var(--color-primary)',
                          backgroundColor: 'var(--color-primary-light)',
                          padding: '3px 10px',
                          borderRadius: 'var(--radius-full)'
                        }}
                      >
                        Verified
                      </span>
                    </div>

                    {/* Service Title */}
                    {item.service && (
                      <div
                        style={{
                          fontSize: '12px',
                          fontWeight: '800',
                          color: 'var(--color-secondary)',
                          marginBottom: '8px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.4px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {item.service}
                      </div>
                    )}

                    {/* Review Comment Text */}
                    <p
                      style={{
                        fontSize: '14px',
                        color: 'var(--color-text-main)',
                        lineHeight: '1.68',
                        marginBottom: '20px',
                        display: '-webkit-box',
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      "{item.comment}"
                    </p>
                  </div>

                  {/* Author Bottom Bar */}
                  <div
                    style={{
                      borderTop: '1px solid var(--color-border)',
                      paddingTop: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}
                  >
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-primary)',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        fontWeight: '900',
                        flexShrink: 0
                      }}
                    >
                      {item.name.charAt(0)}
                    </div>

                    <div style={{ overflow: 'hidden' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span
                          style={{
                            fontSize: '14px',
                            fontWeight: '800',
                            color: 'var(--color-primary)',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {item.name}
                        </span>
                        <CheckCircle2 size={14} style={{ color: 'var(--color-secondary)', flexShrink: 0 }} />
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                        <MapPin size={12} style={{ color: 'var(--color-secondary)', flexShrink: 0 }} />
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.location}</span>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Left & Right Arrow Buttons */}
          <button
            onClick={prevSlide}
            aria-label="Previous Review"
            style={{
              position: 'absolute',
              top: '46%',
              left: '-16px',
              transform: 'translateY(-50%)',
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              color: 'var(--color-primary)',
              boxShadow: '0 6px 20px rgba(36, 45, 138, 0.16)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer',
              zIndex: 10,
              transition: 'all 0.25s ease'
            }}
            className="carousel-nav-btn prev-btn"
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
            <ChevronLeft size={22} />
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next Review"
            style={{
              position: 'absolute',
              top: '46%',
              right: '-16px',
              transform: 'translateY(-50%)',
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              color: 'var(--color-primary)',
              boxShadow: '0 6px 20px rgba(36, 45, 138, 0.16)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer',
              zIndex: 10,
              transition: 'all 0.25s ease'
            }}
            className="carousel-nav-btn next-btn"
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
            <ChevronRight size={22} />
          </button>

          {/* 3 Animated Looping Pagination Dots */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px',
              marginTop: '20px'
            }}
            className="slider-pagination-dots"
          >
            {[0, 1, 2].map((dotIdx) => {
              const activeDotIndex = currentIndex % 3;
              const isActive = activeDotIndex === dotIdx;

              return (
                <button
                  key={dotIdx}
                  onClick={() => {
                    const step = Math.floor(maxIndex / 2);
                    setCurrentIndex(Math.min(dotIdx * step, maxIndex));
                  }}
                  aria-label={`Go to slide group ${dotIdx + 1}`}
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

        {/* View All Reviews & Quote Actions */}
        <ScrollReveal animation="fade-up" delay={200}>
          <div
            style={{
              marginTop: '45px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '16px',
              flexWrap: 'wrap'
            }}
          >
            <Link
              href="/reviews"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '13px 30px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-primary)',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: '700',
                textDecoration: 'none',
                boxShadow: 'var(--shadow-primary)',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>Read All {reviews.length}+ Customer Reviews</span>
              <ArrowRight size={15} />
            </Link>

            <Button
              variant="secondary"
              onClick={onOpenQuote}
            >
              Get a Free Quote
            </Button>
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

        @media (max-width: 768px) {
          .carousel-nav-btn {
            width: 38px !important;
            height: 38px !important;
          }
          .carousel-nav-btn.prev-btn {
            left: -8px !important;
          }
          .carousel-nav-btn.next-btn {
            right: -8px !important;
          }
        }
      `}</style>
    </section>
  );
}


