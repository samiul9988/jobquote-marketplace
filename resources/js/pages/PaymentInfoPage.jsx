import React, { useState, useEffect } from 'react';
import { Landmark, Smartphone, Wallet, CreditCard, Copy, Check, ShieldCheck, MessageCircle } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import PageBanner from '../components/common/PageBanner';
import SectionHeader from '../components/common/SectionHeader';
import ScrollReveal from '../components/common/ScrollReveal';
import { siteInfo } from '../data/siteData';

const typeMeta = {
  bank: { label: 'Bank Transfer', icon: Landmark, color: '#1D4ED8', bg: '#EFF6FF' },
  bkash: { label: 'bKash', icon: Smartphone, color: '#E2136E', bg: '#FCE7F1' },
  nagad: { label: 'Nagad', icon: Smartphone, color: '#F7931E', bg: '#FFF4E5' },
  paypal: { label: 'PayPal', icon: Wallet, color: '#003087', bg: '#EAF0FB' },
  other: { label: 'Other', icon: CreditCard, color: '#475569', bg: '#F1F5F9' },
};

function CopyField({ label, value }) {
  const [copied, setCopied] = useState(false);
  if (!value) return null;

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      // ignore clipboard errors
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', backgroundColor: '#F8FAFC', borderRadius: '10px', border: '1px solid #EEF2F6' }}>
      <div>
        <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.3px' }}>{label}</div>
        <div style={{ fontSize: '14px', color: '#0F172A', fontWeight: '700', marginTop: '2px', wordBreak: 'break-word' }}>{value}</div>
      </div>
      <button
        onClick={handleCopy}
        title="Copy"
        style={{
          flexShrink: 0, marginLeft: '12px', width: '32px', height: '32px', borderRadius: '8px',
          border: 'none', backgroundColor: copied ? '#DCFCE7' : '#FFFFFF', color: copied ? '#16A34A' : '#64748B',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          boxShadow: '0 1px 2px rgba(15,23,42,0.08)'
        }}
      >
        {copied ? <Check size={15} /> : <Copy size={15} />}
      </button>
    </div>
  );
}

function PaymentAccountCard({ account }) {
  const meta = typeMeta[account.type] || typeMeta.other;
  const Icon = meta.icon;

  return (
    <ScrollReveal animation="fade-up" duration={550}>
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-xl, 18px)',
        border: '1px solid #ECEFF3',
        padding: '28px',
        height: '100%',
        boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '14px', backgroundColor: meta.bg, color: meta.color,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
          }}>
            <Icon size={22} />
          </div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: '800', color: meta.color, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{meta.label}</div>
            <div style={{ fontSize: '17px', fontWeight: '800', color: '#0F172A' }}>{account.label}</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <CopyField label="Account Name" value={account.account_name} />
          <CopyField label="Account Number" value={account.account_number} />
          <CopyField label="Bank Name" value={account.bank_name} />
          <CopyField label="Sort Code" value={account.sort_code} />
          <CopyField label="IBAN" value={account.iban} />
          <CopyField label="SWIFT / BIC" value={account.swift_code} />
        </div>

        {account.instructions && (
          <p style={{ fontSize: '13px', color: '#64748B', lineHeight: '1.6', marginTop: '18px', marginBottom: 0 }}>
            {account.instructions}
          </p>
        )}
      </div>
    </ScrollReveal>
  );
}

export default function PaymentInfoPage({ paymentAccounts = [] }) {
  const { settings = {} } = usePage().props;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="payment-info-page-wrapper">
      <PageBanner
        title="Make a Payment"
        subtitle="Securely pay your invoice or deposit using any of the accounts below. Please include your name or invoice number as reference."
        backgroundImage="/images/projects/service-carpentry.jpg"
      />

      <section style={{ padding: '80px 0' }}>
        <div className="container-custom">
          <SectionHeader
            badge="PAYMENT OPTIONS"
            title="Our Receiving Accounts"
            description="Choose whichever payment method is most convenient for you. All accounts are verified and monitored by our finance team."
          />

          {paymentAccounts.length === 0 ? (
            <div style={{
              textAlign: 'center', padding: '60px 20px', color: '#64748B',
              backgroundColor: '#F8FAFC', borderRadius: '16px', border: '1px dashed #E2E8F0'
            }}>
              Payment account details are being updated. Please contact us directly to arrange your payment.
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
              marginTop: '40px'
            }}>
              {paymentAccounts.map(account => (
                <PaymentAccountCard key={account.id} account={account} />
              ))}
            </div>
          )}

          <ScrollReveal animation="fade-up" duration={600}>
            <div style={{
              marginTop: '48px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '20px',
              padding: '24px 28px',
              borderRadius: '16px',
              backgroundColor: 'var(--color-primary-light, #EEF2FF)',
              border: '1px solid rgba(29, 78, 216, 0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <ShieldCheck size={22} color="var(--color-primary)" />
                <div style={{ fontSize: '14px', color: '#334155', lineHeight: '1.5', maxWidth: '520px' }}>
                  Already made a payment? Send us a quick confirmation with your name and the amount paid, and we'll update your account right away.
                </div>
              </div>
              <a
                href={(settings.whatsapp ? `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}?text=Hi, I've just made a payment.` : siteInfo.whatsappUrl)}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  backgroundColor: '#25D366', color: '#FFFFFF', fontWeight: '700', fontSize: '14px',
                  padding: '12px 22px', borderRadius: '9999px', textDecoration: 'none', flexShrink: 0,
                  boxShadow: '0 8px 20px rgba(37, 211, 102, 0.3)'
                }}
              >
                <MessageCircle size={17} />
                <span>Confirm on WhatsApp</span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
