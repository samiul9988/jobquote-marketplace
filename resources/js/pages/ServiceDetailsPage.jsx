import React, { useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
  ChevronLeft, 
  CheckCircle2, 
  Phone, 
  MessageCircle, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  Star, 
  HardHat, 
  FileText 
} from 'lucide-react';
import Button from '../components/common/Button';
import CtaBannerSection from '../components/sections/CtaBannerSection';
import ScrollReveal from '../components/common/ScrollReveal';
import { siteInfo } from '../data/siteData';

export default function ServiceDetailsPage({ service = {}, onOpenQuote }) {
  const { settings = {} } = usePage().props;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (service?.title) {
      document.title = `${service.title} | Professional Service Liverpool | SK Home Solutions`;
    }
  }, [service?.service_id, service?.title]);

  if (!service || !service.title) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '40px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--color-primary)', marginBottom: '16px' }}>Service Not Found</h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '24px' }}>The requested service could not be loaded.</p>
        <Button href="/services" inertiaLink={true} icon={ChevronLeft} iconPosition="left">
          Back to Services
        </Button>
      </div>
    );
  }

  // Parse features and benefits safely
  const features = Array.isArray(service.features) 
    ? service.features 
    : (typeof service.features === 'string' ? (() => { try { return JSON.parse(service.features); } catch(e) { return []; } })() : []);

  const benefits = Array.isArray(service.benefits) 
    ? service.benefits 
    : (typeof service.benefits === 'string' ? (() => { try { return JSON.parse(service.benefits); } catch(e) { return []; } })() : []);

  const phoneNum = settings.phone || siteInfo.phone;
  const whatsappNum = settings.whatsapp ? settings.whatsapp.replace(/[^0-9]/g, '') : '447912345678';
  const whatsappUrl = `https://wa.me/${whatsappNum}?text=Hello%20SK%20Home%20Solutions,%20I%20am%20interested%20in%20your%20${encodeURIComponent(service.title)}%20service.`;

  return (
    <div className="service-details-page-wrapper">
      <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', paddingBottom: '40px' }}>
        
        {/* HERO SECTION */}
        <section style={{
          position: 'relative',
          padding: '120px 0 90px 0',
          backgroundColor: 'var(--color-primary)',
          color: '#FFFFFF',
          overflow: 'hidden'
        }}>
          {/* Background image with high-end overlay */}
          {service.image && (
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${service.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.22,
              filter: 'blur(2px)',
              transform: 'scale(1.05)'
            }} />
          )}

          {/* Gradient Overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.82) 100%)'
          }} />

          {/* Decorative Glow */}
          <div style={{
            position: 'absolute',
            top: '-100px',
            right: '-50px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            backgroundColor: 'rgba(242, 101, 34, 0.12)',
            filter: 'blur(80px)',
            pointerEvents: 'none'
          }} />

          <div className="container-custom" style={{ position: 'relative', zIndex: 3 }}>
            
            {/* Breadcrumb Navigation */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
              <Link 
                href="/" 
                style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '13px', fontWeight: '600', transition: 'color 0.2s' }}
                onMouseOver={e => e.currentTarget.style.color = '#FFFFFF'}
                onMouseOut={e => e.currentTarget.style.color = '#94A3B8'}
              >
                Home
              </Link>
              <span style={{ color: '#64748B', fontSize: '12px' }}>/</span>
              <Link 
                href="/services" 
                style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '13px', fontWeight: '600', transition: 'color 0.2s' }}
                onMouseOver={e => e.currentTarget.style.color = '#FFFFFF'}
                onMouseOut={e => e.currentTarget.style.color = '#94A3B8'}
              >
                Services
              </Link>
              <span style={{ color: '#64748B', fontSize: '12px' }}>/</span>
              <span style={{ color: 'var(--color-secondary)', fontSize: '13px', fontWeight: '700' }}>
                {service.title}
              </span>
            </div>

            <div style={{ maxWidth: '800px' }}>
              {service.badge && (
                <div style={{ marginBottom: '16px' }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 16px',
                    backgroundColor: 'rgba(242, 101, 34, 0.18)',
                    border: '1px solid rgba(242, 101, 34, 0.4)',
                    borderRadius: '9999px',
                    fontSize: '13px',
                    fontWeight: '800',
                    color: 'var(--color-secondary)',
                    letterSpacing: '0.8px',
                    textTransform: 'uppercase'
                  }}>
                    <Sparkles size={14} />
                    {service.badge}
                  </span>
                </div>
              )}

              <h1 style={{
                fontSize: '44px',
                fontWeight: '900',
                lineHeight: '1.2',
                color: '#FFFFFF',
                marginBottom: '16px',
                fontFamily: 'var(--font-heading)'
              }}>
                {service.title}
              </h1>

              {service.tagline && (
                <p style={{
                  fontSize: '20px',
                  color: '#CBD5E1',
                  lineHeight: '1.6',
                  fontWeight: '500',
                  marginBottom: '28px'
                }}>
                  {service.tagline}
                </p>
              )}

              {/* Quick Trust Badges */}
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', paddingTop: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#E2E8F0', fontSize: '14px', fontWeight: '600' }}>
                  <ShieldCheck size={18} color="var(--color-secondary)" />
                  <span>Licensed & Insured</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#E2E8F0', fontSize: '14px', fontWeight: '600' }}>
                  <Clock size={18} color="var(--color-secondary)" />
                  <span>Free Prompt Quotes</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#E2E8F0', fontSize: '14px', fontWeight: '600' }}>
                  <Star size={18} color="#FBBF24" />
                  <span>Top Rated in Liverpool</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* MAIN BODY CONTENT & SIDEBAR */}
        <section style={{ padding: '70px 0' }}>
          <div className="container-custom">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.8fr) minmax(320px, 1fr)',
              gap: '48px',
              alignItems: 'start'
            }} className="service-details-grid">
              
              {/* LEFT COLUMN: MAIN CONTENT */}
              <div>
                
                {/* Main Feature Image */}
                {service.image && (
                  <ScrollReveal animation="fade-up">
                    <div style={{
                      borderRadius: '20px',
                      overflow: 'hidden',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
                      marginBottom: '40px',
                      height: '420px',
                      position: 'relative'
                    }}>
                      <img 
                        src={service.image} 
                        alt={service.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  </ScrollReveal>
                )}

                {/* Service Overview */}
                <ScrollReveal animation="fade-up">
                  <div style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '20px',
                    padding: '40px',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)',
                    marginBottom: '36px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        backgroundColor: 'rgba(242, 101, 34, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-secondary)'
                      }}>
                        <FileText size={22} />
                      </div>
                      <h2 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--color-primary)', margin: 0 }}>
                        Service Overview
                      </h2>
                    </div>

                    <p style={{
                      fontSize: '16px',
                      color: '#475569',
                      lineHeight: '1.8',
                      marginBottom: '20px'
                    }}>
                      {service.description || "We provide high-standard, professional property improvement services tailored to your needs. Our dedicated trade specialists ensure precision, cleanliness, and long-lasting quality across Liverpool and surrounding UK areas."}
                    </p>

                    <p style={{
                      fontSize: '15px',
                      color: '#64748B',
                      lineHeight: '1.7',
                      margin: 0
                    }}>
                      Whether you are modernizing your family home, preparing a rental property for tenancy, or executing commercial upgrades, our team guarantees transparent quotes, punctual scheduling, and flawless final results.
                    </p>
                  </div>
                </ScrollReveal>

                {/* Key What We Do / Features Grid */}
                {features.length > 0 && (
                  <ScrollReveal animation="fade-up">
                    <div style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '20px',
                      padding: '40px',
                      border: '1px solid #E2E8F0',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)',
                      marginBottom: '36px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '10px',
                          backgroundColor: 'rgba(15, 23, 42, 0.08)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--color-primary)'
                        }}>
                          <HardHat size={22} />
                        </div>
                        <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--color-primary)', margin: 0 }}>
                          What We Deliver in This Service
                        </h2>
                      </div>

                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                        gap: '16px'
                      }}>
                        {features.map((feat, idx) => (
                          <div key={idx} style={{
                            padding: '18px 20px',
                            backgroundColor: '#F8FAFC',
                            borderRadius: '14px',
                            border: '1px solid #E2E8F0',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '14px',
                            transition: 'all 0.2s ease'
                          }}>
                            <div style={{
                              color: 'var(--color-secondary)',
                              marginTop: '2px',
                              flexShrink: 0
                            }}>
                              <CheckCircle2 size={18} />
                            </div>
                            <span style={{ fontSize: '14px', fontWeight: '700', color: '#1E293B', lineHeight: '1.5' }}>
                              {feat}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>
                )}

                {/* Key Benefits */}
                {benefits.length > 0 && (
                  <ScrollReveal animation="fade-up">
                    <div style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '20px',
                      padding: '40px',
                      border: '1px solid #E2E8F0',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '10px',
                          backgroundColor: 'rgba(34, 197, 94, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#16A34A'
                        }}>
                          <ShieldCheck size={22} />
                        </div>
                        <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--color-primary)', margin: 0 }}>
                          Why Choose SK Home Solutions
                        </h2>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        {benefits.map((b, idx) => (
                          <div key={idx} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '14px',
                            padding: '16px 20px',
                            backgroundColor: '#F8FAFC',
                            borderRadius: '12px',
                            border: '1px solid #E2E8F0'
                          }}>
                            <div style={{ color: '#16A34A', flexShrink: 0 }}>
                              <CheckCircle2 size={18} />
                            </div>
                            <span style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>
                              {b}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>
                )}

              </div>

              {/* RIGHT COLUMN: STICKY BOOKING / CTA CARD */}
              <div style={{ position: 'sticky', top: '100px' }}>
                <ScrollReveal animation="fade-left">
                  
                  {/* Quote & Contact Card */}
                  <div style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '24px',
                    padding: '36px',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.06), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
                    marginBottom: '28px'
                  }}>
                    <div style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      backgroundColor: 'rgba(242, 101, 34, 0.1)',
                      color: 'var(--color-secondary)',
                      borderRadius: '9999px',
                      fontSize: '12px',
                      fontWeight: '800',
                      marginBottom: '14px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Free Consultation
                    </div>

                    <h3 style={{
                      fontSize: '22px',
                      fontWeight: '800',
                      color: 'var(--color-primary)',
                      marginBottom: '10px',
                      fontFamily: 'var(--font-heading)'
                    }}>
                      Get a Free Quote
                    </h3>

                    <p style={{
                      fontSize: '14px',
                      color: '#64748B',
                      lineHeight: '1.6',
                      marginBottom: '24px'
                    }}>
                      Tell us about your project specifications for <strong style={{ color: 'var(--color-primary)' }}>{service.title}</strong> and receive a transparent, no-obligation estimate.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
                      <Button 
                        variant="secondary" 
                        fullWidth 
                        icon={ArrowRight}
                        iconPosition="right"
                        onClick={() => onOpenQuote ? onOpenQuote({ title: service.title }) : null}
                      >
                        Request Quote Now
                      </Button>

                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          padding: '14px 20px',
                          backgroundColor: '#25D366',
                          color: '#FFFFFF',
                          borderRadius: '9999px',
                          fontSize: '14px',
                          fontWeight: '700',
                          textDecoration: 'none',
                          boxShadow: '0 4px 12px rgba(37, 211, 102, 0.25)',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <MessageCircle size={18} />
                        <span>Chat on WhatsApp</span>
                      </a>

                      <a
                        href={`tel:${phoneNum.replace(/\s+/g, '')}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          padding: '14px 20px',
                          backgroundColor: '#F1F5F9',
                          color: 'var(--color-primary)',
                          borderRadius: '9999px',
                          fontSize: '14px',
                          fontWeight: '700',
                          textDecoration: 'none',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <Phone size={16} />
                        <span>Call {phoneNum}</span>
                      </a>
                    </div>

                    {/* Quality Badges */}
                    <div style={{
                      paddingTop: '20px',
                      borderTop: '1px solid #F1F5F9',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#475569', fontWeight: '600' }}>
                        <CheckCircle2 size={16} color="var(--color-secondary)" />
                        <span>Fixed upfront pricing with zero surprises</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#475569', fontWeight: '600' }}>
                        <CheckCircle2 size={16} color="var(--color-secondary)" />
                        <span>Clean, tidy work area guarantee</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#475569', fontWeight: '600' }}>
                        <CheckCircle2 size={16} color="var(--color-secondary)" />
                        <span>All work quality inspected before handover</span>
                      </div>
                    </div>

                  </div>

                  {/* Back to All Services Link */}
                  <Link
                    href="/services"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      color: '#64748B',
                      fontSize: '14px',
                      fontWeight: '700',
                      textDecoration: 'none',
                      padding: '12px',
                      borderRadius: '12px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={e => {
                      e.currentTarget.style.color = 'var(--color-primary)';
                      e.currentTarget.style.borderColor = '#CBD5E1';
                    }}
                    onMouseOut={e => {
                      e.currentTarget.style.color = '#64748B';
                      e.currentTarget.style.borderColor = '#E2E8F0';
                    }}
                  >
                    <ChevronLeft size={16} />
                    <span>View All Services</span>
                  </Link>

                </ScrollReveal>
              </div>

            </div>
          </div>
        </section>

      </div>

      <CtaBannerSection onOpenQuote={onOpenQuote} />

      <style>{`
        @media (max-width: 900px) {
          .service-details-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
