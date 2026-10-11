import React, { useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Hammer,
  PaintRoller
} from 'lucide-react';
import PageBanner from '../components/common/PageBanner';
import SectionHeader from '../components/common/SectionHeader';
import Button from '../components/common/Button';
import ScrollReveal from '../components/common/ScrollReveal';
import ServiceAreaSection from '../components/sections/ServiceAreaSection';
import CtaBannerSection from '../components/sections/CtaBannerSection';
import { siteInfo, serviceAreas } from '../data/siteData';

export default function ContactPage({ onOpenQuote }) {
  const { settings = {} } = usePage().props;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="contact-page-wrapper">
      
      {/* 1. Page Hero Banner with White Title */}
      <PageBanner
        title="Contact SK Home Solutions"
        subtitle="Get in touch for honest advice, project assessments, and a clear free quotation across Liverpool."
        backgroundImage="/images/projects/gallery-interior.jpg"
      />

      {/* 2. Direct Contact Info Channels */}
      <section style={{ padding: '90px 0 50px 0', backgroundColor: '#FFFFFF' }}>
        <div className="container-custom">
          
          <ScrollReveal animation="fade-up">
            <SectionHeader
              badge="Get In Touch"
              title="How Can We Help You Today?"
              description="Speak directly with our friendly Liverpool team. We are available by phone, WhatsApp, email, or online quote request."
              align="center"
            />
          </ScrollReveal>

          {/* 4 Contact Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '24px',
              marginTop: '45px'
            }}
          >
            {/* Card 1: Phone */}
            <ScrollReveal animation="fade-up" delay={0} duration={600}>
              <div
                className="paintters-card contact-channel-card"
                style={{
                  backgroundColor: 'var(--color-light)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '36px 26px',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  textAlign: 'center',
                  alignItems: 'center'
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '18px',
                    backgroundColor: 'var(--color-primary)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '18px',
                    boxShadow: 'var(--shadow-primary)'
                  }}
                >
                  <Phone size={24} />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--color-primary)', marginBottom: '6px' }}>
                  Call Us Directly
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '14px' }}>
                  Speak to our coordinator for advice or urgent bookings.
                </p>
                <a
                  href={`tel:${(settings.phone || siteInfo.phone)}`}
                  style={{
                    fontSize: '16px',
                    fontWeight: '800',
                    color: 'var(--color-secondary)',
                    marginTop: 'auto',
                    textDecoration: 'none'
                  }}
                >
                  {(settings.phone || siteInfo.phone)}
                </a>
              </div>
            </ScrollReveal>

            {/* Card 2: WhatsApp */}
            <ScrollReveal animation="fade-up" delay={80} duration={600}>
              <div
                className="paintters-card contact-channel-card"
                style={{
                  backgroundColor: 'var(--color-light)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '36px 26px',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  textAlign: 'center',
                  alignItems: 'center'
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '18px',
                    backgroundColor: '#25D366',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '18px',
                    boxShadow: '0 8px 20px rgba(37, 211, 102, 0.3)'
                  }}
                >
                  <MessageCircle size={26} />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--color-primary)', marginBottom: '6px' }}>
                  WhatsApp Chat
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '14px' }}>
                  Send photos of your walls or rooms for quick estimates.
                </p>
                <a
                  href="https://wa.me/447912345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '15px',
                    fontWeight: '800',
                    color: '#25D366',
                    marginTop: 'auto',
                    textDecoration: 'none'
                  }}
                >
                  Message on WhatsApp
                </a>
              </div>
            </ScrollReveal>

            {/* Card 3: Email */}
            <ScrollReveal animation="fade-up" delay={160} duration={600}>
              <div
                className="paintters-card contact-channel-card"
                style={{
                  backgroundColor: 'var(--color-light)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '36px 26px',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  textAlign: 'center',
                  alignItems: 'center'
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '18px',
                    backgroundColor: 'var(--color-primary)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '18px',
                    boxShadow: 'var(--shadow-primary)'
                  }}
                >
                  <Mail size={24} />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--color-primary)', marginBottom: '6px' }}>
                  Email Enquiries
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '14px' }}>
                  Send project specifications or tender documents.
                </p>
                <a
                  href={`mailto:${(settings.email || siteInfo.email)}`}
                  style={{
                    fontSize: '14px',
                    fontWeight: '800',
                    color: 'var(--color-primary)',
                    marginTop: 'auto',
                    textDecoration: 'none',
                    wordBreak: 'break-all'
                  }}
                >
                  {(settings.email || siteInfo.email)}
                </a>
              </div>
            </ScrollReveal>

            {/* Card 4: Location */}
            <ScrollReveal animation="fade-up" delay={240} duration={600}>
              <div
                className="paintters-card contact-channel-card"
                style={{
                  backgroundColor: 'var(--color-light)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '36px 26px',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  textAlign: 'center',
                  alignItems: 'center'
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '18px',
                    backgroundColor: 'var(--color-secondary)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '18px',
                    boxShadow: 'var(--shadow-secondary)'
                  }}
                >
                  <MapPin size={24} />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--color-primary)', marginBottom: '6px' }}>
                  Liverpool Hub
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '14px' }}>
                  {(settings.location || siteInfo.address)}
                </p>
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: '800',
                    color: 'var(--color-secondary)',
                    marginTop: 'auto'
                  }}
                >
                  Postcode: {siteInfo.postcode}
                </span>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* 3. Interactive Contact Form & Working Hours */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--color-light)' }}>
        <div className="container-custom">
          
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 0.8fr',
              gap: '40px',
              alignItems: 'start'
            }}
            className="contact-layout-grid"
          >
            {/* Left Column: Comprehensive Quote & Contact Form */}
            <ScrollReveal animation="fade-up" duration={650}>
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-2xl)',
                  padding: '48px 40px',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-md)'
                }}
                className="contact-form-box"
              >
                <div>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      backgroundColor: 'var(--color-secondary-light)',
                      color: 'var(--color-secondary)',
                      fontSize: '12px',
                      fontWeight: '800',
                      padding: '4px 12px',
                      borderRadius: 'var(--radius-full)',
                      marginBottom: '10px'
                    }}
                  >
                    <Sparkles size={14} />
                    <span>Free Quotation</span>
                  </div>
                  <h3 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--color-primary)', marginBottom: '6px' }}>
                    Request a Free Project Quote
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', margin: '0 0 28px' }}>
                    Tell us what type of work you need doing and we’ll get back to you promptly.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="contact-trade-options">
                    {[
                      { key: 'painting', label: 'Painting & Decorating', Icon: PaintRoller },
                      { key: 'carpentry', label: 'Carpentry / Joinery', Icon: Hammer }
                    ].map(({ key, label, Icon }) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => router.visit(`/find-tradesperson?trade=${key}`)}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '14px', padding: '36px 16px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', background: '#fff', cursor: 'pointer', fontSize: '15px', fontWeight: 700, color: 'var(--color-text-main)' }}
                      >
                        <Icon size={42} strokeWidth={2} color="var(--color-primary)" />
                        <span>{label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right Column: Working Hours, Fast Response & Guarantees */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Working Hours Card */}
              <ScrollReveal animation="fade-up" delay={100} duration={600}>
                <div
                  className="paintters-card"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 'var(--radius-xl)',
                    padding: '32px 28px',
                    border: '1px solid var(--color-border)',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                    <Clock size={22} style={{ color: 'var(--color-secondary)' }} />
                    <h4 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--color-primary)', margin: 0 }}>
                      Business & Working Hours
                    </h4>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>
                      <span style={{ fontWeight: '700', color: 'var(--color-text-main)' }}>Monday – Friday:</span>
                      <span style={{ color: 'var(--color-secondary)', fontWeight: '700' }}>8:00 AM – 6:00 PM</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>
                      <span style={{ fontWeight: '700', color: 'var(--color-text-main)' }}>Saturday:</span>
                      <span style={{ color: 'var(--color-primary)', fontWeight: '700' }}>9:00 AM – 4:00 PM</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: '700', color: 'var(--color-text-main)' }}>Sunday:</span>
                      <span style={{ color: 'var(--color-text-muted)' }}>Emergency / Closed</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Fast Quotation Commitment */}
              <ScrollReveal animation="fade-up" delay={180} duration={600}>
                <div
                  className="paintters-card"
                  style={{
                    backgroundColor: 'var(--color-primary-light)',
                    borderRadius: 'var(--radius-xl)',
                    padding: '32px 28px',
                    border: '1px solid rgba(36, 45, 138, 0.15)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                    <ShieldCheck size={24} style={{ color: 'var(--color-primary)' }} />
                    <h4 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--color-primary)', margin: 0 }}>
                      Our Quote Guarantee
                    </h4>
                  </div>

                  <p style={{ fontSize: '13px', color: 'var(--color-text-main)', lineHeight: '1.65', marginBottom: '16px' }}>
                    We provide transparent, itemized quotes with no hidden surcharges and zero high-pressure sales tactics.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[
                      "100% Free, No-Obligation Estimates",
                      "Clear Breakdown of Materials & Labor",
                      "Full Dust Sheet Floor Protection",
                      "Clean Work Guarantee on Every Site"
                    ].map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                        <CheckCircle2 size={15} style={{ color: 'var(--color-secondary)', flexShrink: 0 }} />
                        <span style={{ fontWeight: '600', color: 'var(--color-primary)' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Urgent Inquiries Banner */}
              <ScrollReveal animation="fade-up" delay={260} duration={600}>
                <div
                  style={{
                    backgroundColor: 'var(--color-dark)',
                    borderRadius: 'var(--radius-xl)',
                    padding: '28px',
                    color: '#FFFFFF'
                  }}
                >
                  <h4 style={{ fontSize: '17px', fontWeight: '800', color: '#FFFFFF', marginBottom: '6px' }}>
                    Need a Quick Turnaround?
                  </h4>
                  <p style={{ fontSize: '13px', color: '#CBD5E1', lineHeight: '1.5', marginBottom: '16px' }}>
                    For urgent tenancy painting or rapid joinery repairs, call or message us directly on WhatsApp.
                  </p>
                  <a
                    href="https://wa.me/447912345678"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: '#25D366',
                      color: '#FFFFFF',
                      padding: '10px 20px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '13px',
                      fontWeight: '700',
                      textDecoration: 'none'
                    }}
                  >
                    <MessageCircle size={16} />
                    <span>WhatsApp Priority Message</span>
                  </a>
                </div>
              </ScrollReveal>

            </div>
          </div>

        </div>
      </section>

      {/* 4. Liverpool Service Area Section */}
      <ServiceAreaSection onOpenQuote={onOpenQuote} />

      {/* 5. Final CTA Banner */}
      <CtaBannerSection onOpenQuote={onOpenQuote} />

      <style>{`
        .contact-channel-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
          border-color: var(--color-secondary);
        }
        @media (max-width: 992px) {
          .contact-layout-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .contact-form-box {
            padding: 28px 20px !important;
          }
          .contact-form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
