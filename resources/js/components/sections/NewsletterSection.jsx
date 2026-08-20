import React, { useState } from 'react';
import { Mail, Send, CheckCircle2 } from 'lucide-react';
import Button from '../common/Button';

export default function NewsletterSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setName('');
        setEmail('');
        setIsSubscribed(false);
      }, 4000);
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '32px',
        padding: '48px',
        boxShadow: '0 20px 50px rgba(0, 40, 30, 0.08)',
        marginBottom: '-60px',
        position: 'relative',
        zIndex: 20
      }}
      className="newsletter-card"
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          gap: '32px',
          alignItems: 'center'
        }}
        className="newsletter-grid"
      >
        {/* Left Headline */}
        <div>
          <h2 style={{ fontSize: '38px', fontWeight: '900', color: 'var(--color-text-main)', marginBottom: '8px' }}>
            Newsletter
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--color-text-muted)' }}>
            Signup our newsletter to get update information, news & insight.
          </p>
        </div>

        {/* Right Form */}
        <div>
          {isSubscribed ? (
            <div
              style={{
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-primary)',
                padding: '16px 24px',
                borderRadius: 'var(--radius-full)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontWeight: '700',
                fontSize: '15px'
              }}
            >
              <CheckCircle2 size={20} />
              <span>Thank you for subscribing to our newsletter!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px'
                }}
                className="newsletter-inputs"
              >
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    backgroundColor: 'var(--color-light)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-full)',
                    padding: '14px 20px',
                    fontSize: '14px',
                    outline: 'none',
                    color: 'var(--color-text-main)',
                    width: '100%'
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--color-primary)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--color-border)')}
                />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    backgroundColor: 'var(--color-light)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-full)',
                    padding: '14px 20px',
                    fontSize: '14px',
                    outline: 'none',
                    color: 'var(--color-text-main)',
                    width: '100%'
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--color-primary)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--color-border)')}
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                icon={Mail}
                iconPosition="left"
                style={{ padding: '15px', borderRadius: 'var(--radius-full)' }}
              >
                Sign Up
              </Button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .newsletter-grid {
            grid-template-columns: 1fr !important;
          }
          .newsletter-card {
            padding: 32px 24px !important;
            margin-bottom: -40px !important;
          }
        }
        @media (max-width: 600px) {
          .newsletter-inputs {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
