import { usePage } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import {
  Eye,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageCircle,
  FileText
} from 'lucide-react';
import PageBanner from '../components/common/PageBanner';
import SectionHeader from '../components/common/SectionHeader';
import Button from '../components/common/Button';
import ScrollReveal from '../components/common/ScrollReveal';
import ServiceAreaSection from '../components/sections/ServiceAreaSection';
import CtaBannerSection from '../components/sections/CtaBannerSection';
import { siteInfo } from '../data/siteData';

export default function GalleryPage({ onOpenLightbox, onOpenQuote }) {
  const { settings = {}, projects = [] } = usePage().props;
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    { id: 'all', label: `All Works (${projects.length})` },
    { id: 'painting', label: 'Painting & Decorating' },
    { id: 'carpentry', label: 'Carpentry & Joinery' },
    { id: 'wallpaper', label: 'Wallpapering & Murals' },
    { id: 'media-wall', label: 'TV Media Walls' },
    { id: 'refurbishment', label: 'Property Refurbishment' }
  ];

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(item => item.categoryKey === activeCategory);

  return (
    <div className="gallery-page-wrapper">
      
      {/* 1. Page Hero Banner */}
      <PageBanner
        title="Project Gallery"
        subtitle="Explore our completed painting, decorating, carpentry, and joinery works across Liverpool & Merseyside."
        backgroundImage="/images/projects/gallery-interior.jpg"
      />

      {/* 2. Gallery Showcase Section */}
      <section style={{ padding: '90px 0', backgroundColor: '#FFFFFF' }}>
        <div className="container-custom">
          
          <ScrollReveal animation="fade-up">
            <SectionHeader
              badge="Our Work In Focus"
              title="Craftsmanship & Real Completed Projects"
              description="Browse our portfolio of completed projects for homeowners, landlords, and commercial clients throughout Liverpool and surrounding districts."
              align="center"
            />
          </ScrollReveal>

          {/* Dynamic Filter Tabs */}
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

          {/* 3. Project Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
              gap: '32px'
            }}
            className="gallery-cards-grid"
          >
            {filteredProjects.map((project, idx) => (
              <ScrollReveal key={project.id} animation="fade-up" delay={idx * 75} duration={600}>
                <div
                  className="paintters-card project-gallery-card"
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
                  {/* Image Container with Lightbox Click Trigger */}
                  <div
                    style={{ position: 'relative', height: '260px', overflow: 'hidden', cursor: 'pointer' }}
                    onClick={() => onOpenLightbox(project)}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease'
                      }}
                      className="project-gallery-img"
                    />

                    {/* Category Pill Tag */}
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
                        fontWeight: '800'
                      }}
                    >
                      {project.category}
                    </div>

                    {/* Location Badge */}
                    {project.location && (
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '16px',
                          left: '16px',
                          backgroundColor: 'rgba(16, 22, 58, 0.85)',
                          backdropFilter: 'blur(6px)',
                          color: '#FFFFFF',
                          padding: '4px 12px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '11px',
                          fontWeight: '700',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}
                      >
                        <MapPin size={12} style={{ color: 'var(--color-secondary)' }} />
                        <span>{project.location}</span>
                      </div>
                    )}

                    {/* Hover Overlay with Eye Icon */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(36, 45, 138, 0.65)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0,
                        transition: 'opacity 0.3s ease'
                      }}
                      className="project-gallery-overlay"
                    >
                      <div
                        style={{
                          width: '50px',
                          height: '50px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--color-secondary)',
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)'
                        }}
                      >
                        <Eye size={22} />
                      </div>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div style={{ padding: '28px 24px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    
                    <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--color-primary)', marginBottom: '8px' }}>
                      {project.title}
                    </h3>

                    <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: '1.65', marginBottom: '22px', flexGrow: 1 }}>
                      {project.description}
                    </p>

                    {/* Action Bar */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--color-border)', paddingTop: '16px' }}>
                      <button
                        onClick={() => onOpenLightbox(project)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--color-primary)',
                          fontSize: '13px',
                          fontWeight: '700',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: 0
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.color = 'var(--color-secondary)')}
                        onMouseOut={(e) => (e.currentTarget.style.color = 'var(--color-primary)')}
                      >
                        <Eye size={15} />
                        <span>View Full Image</span>
                      </button>

                      <button
                        onClick={() => onOpenQuote({ title: project.title })}
                        style={{
                          backgroundColor: 'var(--color-secondary)',
                          color: '#FFFFFF',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '12px',
                          fontWeight: '700',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--color-secondary-hover)';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--color-secondary)';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        <span>Quote Similar</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>

                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Standards & Workmanship Assurance */}
      <section style={{ padding: '90px 0', backgroundColor: 'var(--color-light)' }}>
        <div className="container-custom">
          
          <ScrollReveal animation="fade-up">
            <SectionHeader
              badge="Our Workmanship Guarantee"
              title="Finished with Excellence on Every Project"
              description="Every photograph in our gallery reflects our genuine commitment to high trade standards, dust-free cleanliness, and lasting finishes."
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
                title: "Thorough Preparation",
                desc: "Surface sanding, filling, plaster prep, and priming to guarantee flawless finish quality."
              },
              {
                title: "Trade-Grade Materials",
                desc: "Durable UK trade paints and solid timber joinery components selected for longevity."
              },
              {
                title: "Clean Work Practices",
                desc: "Comprehensive dust sheeting over floors and furniture with spotless daily cleanup."
              },
              {
                title: "Client Sign-Off",
                desc: "We perform a thorough walkthrough with you to ensure complete satisfaction before sign-off."
              }
            ].map((item, idx) => (
              <ScrollReveal key={idx} animation="fade-up" delay={idx * 90}>
                <div
                  className="paintters-card"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 'var(--radius-lg)',
                    padding: '30px 24px',
                    border: '1px solid var(--color-border)',
                    boxShadow: 'var(--shadow-sm)',
                    height: '100%'
                  }}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      backgroundColor: 'var(--color-primary-light)',
                      color: 'var(--color-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px'
                    }}
                  >
                    <CheckCircle2 size={20} />
                  </div>

                  <h4 style={{ fontSize: '17px', fontWeight: '800', color: 'var(--color-primary)', marginBottom: '8px' }}>
                    {item.title}
                  </h4>

                  <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: '1.65' }}>
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Service Area Section (Liverpool) */}
      <ServiceAreaSection onOpenQuote={onOpenQuote} />

      {/* 6. Final Conversion CTA Banner */}
      <CtaBannerSection onOpenQuote={onOpenQuote} />

      <style>{`
        .project-gallery-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-lg);
          border-color: var(--color-secondary);
        }
        .project-gallery-card:hover .project-gallery-img {
          transform: scale(1.06);
        }
        .project-gallery-card:hover .project-gallery-overlay {
          opacity: 1 !important;
        }
        @media (max-width: 768px) {
          .gallery-cards-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
