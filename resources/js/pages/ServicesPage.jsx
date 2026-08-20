import { usePage } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import {
  Paintbrush,
  Hammer,
  Layers,
  Sparkles,
  Ruler,
  Wrench,
  CheckCircle2,
  ArrowRight,
  Phone,
  MessageCircle,
  ShieldCheck,
  Clock,
  Sparkle
} from 'lucide-react';
import PageBanner from '../components/common/PageBanner';
import SectionHeader from '../components/common/SectionHeader';
import Button from '../components/common/Button';
import ScrollReveal from '../components/common/ScrollReveal';
import ServiceAreaSection from '../components/sections/ServiceAreaSection';
import CtaBannerSection from '../components/sections/CtaBannerSection';
import { siteInfo, services } from '../data/siteData';

const iconMap = {
  Paintbrush,
  Hammer,
  Layers,
  Sparkles,
  Ruler,
  Wrench,
  Sparkle
};

export default function ServicesPage({ onOpenQuote }) {
  const { settings = {}, services = [] } = usePage().props;
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    { id: 'all', label: `All Services (${services.length})` },
    { id: 'painting', label: 'Painting & Decorating' },
    { id: 'carpentry', label: 'Carpentry & Joinery' },
    { id: 'plastering', label: 'Plastering & Prep' },
    { id: 'refresh', label: 'Property Refurbishment' }
  ];

  const filteredServices = activeCategory === 'all'
    ? services
    : services.filter(s => s.category === activeCategory);

  return (
    <div className="services-page-wrapper">
      
      {/* 1. Page Hero Banner */}
      <PageBanner
        title="Our Services"
        subtitle="Specialist Home Improvement, Painting, Decorating & Carpentry across Liverpool."
        backgroundImage="/images/projects/service-carpentry.jpg"
      />

      {/* 2. Services Card Grid Section */}
      <section style={{ padding: '90px 0', backgroundColor: '#FFFFFF' }}>
        <div className="container-custom">
          
          <ScrollReveal animation="fade-up">
            <SectionHeader
              badge="Comprehensive Trade Solutions"
              title="Quality Home Improvement Services"
              description="Explore our range of professional trade services. Every project is carried out with experienced tradesmanship, premium materials, and clear upfront pricing."
              align="center"
            />
          </ScrollReveal>

          {/* Dynamic Category Filter Tabs */}
          <ScrollReveal animation="fade-up" delay={100}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '10px',
                marginTop: '36px',
                marginBottom: '50px',
                flexWrap: 'wrap'
              }}
            >
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    padding: '10px 22px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '14px',
                    fontWeight: '700',
                    backgroundColor: activeCategory === cat.id ? 'var(--color-primary)' : 'var(--color-light)',
                    color: activeCategory === cat.id ? '#FFFFFF' : 'var(--color-text-main)',
                    border: activeCategory === cat.id ? 'none' : '1px solid var(--color-border)',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    boxShadow: activeCategory === cat.id ? 'var(--shadow-primary)' : 'none'
                  }}
                  onMouseOver={(e) => {
                    if (activeCategory !== cat.id) {
                      e.currentTarget.style.backgroundColor = 'var(--color-primary-light)';
                      e.currentTarget.style.color = 'var(--color-primary)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (activeCategory !== cat.id) {
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

          {/* 3. Services Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
              gap: '32px'
            }}
            className="services-cards-grid"
          >
            {filteredServices.map((service, idx) => {
              const IconComp = iconMap[service.icon] || Paintbrush;
              return (
                <ScrollReveal key={service.id} animation="fade-up" delay={idx * 80} duration={600}>
                  <div
                    className="paintters-card service-list-card"
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: 'var(--radius-xl)',
                      border: '1px solid var(--color-border)',
                      boxShadow: 'var(--shadow-sm)',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      transition: 'all 0.35s ease'
                    }}
                  >
                    {/* Thumbnail Image Container */}
                    <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
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

                      {/* Floating Badge */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '16px',
                          left: '16px',
                          backgroundColor: 'rgba(36, 45, 138, 0.9)',
                          backdropFilter: 'blur(6px)',
                          color: '#FFFFFF',
                          padding: '5px 14px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '12px',
                          fontWeight: '800',
                          letterSpacing: '0.5px'
                        }}
                      >
                        {service.badge}
                      </div>

                      {/* Icon Circle */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '-20px',
                          right: '24px',
                          width: '46px',
                          height: '46px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--color-secondary)',
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 4px 15px rgba(242, 101, 34, 0.4)',
                          zIndex: 2
                        }}
                      >
                        <IconComp size={22} />
                      </div>
                    </div>

                    {/* Card Body */}
                    <div style={{ padding: '32px 28px 28px 28px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      
                      <h3 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--color-primary)', marginBottom: '6px' }}>
                        {service.title}
                      </h3>

                      <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-secondary)', marginBottom: '14px' }}>
                        {service.tagline}
                      </div>

                      <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: '1.65', marginBottom: '20px' }}>
                        {service.description}
                      </p>

                      {/* Features Checklist */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px', flexGrow: 1 }}>
                        {(service.features || []).slice(0, 5).map((feat, fIdx) => (
                          <div key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <CheckCircle2 size={15} style={{ color: 'var(--color-secondary)', flexShrink: 0 }} />
                            <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-text-main)' }}>
                              {feat}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Card Action Buttons */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: 'auto' }}>
                        <Button
                          variant="secondary"
                          fullWidth
                          onClick={() => onOpenQuote({ title: service.title })}
                          icon={ArrowRight}
                          iconPosition="right"
                        >
                          Request a Free Quote
                        </Button>

                        <a
                          href={`https://wa.me/447912345678?text=Hello%20SK%20Home%20Solutions,%20I%20am%20interested%20in%20your%20${encodeURIComponent(service.title)}%20service.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            padding: '10px',
                            borderRadius: 'var(--radius-full)',
                            backgroundColor: '#E8FBF0',
                            color: '#128C7E',
                            fontSize: '13px',
                            fontWeight: '700',
                            textDecoration: 'none',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#D0F6E0')}
                          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#E8FBF0')}
                        >
                          <MessageCircle size={15} />
                          <span>WhatsApp Enquiry</span>
                        </a>
                      </div>

                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. Why Choose Our Trades Section */}
      <section style={{ padding: '90px 0', backgroundColor: 'var(--color-light)' }}>
        <div className="container-custom">
          
          <ScrollReveal animation="fade-up">
            <SectionHeader
              badge="Our Standards"
              title="Why Clients Choose SK Home Solutions"
              description="We deliver dependable tradesmanship with complete transparency and respect for your property."
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
                icon: ShieldCheck,
                title: "Guaranteed Quality",
                desc: "High standard painting, decorating & carpentry finished with care and precision."
              },
              {
                icon: Clock,
                title: "Reliable Scheduling",
                desc: "Punctual, organized, and dedicated scheduling across Liverpool and Merseyside."
              },
              {
                icon: Sparkles,
                title: "Clean Work Practices",
                desc: "Full dust sheet protection and daily tidy-up so your premises remain clean."
              },
              {
                icon: CheckCircle2,
                title: "Clear Honest Pricing",
                desc: "Transparent quotations with no hidden surprises or unexpected extra fees."
              }
            ].map((std, idx) => {
              const IconComp = std.icon;
              return (
                <ScrollReveal key={idx} animation="fade-up" delay={idx * 100}>
                  <div
                    className="paintters-card"
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: 'var(--radius-lg)',
                      padding: '32px 24px',
                      border: '1px solid var(--color-border)',
                      boxShadow: 'var(--shadow-sm)',
                      height: '100%'
                    }}
                  >
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '14px',
                        backgroundColor: 'var(--color-primary-light)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-secondary)',
                        marginBottom: '16px'
                      }}
                    >
                      <IconComp size={22} />
                    </div>

                    <h4 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--color-primary)', marginBottom: '8px' }}>
                      {std.title}
                    </h4>

                    <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: '1.65' }}>
                      {std.desc}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. Service Area Section (Liverpool) */}
      <ServiceAreaSection onOpenQuote={onOpenQuote} />

      {/* 6. Final Conversion CTA Banner */}
      <CtaBannerSection onOpenQuote={onOpenQuote} />

      <style>{`
        .service-list-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-lg);
          border-color: var(--color-secondary);
        }
        .service-list-card:hover .service-card-img {
          transform: scale(1.06);
        }
        @media (max-width: 768px) {
          .services-cards-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
