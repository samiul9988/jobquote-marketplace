import React, { useEffect } from 'react';
import { Link , usePage} from '@inertiajs/react';
import {
  CheckCircle2,
  ShieldCheck,
  Clock,
  Sparkles,
  UserCheck,
  HeartHandshake,
  Sparkle,
  MapPin,
  ArrowRight,
  Hammer,
  Paintbrush,
  Target,
  Compass,
  Eye,
  Award,
  Star
} from 'lucide-react';
import PageBanner from '../components/common/PageBanner';
import SectionHeader from '../components/common/SectionHeader';
import Button from '../components/common/Button';
import ScrollReveal from '../components/common/ScrollReveal';
import ServiceAreaSection from '../components/sections/ServiceAreaSection';
import CtaBannerSection from '../components/sections/CtaBannerSection';
import { siteInfo } from '../data/siteData';

export default function AboutPage({ onOpenQuote }) {
  const { settings = {} } = usePage().props;
  // Scroll to top when page mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const ab = settings;
  const coreValues = [
    { icon: ShieldCheck, title: ab.about_value1_title || "Trust & Integrity", desc: ab.about_value1_desc || "" },
    { icon: Award, title: ab.about_value2_title || "Craftsmanship & Pride", desc: ab.about_value2_desc || "" },
    { icon: HeartHandshake, title: ab.about_value3_title || "Customer Respect", desc: ab.about_value3_desc || "" },
    { icon: Clock, title: ab.about_value4_title || "Punctuality & Reliability", desc: ab.about_value4_desc || "" },
  ];

  const approaches = [
    { num: "01", title: ab.about_approach1_title || "Thorough Preparation", desc: ab.about_approach1_desc || "" },
    { num: "02", title: ab.about_approach2_title || "Clean & Respectful Execution", desc: ab.about_approach2_desc || "" },
    { num: "03", title: ab.about_approach3_title || "Punctual & Organized Scheduling", desc: ab.about_approach3_desc || "" },
    { num: "04", title: ab.about_approach4_title || "Final Inspection & Handover", desc: ab.about_approach4_desc || "" },
  ];

  const qualityCommitments = [
    { title: ab.about_quality1_title || "Premium Trade Materials", desc: ab.about_quality1_desc || "" },
    { title: ab.about_quality2_title || "Clear, Upfront Pricing", desc: ab.about_quality2_desc || "" },
    { title: ab.about_quality3_title || "Attention to Fine Detail", desc: ab.about_quality3_desc || "" },
    { title: ab.about_quality4_title || "Dedicated Customer Focus", desc: ab.about_quality4_desc || "" },
  ];

  return (
    <div className="about-page-wrapper">
      
      {/* 1. Page Hero Banner */}
      <PageBanner
        title={ab.about_hero_title || "About SK Home Solutions"}
        subtitle={ab.about_hero_subtitle || "Liverpool's trusted painting, decorating & carpentry specialists."}
        backgroundImage={ab.about_hero_bg || "/images/projects/gallery-interior.jpg"}
      />

      {/* 2. Who We Are Section */}
      <section style={{ padding: '100px 0', backgroundColor: '#FFFFFF' }}>
        <div className="container-custom">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.05fr 1fr',
              gap: '60px',
              alignItems: 'center'
            }}
            className="about-page-intro-grid"
          >
            {/* Left Column: Authentic Dual Image Showcase */}
            <ScrollReveal animation="fade-right" duration={700}>
              <div style={{ position: 'relative' }} className="about-collage">
                
                {/* Main Large Image */}
                <div
                  style={{
                    borderRadius: 'var(--radius-xl)',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-lg)',
                    height: '480px'
                  }}
                >
                  <img
                    src={ab.about_main_image || "/images/projects/service-painting.jpg"}
                    alt="SK Home Solutions Professional Painting"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Overlapping Secondary Image */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-35px',
                    right: '-30px',
                    width: '58%',
                    height: '260px',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    border: '6px solid #FFFFFF',
                    boxShadow: 'var(--shadow-lg)'
                  }}
                  className="about-sub-image"
                >
                  <img
                    src={ab.about_secondary_image || "/images/projects/service-carpentry.jpg"}
                    alt="SK Home Solutions Carpentry Craftsmanship"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Location Badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '25px',
                    left: '-20px',
                    backgroundColor: 'var(--color-primary)',
                    color: '#FFFFFF',
                    padding: '14px 22px',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                  className="about-pin-badge"
                >
                  <MapPin size={20} style={{ color: 'var(--color-secondary)' }} />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '800' }}>Liverpool, UK</div>
                    <div style={{ fontSize: '11px', color: '#CBD5E1' }}>L22 1RJ & Merseyside</div>
                  </div>
                </div>

              </div>
            </ScrollReveal>

            {/* Right Column: In-Depth Story */}
            <ScrollReveal animation="fade-left" duration={700} delay={150}>
              <div>
                <SectionHeader
                  badge="Who We Are"
                  title={ab.about_who_heading || "Your Trusted Local Home Improvement Specialists"}
                  align="left"
                />

                <p style={{ fontSize: '15px', color: 'var(--color-text-muted)', lineHeight: '1.8', marginBottom: '18px' }}>
                  {ab.about_who_para1 || <><strong>SK Home Solutions</strong> is an established, Liverpool-based property services company.</>}
                </p>

                <p style={{ fontSize: '15px', color: 'var(--color-text-muted)', lineHeight: '1.8', marginBottom: '28px' }}>
                  {ab.about_who_para2 || "Operating from Alexander Road in Liverpool (L22 1RJ), we deliver high-standard workmanship."}
                </p>

                {/* Core Brand Value Pill Highlights */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '36px' }}>
                  {[
                    ab.about_who_highlight1 || "Professional & Licensed Trades",
                    ab.about_who_highlight2 || "Liverpool & Merseyside Local",
                    ab.about_who_highlight3 || "Transparent Quotations",
                    ab.about_who_highlight4 || "Clean & Respectful Service"
                  ].map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--color-secondary-light)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        <CheckCircle2 size={15} style={{ color: 'var(--color-secondary)' }} />
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-text-main)' }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                  <Button
                    variant="secondary"
                    onClick={onOpenQuote}
                    icon={ArrowRight}
                    iconPosition="right"
                  >
                    Request a Free Quote
                  </Button>

                  <a
                    href={`tel:${(settings.phone || siteInfo.phone).replace(/\s+/g, '')}`}
                    style={{
                      fontSize: '14px',
                      fontWeight: '700',
                      color: 'var(--color-primary)',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span>Call Us:</span>
                    <span style={{ color: 'var(--color-secondary)' }}>{(settings.phone || siteInfo.phoneDisplay)}</span>
                  </a>
                </div>

              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* 3. Mission, Vision & Core Values Section */}
      <section style={{ padding: '100px 0', backgroundColor: 'var(--color-light)' }}>
        <div className="container-custom">
          
          <ScrollReveal animation="fade-up">
            <SectionHeader
              badge="Mission, Vision & Values"
              title="Guided by Purpose, Driven by Excellence"
              description="Our mission and vision define how we conduct business, treat our clients, and build enduring trust across Liverpool."
              align="center"
            />
          </ScrollReveal>

          {/* Mission & Vision Dual Flagship Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '32px',
              marginTop: '50px',
              marginBottom: '50px'
            }}
            className="mission-vision-grid"
          >
            {/* Mission Card */}
            <ScrollReveal animation="fade-up" delay={100}>
              <div
                className="paintters-card"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-xl)',
                  padding: '48px 40px',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-md)',
                  position: 'relative',
                  overflow: 'hidden',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {/* Decorative Top Accent Line */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '5px',
                    backgroundColor: 'var(--color-primary)'
                  }}
                />

                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '18px',
                    backgroundColor: 'var(--color-primary-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-primary)',
                    marginBottom: '24px'
                  }}
                >
                  <Target size={30} />
                </div>

                <h3 style={{ fontSize: '26px', fontWeight: '900', color: 'var(--color-primary)', marginBottom: '14px' }}>
                  Our Mission
                </h3>

                <p style={{ fontSize: '15px', color: 'var(--color-text-muted)', lineHeight: '1.8', flexGrow: 1 }}>
                  To deliver exceptional, high-standard <strong>Painting & Decorating</strong> and <strong>Carpentry & Joinery</strong> services across Liverpool by combining master craftsmanship, dependable scheduling, clear upfront pricing, and absolute respect for every property we work on.
                </p>
              </div>
            </ScrollReveal>

            {/* Vision Card */}
            <ScrollReveal animation="fade-up" delay={200}>
              <div
                className="paintters-card"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-xl)',
                  padding: '48px 40px',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-md)',
                  position: 'relative',
                  overflow: 'hidden',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {/* Decorative Top Accent Line */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '5px',
                    backgroundColor: 'var(--color-secondary)'
                  }}
                />

                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '18px',
                    backgroundColor: 'var(--color-secondary-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-secondary)',
                    marginBottom: '24px'
                  }}
                >
                  <Eye size={30} />
                </div>

                <h3 style={{ fontSize: '26px', fontWeight: '900', color: 'var(--color-primary)', marginBottom: '14px' }}>
                  Our Vision
                </h3>

                <p style={{ fontSize: '15px', color: 'var(--color-text-muted)', lineHeight: '1.8', flexGrow: 1 }}>
                  To become Liverpool’s most trusted and highly recommended home improvement company—recognized as the benchmark for trade reliability, honest advice, outstanding finishes, and lasting client relationships.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* 4 Core Values Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px'
            }}
          >
            {coreValues.map((val, idx) => {
              const IconComponent = val.icon;
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
                      <IconComponent size={22} />
                    </div>

                    <h4 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--color-primary)', marginBottom: '8px' }}>
                      {val.title}
                    </h4>

                    <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: '1.65' }}>
                      {val.desc}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. Our Approach Section */}
      <section style={{ padding: '100px 0', backgroundColor: '#FFFFFF' }}>
        <div className="container-custom">
          
          <ScrollReveal animation="fade-up">
            <SectionHeader
              badge="Our Approach"
              title="How We Deliver Excellence on Every Job"
              description="A structured, tidy, and transparent methodology designed to guarantee superior results without stress."
              align="center"
            />
          </ScrollReveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '28px',
              marginTop: '50px'
            }}
            className="approach-grid"
          >
            {approaches.map((item, idx) => (
              <ScrollReveal key={item.num} animation="fade-up" delay={idx * 120}>
                <div
                  className="paintters-card approach-card"
                  style={{
                    backgroundColor: 'var(--color-light)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '36px 28px',
                    border: '1px solid var(--color-border)',
                    boxShadow: 'var(--shadow-sm)',
                    position: 'relative',
                    height: '100%'
                  }}
                >
                  <div
                    style={{
                      fontSize: '28px',
                      fontWeight: '900',
                      color: 'var(--color-secondary)',
                      marginBottom: '16px',
                      fontFamily: 'var(--font-heading)'
                    }}
                  >
                    {item.num}
                  </div>

                  <h4 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--color-primary)', marginBottom: '10px' }}>
                    {item.title}
                  </h4>

                  <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: '1.7' }}>
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Our Commitment to Quality */}
      <section style={{ padding: '100px 0', backgroundColor: 'var(--color-light)' }}>
        <div className="container-custom">
          
          <ScrollReveal animation="fade-up">
            <SectionHeader
              badge="Quality Commitment"
              title="Workmanship You Can Depend On"
              description="We hold ourselves to high standards of trade professionalism, customer care, and integrity."
              align="center"
            />
          </ScrollReveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
              gap: '28px',
              marginTop: '50px'
            }}
          >
            {qualityCommitments.map((qc, idx) => (
              <ScrollReveal key={idx} animation="fade-up" delay={idx * 110}>
                <div
                  className="paintters-card qc-card"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 'var(--radius-lg)',
                    padding: '32px 26px',
                    border: '1px solid var(--color-border)',
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
                      color: 'var(--color-primary)',
                      marginBottom: '18px',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    <CheckCircle2 size={22} style={{ color: 'var(--color-secondary)' }} />
                  </div>

                  <h4 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--color-primary)', marginBottom: '8px' }}>
                    {qc.title}
                  </h4>

                  <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: '1.65' }}>
                    {qc.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>


      {/* 7. Service Area Section (Liverpool Focus) */}
      <ServiceAreaSection onOpenQuote={onOpenQuote} />

      {/* 8. Final Conversion CTA Banner */}
      <CtaBannerSection onOpenQuote={onOpenQuote} />

      <style>{`
        @media (max-width: 991px) {
          .about-page-intro-grid,
          .mission-vision-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .about-sub-image {
            right: 0 !important;
            bottom: -20px !important;
          }
          .about-pin-badge {
            left: 10px !important;
          }
        }
      `}</style>
    </div>
  );
}

