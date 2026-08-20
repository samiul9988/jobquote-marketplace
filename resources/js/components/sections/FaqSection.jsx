import { usePage } from '@inertiajs/react';
import React, { useState } from 'react';
import SectionHeader from '../common/SectionHeader';
import { faqs, siteInfo } from '../../data/siteData';
import { ChevronDown, Phone, HelpCircle } from 'lucide-react';

export default function FaqSection({ onOpenQuote, faqs: faqsProp = [] }) {
  const { settings = {} } = usePage().props;
  const activeFaqs = [1,2,3,4].map(n => ({
    question: settings[`home_faq${n}_q`] || (faqs[n-1] ? faqs[n-1].question : ''),
    answer: settings[`home_faq${n}_a`] || (faqs[n-1] ? faqs[n-1].answer : ''),
  }));
  const displayFaqs = faqsProp.length > 0 ? faqsProp : activeFaqs;
  // duplicate removed
  const [openId, setOpenId] = useState(1);

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      style={{
        padding: '100px 0',
        backgroundColor: 'var(--color-light)'
      }}
    >
      <div className="container-custom">
        <SectionHeader
          badge="Frequently Asked Questions"
          title="Got Questions? We Have Answers"
          description="Everything you need to know about our painting procedures, drying times, paint warranties, and project schedules."
          align="center"
        />

        <div
          style={{
            maxWidth: '820px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          {displayFaqs.map((faq, idx) => {
            const faqKey = faq.id || idx;
            const isOpen = openId === faqKey;
            return (
              <div
                key={faqKey}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  border: '1px solid',
                  borderColor: isOpen ? 'var(--color-primary)' : 'var(--color-border)',
                  boxShadow: isOpen ? '0 10px 30px rgba(0, 135, 90, 0.08)' : 'var(--shadow-sm)',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}
              >
                <button
                  onClick={() => toggleFaq(faqKey)}
                  style={{
                    width: '100%',
                    padding: '24px 28px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '16px',
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ fontSize: '17px', fontWeight: '800', color: isOpen ? 'var(--color-primary)' : 'var(--color-text-main)' }}>
                    {faq.question}
                  </span>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: isOpen ? 'var(--color-primary)' : 'var(--color-light)',
                      color: isOpen ? '#FFFFFF' : 'var(--color-text-main)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease'
                    }}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                {isOpen && (
                  <div style={{ padding: '0 28px 24px 28px' }}>
                    <p style={{ fontSize: '15px', color: 'var(--color-text-muted)', lineHeight: '1.7', margin: 0 }}>
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Help Banner */}
        <div
          style={{
            maxWidth: '600px',
            margin: '40px auto 0 auto',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-full)',
            padding: '14px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--color-border)',
            flexWrap: 'wrap'
          }}
        >
          <HelpCircle size={18} color="var(--color-primary)" />
          <span style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
            Have a different question?
          </span>
          <a
            href={`tel:${(settings.phone || siteInfo.phone)}`}
            style={{
              fontSize: '14px',
              fontWeight: '800',
              color: 'var(--color-primary)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Phone size={14} />
            <span>Call us at {(settings.phone || siteInfo.phone)}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
