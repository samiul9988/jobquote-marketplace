import { Head, Link, usePage } from '@inertiajs/react';
import React, { useEffect } from 'react';
import { ArrowLeft, CheckCircle2, Phone, Calendar } from 'lucide-react';
import Button from '../components/common/Button';
import CtaBannerSection from '../components/sections/CtaBannerSection';
import ScrollReveal from '../components/common/ScrollReveal';

export default function ServiceDetailsPage({ service }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = service.features ? JSON.parse(service.features) : [];
  const benefits = service.benefits ? JSON.parse(service.benefits) : [];

  return (
    <>
      <Head>
        <title>{service.title} | SK Hour</title>
        <meta name="description" content={service.tagline} />
      </Head>

      <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', paddingBottom: '60px' }}>
        {/* Hero Section */}
        <section style={{
          position: 'relative',
          height: '450px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFF',
          overflow: 'hidden'
        }}>
          {/* Background Image */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${service.image || '/images/projects/service-painting.jpg'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 1
          }} />
          {/* Dark Overlay */}
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.7)', zIndex: 2 }} />
          
          <div className="container-custom" style={{ position: 'relative', zIndex: 3, textAlign: 'center' }}>
            <Link href="/" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#CBD5E1',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '24px',
              transition: 'color 0.2s',
            }}
            onMouseOver={e => e.currentTarget.style.color = '#FFF'}
            onMouseOut={e => e.currentTarget.style.color = '#CBD5E1'}
            >
              <ArrowLeft size={16} /> Back to Home
            </Link>
            
            {service.badge && (
              <div style={{ marginBottom: '16px' }}>
                <span style={{
                  display: 'inline-block',
                  padding: '6px 14px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(4px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: '700',
                  color: 'var(--color-primary)',
                  letterSpacing: '1px',
                  textTransform: 'uppercase'
                }}>
                  {service.badge}
                </span>
              </div>
            )}
            
            <h1 style={{
              fontSize: '48px',
              fontWeight: '800',
              lineHeight: '1.2',
              marginBottom: '20px'
            }}>
              {service.title}
            </h1>
            
            <p style={{
              fontSize: '20px',
              color: '#E2E8F0',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              {service.tagline}
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section style={{ padding: '80px 0' }}>
          <div className="container-custom">
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 380px',
              gap: '50px',
              alignItems: 'start'
            }}>
              {/* Main Details */}
              <div>
                <ScrollReveal>
                  <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#0F172A', marginBottom: '24px' }}>
                    Service Overview
                  </h2>
                  <p style={{ fontSize: '17px', color: '#475569', lineHeight: '1.8', marginBottom: '40px' }}>
                    {service.description || "We provide top-notch services tailored to your specific needs. Our expert team ensures high-quality results from start to finish."}
                  </p>
                </ScrollReveal>

                {features.length > 0 && (
                  <ScrollReveal animation="fade-up">
                    <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', marginBottom: '24px' }}>
                      Key Features
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
                      {features.map((feature, idx) => (
                        <div key={idx} style={{
                          backgroundColor: '#FFF',
                          padding: '24px',
                          borderRadius: '16px',
                          border: '1px solid #E2E8F0',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '16px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                        }}>
                          <div style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: 'var(--color-primary)20',
                            color: 'var(--color-primary)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}>
                            <CheckCircle2 size={22} />
                          </div>
                          <div>
                            <p style={{ fontSize: '15px', fontWeight: '700', color: '#1E293B', lineHeight: '1.5' }}>
                              {feature}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollReveal>
                )}

                {benefits.length > 0 && (
                  <ScrollReveal animation="fade-up">
                    <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', marginBottom: '24px' }}>
                      Why Choose This Service?
                    </h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {benefits.map((benefit, idx) => (
                        <li key={idx} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          fontSize: '16px',
                          color: '#334155',
                          backgroundColor: '#FFF',
                          padding: '16px 24px',
                          borderRadius: '12px',
                          border: '1px solid #E2E8F0'
                        }}>
                          <CheckCircle2 size={20} color="var(--color-secondary)" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </ScrollReveal>
                )}
              </div>

              {/* Sidebar CTA */}
              <div style={{ position: 'sticky', top: '100px' }}>
                <ScrollReveal animation="fade-left">
                  <div style={{
                    backgroundColor: '#FFF',
                    borderRadius: '24px',
                    padding: '36px',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    border: '1px solid #E2E8F0'
                  }}>
                    <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', marginBottom: '16px', textAlign: 'center' }}>
                      Ready to start your project?
                    </h3>
                    <p style={{ fontSize: '15px', color: '#64748B', textAlign: 'center', marginBottom: '30px', lineHeight: '1.6' }}>
                      Contact us today for a free, no-obligation quote tailored to your specific requirements.
                    </p>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <Button variant="primary" fullWidth icon={Calendar}>
                        Request a Quote
                      </Button>
                      <Button variant="secondary" fullWidth icon={Phone}>
                        Call Us Now
                      </Button>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>
      </div>

      <CtaBannerSection />
    </>
  );
}
