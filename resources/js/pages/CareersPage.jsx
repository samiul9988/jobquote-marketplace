import { usePage } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import {
  Paintbrush,
  Hammer,
  Layers,
  Briefcase,
  CheckCircle2,
  MapPin,
  Clock,
  PoundSterling,
  Send,
  ShieldCheck,
  ArrowRight,
  UserCheck,
  HardHat,
  FileText
} from 'lucide-react';
import PageBanner from '../components/common/PageBanner';
import SectionHeader from '../components/common/SectionHeader';
import Button from '../components/common/Button';
import ScrollReveal from '../components/common/ScrollReveal';
import ServiceAreaSection from '../components/sections/ServiceAreaSection';
import CtaBannerSection from '../components/sections/CtaBannerSection';
import JobApplyModal from '../components/modals/JobApplyModal';
import { careersData, siteInfo } from '../data/siteData';

const iconMap = {
  Paintbrush,
  Hammer,
  Layers
};

export default function CareersPage({ onOpenQuote, openings = [] }) {
  const { settings = {} } = usePage().props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Experienced Painter & Decorator');

  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Experienced Painter & Decorator',
    experience: '3 - 5 Years',
    location: 'Liverpool, UK',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleApplyClick = (roleTitle) => {
    setSelectedRole(roleTitle);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setApplicationData({
        name: '',
        email: '',
        phone: '',
        role: 'Experienced Painter & Decorator',
        experience: '3 - 5 Years',
        location: 'Liverpool, UK',
        message: ''
      });
    }, 4000);
  };

  return (
    <div className="careers-page-wrapper">
      
      {/* 1. Page Hero Banner */}
      <PageBanner
        title="Careers with SK Home Solutions"
        subtitle="We are looking for skilled, reliable, and detail-oriented tradespeople to join our growing Liverpool team."
        backgroundImage="/images/projects/service-carpentry.jpg"
      />

      {/* 2. Why Work With Us Section */}
      <section style={{ padding: '90px 0 50px 0', backgroundColor: '#FFFFFF' }}>
        <div className="container-custom">
          
          <ScrollReveal animation="fade-up">
            <SectionHeader
              badge="Join Our Trade Team"
              title="Why Work With SK Home Solutions"
              description="We respect our trades, pay promptly, and maintain organized, clean job sites throughout Merseyside."
              align="center"
            />
          </ScrollReveal>

          {/* 4 Benefits Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '24px',
              marginTop: '45px'
            }}
          >
            {careersData.benefits.map((b, idx) => (
              <ScrollReveal key={idx} animation="fade-up" delay={idx * 80} duration={600}>
                <div
                  className="paintters-card"
                  style={{
                    backgroundColor: 'var(--color-light)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '32px 26px',
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
                      backgroundColor: '#FFFFFF',
                      color: 'var(--color-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    <CheckCircle2 size={22} />
                  </div>

                  <h4 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--color-primary)', marginBottom: '8px' }}>
                    {b.title}
                  </h4>

                  <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: '1.65' }}>
                    {b.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* 3. Open Positions Section */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--color-light)' }}>
        <div className="container-custom">
          
          <ScrollReveal animation="fade-up">
            <SectionHeader
              badge="Current Openings"
              title="Available Trade Roles in Liverpool"
              description="Explore our current subcontract and full-time opportunities. Click Apply to open the application form."
              align="center"
            />
          </ScrollReveal>

          {/* Openings 3 Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '30px',
              marginTop: '50px'
            }}
            className="careers-openings-grid"
          >
            {openings.length === 0 ? (
              <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '60px 20px', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#F1F5F9', color: '#64748B', display: 'flex', alignItems: 'center', justifyCenter: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
                  <Briefcase size={28} />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--color-primary)', marginBottom: '8px' }}>No Job Posts Available</h3>
                <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', margin: 0, maxWidth: '450px', margin: '0 auto', lineHeight: '1.6' }}>We are not actively advertising any trade roles at the moment, but we are always open to hearing from skilled tradespeople. Feel free to submit a general application below.</p>
              </div>
            ) : (
              openings.map((job, idx) => {
              const IconComp = iconMap[job.icon] || Briefcase;
              return (
                <ScrollReveal key={job.id} animation="fade-up" delay={idx * 110} duration={650}>
                  <div
                    className="paintters-card"
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: 'var(--radius-xl)',
                      padding: '36px 30px',
                      border: '1px solid var(--color-border)',
                      boxShadow: 'var(--shadow-sm)',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      position: 'relative'
                    }}
                  >
                    {/* Header Top Tag */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
                      <div
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '16px',
                          backgroundColor: 'var(--color-primary-light)',
                          color: 'var(--color-primary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <IconComp size={24} />
                      </div>

                      <div
                        style={{
                          backgroundColor: 'var(--color-secondary-light)',
                          color: 'var(--color-secondary)',
                          fontSize: '12px',
                          fontWeight: '800',
                          padding: '5px 12px',
                          borderRadius: 'var(--radius-full)'
                        }}
                      >
                        {job.type}
                      </div>
                    </div>

                    <h3 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--color-primary)', marginBottom: '8px' }}>
                      {job.title}
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <MapPin size={14} style={{ color: 'var(--color-secondary)' }} />
                        <span>{job.location}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700', color: 'var(--color-primary)' }}>
                        <span>💰 {job.rate}</span>
                      </div>
                    </div>

                    <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: '1.6', marginBottom: '20px' }}>
                      {job.description}
                    </p>

                    {/* Requirements List */}
                    <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '16px', marginBottom: '24px', flexGrow: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--color-primary)', marginBottom: '10px' }}>
                        Candidate Requirements:
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {job.requirements.map((req, rIdx) => (
                          <div key={rIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                            <CheckCircle2 size={14} style={{ color: 'var(--color-secondary)', marginTop: '3px', flexShrink: 0 }} />
                            <span style={{ fontSize: '13px', color: 'var(--color-text-main)' }}>
                              {req}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Apply Button -> Opens Application Modal */}
                    <button
                      onClick={() => handleApplyClick(job.title)}
                      style={{
                        width: '100%',
                        backgroundColor: 'var(--color-secondary)',
                        color: '#FFFFFF',
                        padding: '13px 20px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '14px',
                        fontWeight: '700',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 4px 14px rgba(242, 101, 34, 0.3)'
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
                      <span>Apply for this Role</span>
                      <ArrowRight size={16} />
                    </button>

                  </div>
                </ScrollReveal>
                );
              }))
            }
          </div>

        </div>
      </section>

      {/* 4. Quick Apply Banner / General Application Form */}
      <section id="apply-form-section" style={{ padding: '90px 0', backgroundColor: '#FFFFFF' }}>
        <div className="container-custom">
          
          <div
            style={{
              maxWidth: '820px',
              margin: '0 auto',
              backgroundColor: 'var(--color-light)',
              borderRadius: 'var(--radius-xl)',
              padding: '50px 44px',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-md)'
            }}
            className="career-form-container"
          >
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 10px' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-primary-light)',
                    color: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px auto'
                  }}
                >
                  <CheckCircle2 size={36} />
                </div>
                <h3 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--color-primary)', marginBottom: '8px' }}>
                  Application Received!
                </h3>
                <p style={{ fontSize: '15px', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                  Thank you, <strong>{applicationData.name}</strong>. We have received your application for the <strong>{applicationData.role}</strong> position. Our trade coordinator will review your experience and contact you within 24–48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
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
                      <HardHat size={14} />
                      <span>General Trade Application</span>
                    </div>
                    <h3 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--color-primary)', marginBottom: '6px' }}>
                      Send Us Your Trade Profile
                    </h3>
                    <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', margin: 0 }}>
                      Looking for flexible subcontract work in Liverpool? Submit your details directly.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    style={{
                      backgroundColor: 'var(--color-secondary)',
                      color: '#FFFFFF',
                      padding: '10px 22px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '13px',
                      fontWeight: '700',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span>Open Pop-Up Form</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                {/* Row 1: Name & Phone */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="career-grid-row">
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--color-text-main)', marginBottom: '6px' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. David Clarke"
                      value={applicationData.name}
                      onChange={(e) => setApplicationData({ ...applicationData, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--color-border)',
                        fontSize: '14px',
                        outline: 'none',
                        backgroundColor: '#FFFFFF'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--color-text-main)', marginBottom: '6px' }}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+44 7912 345678"
                      value={applicationData.phone}
                      onChange={(e) => setApplicationData({ ...applicationData, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--color-border)',
                        fontSize: '14px',
                        outline: 'none',
                        backgroundColor: '#FFFFFF'
                      }}
                    />
                  </div>
                </div>

                {/* Row 2: Email & Location */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="career-grid-row">
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--color-text-main)', marginBottom: '6px' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="david@example.co.uk"
                      value={applicationData.email}
                      onChange={(e) => setApplicationData({ ...applicationData, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--color-border)',
                        fontSize: '14px',
                        outline: 'none',
                        backgroundColor: '#FFFFFF'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--color-text-main)', marginBottom: '6px' }}>
                      Your Liverpool Area / Postcode *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Crosby, L23"
                      value={applicationData.location}
                      onChange={(e) => setApplicationData({ ...applicationData, location: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--color-border)',
                        fontSize: '14px',
                        outline: 'none',
                        backgroundColor: '#FFFFFF'
                      }}
                    />
                  </div>
                </div>

                {/* Row 3: Role & Experience */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="career-grid-row">
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--color-text-main)', marginBottom: '6px' }}>
                      Trade / Position Applied For *
                    </label>
                    <select
                      value={applicationData.role}
                      onChange={(e) => setApplicationData({ ...applicationData, role: e.target.value })}
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
                      <option value="Experienced Painter & Decorator">Experienced Painter & Decorator</option>
                      <option value="Skilled Carpenter & Joiner">Skilled Carpenter & Joiner</option>
                      <option value="Plasterer & Multi-Trade Technician">Plasterer & Multi-Trade Technician</option>
                      <option value="General Subcontractor">General Subcontractor</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--color-text-main)', marginBottom: '6px' }}>
                      Years of UK Trade Experience *
                    </label>
                    <select
                      value={applicationData.experience}
                      onChange={(e) => setApplicationData({ ...applicationData, experience: e.target.value })}
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
                      <option value="1 - 2 Years">1 - 2 Years</option>
                      <option value="3 - 5 Years">3 - 5 Years (Experienced)</option>
                      <option value="5 - 10 Years">5 - 10 Years (Senior Trades)</option>
                      <option value="10+ Years">10+ Years (Master Craftsman)</option>
                    </select>
                  </div>
                </div>

                {/* Row 4: Past Experience Details */}
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--color-text-main)', marginBottom: '6px' }}>
                    Summary of Experience, Tools & Availability *
                  </label>
                  <textarea
                    required
                    rows="4"
                    placeholder="Tell us about the types of jobs you do, your tools/transport, and when you are available to start..."
                    value={applicationData.message}
                    onChange={(e) => setApplicationData({ ...applicationData, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-border)',
                      fontSize: '14px',
                      outline: 'none',
                      backgroundColor: '#FFFFFF',
                      resize: 'vertical'
                    }}
                  />
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    style={{
                      backgroundColor: 'var(--color-primary)',
                      color: '#FFFFFF',
                      padding: '14px 34px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '15px',
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
                    <Send size={16} />
                    <span>Submit Trade Application</span>
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>
      </section>

      {/* 5. Service Area Section */}
      <ServiceAreaSection onOpenQuote={onOpenQuote} />

      {/* 6. Final Conversion CTA Banner */}
      <CtaBannerSection onOpenQuote={onOpenQuote} />

      {/* 7. Interactive Job Apply Modal */}
      <JobApplyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        preselectedRole={selectedRole}
      />

      <style>{`
        @media (max-width: 768px) {
          .career-form-container {
            padding: 30px 20px !important;
          }
          .career-grid-row {
            grid-template-columns: 1fr !important;
          }
          .careers-openings-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
