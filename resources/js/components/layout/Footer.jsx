import { usePage } from '@inertiajs/react';
import React from 'react';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { FacebookIcon, YoutubeIcon, InstagramIcon, TwitterIcon, LinkedinIcon } from '../common/SocialIcons';
import Logo from '../common/Logo';
import NewsletterSection from '../sections/NewsletterSection';
import { siteInfo } from '../../data/siteData';

export default function Footer({ onOpenQuote }) {
  const { settings = {} } = usePage().props;
  return (
    <footer
      style={{
        backgroundColor: 'var(--color-primary)',
        paddingTop: '60px',
        position: 'relative'
      }}
    >
      <div className="container-custom">
        
        {/* 1. Floating Newsletter Box */}
        <NewsletterSection />

        {/* 2. Main Footer Card (White box with rounded corners) */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '32px',
            padding: '110px 48px 48px 48px',
            marginTop: '0px',
            boxShadow: 'var(--shadow-md)'
          }}
          className="footer-main-card"
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.4fr 1fr 1fr 1.3fr',
              gap: '40px'
            }}
            className="footer-columns-grid"
          >
            {/* Col 1: Logo & About */}
            <div>
              <div style={{ marginBottom: '20px' }}>
                <Logo />
              </div>
              <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: '1.75', marginBottom: '18px' }}>
                {settings.footer_text || 'Built on Trust, Finished with Excellence. Professional Painting & Decorating and Carpentry & Joinery services across Liverpool and surrounding UK areas.'}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {settings.facebook && (
                  <a
                    href={settings.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: '38px', height: '38px', borderRadius: '50%', backgroundColor: 'var(--color-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease', textDecoration: 'none'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-secondary)'; e.currentTarget.style.color = '#FFFFFF'; }}
                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-light)'; e.currentTarget.style.color = 'var(--color-primary)'; }}
                    aria-label="Facebook"
                  >
                    <FacebookIcon size={16} />
                  </a>
                )}

                {settings.instagram && (
                  <a
                    href={settings.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: '38px', height: '38px', borderRadius: '50%', backgroundColor: 'var(--color-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease', textDecoration: 'none'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#E1306C'; e.currentTarget.style.color = '#FFFFFF'; }}
                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-light)'; e.currentTarget.style.color = 'var(--color-primary)'; }}
                    aria-label="Instagram"
                  >
                    <InstagramIcon size={16} />
                  </a>
                )}

                {settings.twitter && (
                  <a
                    href={settings.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: '38px', height: '38px', borderRadius: '50%', backgroundColor: 'var(--color-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease', textDecoration: 'none'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#000000'; e.currentTarget.style.color = '#FFFFFF'; }}
                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-light)'; e.currentTarget.style.color = 'var(--color-primary)'; }}
                    aria-label="X (Twitter)"
                  >
                    <TwitterIcon size={16} />
                  </a>
                )}

                {settings.linkedin && (
                  <a
                    href={settings.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: '38px', height: '38px', borderRadius: '50%', backgroundColor: 'var(--color-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease', textDecoration: 'none'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#0077B5'; e.currentTarget.style.color = '#FFFFFF'; }}
                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-light)'; e.currentTarget.style.color = 'var(--color-primary)'; }}
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon size={16} />
                  </a>
                )}

                {settings.youtube && (
                  <a
                    href={settings.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: '38px', height: '38px', borderRadius: '50%', backgroundColor: 'var(--color-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease', textDecoration: 'none'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#FF0000'; e.currentTarget.style.color = '#FFFFFF'; }}
                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-light)'; e.currentTarget.style.color = 'var(--color-primary)'; }}
                    aria-label="YouTube"
                  >
                    <YoutubeIcon size={16} />
                  </a>
                )}
              </div>
            </div>

            {/* Col 2: Services */}
            <div>
              <h4 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--color-primary)', marginBottom: '20px' }}>
                Our Services
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  'Interior Painting',
                  'Exterior Painting',
                  'Wall Preparation',
                  'General Carpentry',
                  'Door Fitting',
                  'Custom Woodwork'
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#services"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '14px',
                        color: 'var(--color-text-muted)',
                        fontWeight: '500',
                        textDecoration: 'none'
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.color = 'var(--color-secondary)')}
                      onMouseOut={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
                    >
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-secondary)' }} />
                      <span>{item}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Quick Links */}
            <div>
              <h4 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--color-primary)', marginBottom: '20px' }}>
                Quick Links
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { name: 'Home', href: '#home' },
                  { name: 'About Us', href: '#about' },
                  { name: 'Our Services', href: '#services' },
                  { name: 'Project Gallery', href: '#gallery' },
                  { name: 'Why Choose Us', href: '#about' },
                  { name: 'Request Free Quote', href: '#home', isQuote: true }
                ].map((item, idx) => (
                  <li key={idx}>
                    <a
                      href={item.href}
                      onClick={item.isQuote ? (e) => { e.preventDefault(); onOpenQuote && onOpenQuote(); } : undefined}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '14px',
                        color: 'var(--color-text-muted)',
                        fontWeight: '500',
                        textDecoration: 'none'
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.color = 'var(--color-secondary)')}
                      onMouseOut={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
                    >
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-secondary)' }} />
                      <span>{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Contact Information (Master Prompt Verified) */}
            <div>
              <h4 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--color-primary)', marginBottom: '20px' }}>
                Contact Details
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ color: 'var(--color-secondary)', marginTop: '2px', flexShrink: 0 }}>
                    <MapPin size={18} />
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                    {settings.address ? <div style={{ whiteSpace: 'pre-wrap' }}>{settings.address}</div> : <><strong style={{color: 'var(--color-primary)'}}>SK Home Solutions</strong><br />21 Alexander Road<br />Liverpool, L22 1RJ, UK</>}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{ color: 'var(--color-secondary)', flexShrink: 0 }}>
                    <Mail size={18} />
                  </div>
                  <a
                    href={`mailto:${(settings.email || siteInfo.email)}`}
                    style={{ fontSize: '13px', color: 'var(--color-text-muted)', textDecoration: 'none' }}
                    onMouseOver={(e) => (e.currentTarget.style.color = 'var(--color-secondary)')}
                    onMouseOut={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
                  >
                    {(settings.email || siteInfo.email)}
                  </a>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{ color: 'var(--color-secondary)', flexShrink: 0 }}>
                    <Phone size={18} />
                  </div>
                  <a
                    href={`tel:${(settings.phone || siteInfo.phone).replace(/\s+/g, '')}`}
                    style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-primary)', textDecoration: 'none' }}
                    onMouseOver={(e) => (e.currentTarget.style.color = 'var(--color-secondary)')}
                    onMouseOut={(e) => (e.currentTarget.style.color = 'var(--color-primary)')}
                    href={`tel:${(settings.phone || siteInfo.phone).replace(/\s+/g, '')}`}
                    style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-primary)', textDecoration: 'none' }}
                    onMouseOver={(e) => (e.currentTarget.style.color = 'var(--color-secondary)')}
                    onMouseOut={(e) => (e.currentTarget.style.color = 'var(--color-primary)')}
                  >
                    {(settings.phone || siteInfo.phoneDisplay)}
                  </a>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* 3. Bottom Green/Blue Bar */}
        <div
          style={{
            padding: '28px 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#CBD5E1',
            fontSize: '13px',
            flexWrap: 'wrap',
            gap: '16px'
          }}
          className="footer-bottom-bar"
        >
          <div>
            Copyright © {new Date().getFullYear()} <strong>SK Home Solutions</strong>. All Rights Reserved.<br />
            <span style={{ fontSize: '12px', color: '#94a3b8', marginTop: '6px', display: 'inline-block' }}>
              Developed by <a href="https://arbeittechnology.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-secondary)', textDecoration: 'none', fontWeight: '600' }}>Arbeit Technology</a>
            </span>
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#privacy" style={{ color: '#CBD5E1', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#cookies" style={{ color: '#CBD5E1', textDecoration: 'none' }}>Cookie Policy</a>
            <a href="#terms" style={{ color: '#CBD5E1', textDecoration: 'none' }}>Terms & Conditions</a>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 991px) {
          .footer-columns-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 32px !important;
          }
        }
        @media (max-width: 600px) {
          .footer-columns-grid {
            grid-template-columns: 1fr !important;
          }
          .footer-main-card {
            padding: 90px 20px 32px 20px !important;
          }
          .footer-bottom-bar {
            flex-direction: column !important;
            text-align: center !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </footer>
  );
}
