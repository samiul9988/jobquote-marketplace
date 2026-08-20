import React, { useState, useEffect } from 'react';
import { useForm , usePage} from '@inertiajs/react';
import {
  Star,
  CheckCircle2,
  MapPin,
  MessageSquare,
  Send,
  ThumbsUp,
  ShieldCheck,
  ArrowRight,
  User,
  Quote
} from 'lucide-react';
import PageBanner from '../components/common/PageBanner';
import SectionHeader from '../components/common/SectionHeader';
import Button from '../components/common/Button';
import ScrollReveal from '../components/common/ScrollReveal';
import ServiceAreaSection from '../components/sections/ServiceAreaSection';
import CtaBannerSection from '../components/sections/CtaBannerSection';
import { reviews, siteInfo, services } from '../data/siteData';

export default function ReviewsPage({ onOpenQuote, reviews = [] }) {
  const { settings = {} } = usePage().props;
  const [activeFilter, setActiveFilter] = useState('all');
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    setReviewList(reviews);
  }, [reviews]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  
  const form = useForm({
    name: '',
    location: '',
    service: 'Painting & Decorating',
    rating: 5,
    comment: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    form.post('/reviews', {
      onSuccess: () => {
        setFormSubmitted(true);
        setTimeout(() => {
          setFormSubmitted(false);
          setShowReviewForm(false);
          form.reset();
        }, 4000);
      }
    });
  };

  const filteredReviews = activeFilter === 'all'
    ? reviewList
    : reviewList.filter(r => {
        const text = (r.service || '').toLowerCase();
        if (activeFilter === 'painting') return text.includes('paint') || text.includes('decor');
        if (activeFilter === 'carpentry') return text.includes('door') || text.includes('carpentry') || text.includes('joinery') || text.includes('shelv');
        if (activeFilter === 'plastering') return text.includes('plaster') || text.includes('skim');
        return true;
      });

  return (
    <div className="reviews-page-wrapper">
      
      {/* 1. Page Hero Banner */}
      <PageBanner
        title="Customer Reviews"
        subtitle="Genuine feedback and testimonials from homeowners, landlords, and businesses across Liverpool."
        backgroundImage="/images/projects/service-painting.jpg"
      />

      {/* 2. Rating Summary & Trust Bar */}
      <section style={{ padding: '70px 0 40px 0', backgroundColor: '#FFFFFF' }}>
        <div className="container-custom">
          
          <ScrollReveal animation="fade-up">
            <div
              style={{
                backgroundColor: 'var(--color-light)',
                borderRadius: 'var(--radius-xl)',
                padding: '40px 48px',
                border: '1px solid var(--color-border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '30px'
              }}
              className="rating-summary-card"
            >
              {/* Left Rating Stars */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <div
                  style={{
                    width: '74px',
                    height: '74px',
                    borderRadius: '20px',
                    backgroundColor: 'var(--color-primary)',
                    color: '#FFFFFF',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'var(--shadow-primary)'
                  }}
                >
                  <span style={{ fontSize: '26px', fontWeight: '900', lineHeight: '1' }}>5.0</span>
                  <span style={{ fontSize: '11px', color: 'var(--color-secondary)', fontWeight: '800' }}>RATING</span>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={20} fill="#F26522" color="#F26522" />
                    ))}
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--color-primary)', marginBottom: '2px' }}>
                    Rated 5 Stars Across Liverpool
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: 0 }}>
                    Verified customer feedback for Painting, Decorating, and Carpentry.
                  </p>
                </div>
              </div>

              {/* Right Action: Leave a Review Button */}
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: '#FFFFFF',
                    padding: '13px 26px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '14px',
                    fontWeight: '700',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
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
                  <MessageSquare size={16} />
                  <span>{showReviewForm ? 'Close Review Form' : 'Leave a Review'}</span>
                </button>

                <Button
                  variant="secondary"
                  onClick={onOpenQuote}
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Get a Free Quote
                </Button>
              </div>

            </div>
          </ScrollReveal>

          {/* 3. Expandable Leave a Review Form */}
          {showReviewForm && (
            <ScrollReveal animation="fade-up" duration={500}>
              <div
                style={{
                  marginTop: '32px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-xl)',
                  padding: '40px',
                  border: '2px solid var(--color-secondary-light)',
                  boxShadow: 'var(--shadow-md)'
                }}
              >
                {formSubmitted ? (
                  <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                    <div
                      style={{
                        width: '54px',
                        height: '54px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-primary-light)',
                        color: 'var(--color-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px auto'
                      }}
                    >
                      <CheckCircle2 size={32} />
                    </div>
                    <h4 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--color-primary)', marginBottom: '6px' }}>
                      Thank You for Your Feedback!
                    </h4>
                    <p style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
                      Your review has been submitted and posted to our feedback wall. We appreciate your trust!
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                      <MessageSquare size={20} style={{ color: 'var(--color-secondary)' }} />
                      <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--color-primary)' }}>
                        Write a Customer Review
                      </h3>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="review-form-grid">
                      <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--color-text-main)', marginBottom: '6px' }}>
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. John Miller"
                          value={form.data.name}
                          onChange={(e) => form.setData('name', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--color-border)',
                            fontSize: '14px',
                            outline: 'none'
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--color-text-main)', marginBottom: '6px' }}>
                          Liverpool Area / Neighborhood *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Crosby, Liverpool"
                          value={form.data.location}
                          onChange={(e) => form.setData('location', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--color-border)',
                            fontSize: '14px',
                            outline: 'none'
                          }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="review-form-grid">
                      <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--color-text-main)', marginBottom: '6px' }}>
                          Service Provided *
                        </label>
                        <select
                          value={form.data.service}
                          onChange={(e) => form.setData('service', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--color-border)',
                            fontSize: '14px',
                            outline: 'none',
                            backgroundColor: '#FFFFFF'
                          }}
                        >
                          <option value="Interior Painting & Decorating">Interior Painting & Decorating</option>
                          <option value="Exterior Painting & Masonry">Exterior Painting & Masonry</option>
                          <option value="Solid Oak Door Fitting">Solid Oak Door Fitting</option>
                          <option value="Bespoke Alcove Shelving">Bespoke Alcove Shelving</option>
                          <option value="Wall Skimming & Plastering">Wall Skimming & Plastering</option>
                          <option value="Full Property Refresh">Full Property Refresh</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--color-text-main)', marginBottom: '6px' }}>
                          Rating *
                        </label>
                        <select
                          value={form.data.rating}
                          onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--color-border)',
                            fontSize: '14px',
                            outline: 'none',
                            backgroundColor: '#FFFFFF'
                          }}
                        >
                          <option value="5">★★★★★ 5 Stars (Excellent)</option>
                          <option value="4">★★★★☆ 4 Stars (Very Good)</option>
                          <option value="3">★★★☆☆ 3 Stars (Good)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--color-text-main)', marginBottom: '6px' }}>
                        Your Review & Feedback *
                      </label>
                      <textarea
                        required
                        rows="4"
                        placeholder="Tell us about the quality of work, punctuality, and cleanliness..."
                        value={form.data.comment}
                        onChange={(e) => form.setData('comment', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--color-border)',
                          fontSize: '14px',
                          outline: 'none',
                          resize: 'vertical'
                        }}
                      />
                    </div>

                    <div>
                      <button
                        type="submit"
                        style={{
                          backgroundColor: 'var(--color-secondary)',
                          color: '#FFFFFF',
                          padding: '12px 30px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '14px',
                          fontWeight: '700',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}
                      >
                        <Send size={15} />
                        <span>Submit Review</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </ScrollReveal>
          )}

          {/* 4. Filter Tabs */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px',
              marginTop: '45px',
              marginBottom: '45px',
              flexWrap: 'wrap'
            }}
          >
            {[
              { id: 'all', label: `All Reviews (${reviewList.length})` },
              { id: 'painting', label: 'Painting & Decorating' },
              { id: 'carpentry', label: 'Carpentry & Joinery' },
              { id: 'plastering', label: 'Plastering & Skimming' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                style={{
                  padding: '9px 20px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '13px',
                  fontWeight: '700',
                  backgroundColor: activeFilter === tab.id ? 'var(--color-primary)' : 'var(--color-light)',
                  color: activeFilter === tab.id ? '#FFFFFF' : 'var(--color-text-main)',
                  border: activeFilter === tab.id ? 'none' : '1px solid var(--color-border)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: activeFilter === tab.id ? 'var(--shadow-primary)' : 'none'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 5. Reviews Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '28px'
            }}
            className="reviews-cards-grid"
          >
            {filteredReviews.map((item, idx) => (
              <ScrollReveal key={item.id} animation="fade-up" delay={idx * 70} duration={600}>
                <div
                  className="paintters-card review-item-card"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 'var(--radius-xl)',
                    padding: '36px 30px',
                    border: '1px solid var(--color-border)',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Decorative Subtle Quote Icon */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '20px',
                      right: '20px',
                      color: 'var(--color-secondary-light)',
                      pointerEvents: 'none'
                    }}
                  >
                    <Quote size={40} />
                  </div>

                  {/* 5 Stars Rating */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginBottom: '16px' }}>
                    {[...Array(item.rating || 5)].map((_, s) => (
                      <Star key={s} size={17} fill="#F26522" color="#F26522" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p
                    style={{
                      fontSize: '14px',
                      color: 'var(--color-text-main)',
                      lineHeight: '1.75',
                      marginBottom: '24px',
                      flexGrow: 1,
                      fontStyle: 'normal'
                    }}
                  >
                    "{item.comment}"
                  </p>

                  {/* Reviewer Details */}
                  <div
                    style={{
                      borderTop: '1px solid var(--color-border)',
                      paddingTop: '18px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px'
                    }}
                  >
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-primary-light)',
                        color: 'var(--color-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        fontWeight: '800',
                        flexShrink: 0
                      }}
                    >
                      {item.name.charAt(0)}
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '15px', fontWeight: '800', color: 'var(--color-primary)' }}>
                          {item.name}
                        </span>
                        <CheckCircle2 size={14} style={{ color: 'var(--color-secondary)' }} />
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '2px', flexWrap: 'wrap' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                          <MapPin size={11} style={{ color: 'var(--color-secondary)' }} />
                          {item.location}
                        </span>
                        <span>•</span>
                        <span style={{ color: 'var(--color-secondary)', fontWeight: '700' }}>
                          {item.service}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Why Our Service Stands Out */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--color-light)' }}>
        <div className="container-custom">
          <ScrollReveal animation="fade-up">
            <SectionHeader
              badge="Client Experience"
              title="What You Can Expect From Us"
              description="Consistent, reliable home improvement services built on honest advice and master craftsmanship."
              align="center"
            />
          </ScrollReveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '24px',
              marginTop: '50px'
            }}
          >
            {[
              {
                title: "Tidy & Clean Workspace",
                desc: "Floors and furniture fully protected with daily dust and debris cleanup."
              },
              {
                title: "Punctual Delivery",
                desc: "We arrive on schedule, keep you informed, and finish on agreed timeframes."
              },
              {
                title: "Honest Upfront Quotes",
                desc: "Itemized, transparent pricing with zero surprise add-ons or hidden fees."
              },
              {
                title: "Dedicated Craftsmanship",
                desc: "Trade-grade materials and careful execution across painting and carpentry."
              }
            ].map((p, idx) => (
              <ScrollReveal key={idx} animation="fade-up" delay={idx * 90}>
                <div
                  className="paintters-card"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 'var(--radius-lg)',
                    padding: '30px 24px',
                    border: '1px solid var(--color-border)',
                    height: '100%'
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '12px',
                      backgroundColor: 'var(--color-primary-light)',
                      color: 'var(--color-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '14px'
                    }}
                  >
                    <ThumbsUp size={18} />
                  </div>
                  <h4 style={{ fontSize: '17px', fontWeight: '800', color: 'var(--color-primary)', marginBottom: '6px' }}>
                    {p.title}
                  </h4>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                    {p.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Service Area Section */}
      <ServiceAreaSection onOpenQuote={onOpenQuote} />

      {/* 8. Final Conversion CTA Banner */}
      <CtaBannerSection onOpenQuote={onOpenQuote} />

      <style>{`
        .review-item-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
          border-color: var(--color-secondary);
        }
        @media (max-width: 768px) {
          .rating-summary-card {
            padding: 30px 20px !important;
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .review-form-grid {
            grid-template-columns: 1fr !important;
          }
          .reviews-cards-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
