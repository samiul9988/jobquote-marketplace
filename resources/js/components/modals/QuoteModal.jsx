import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { services } from '../../data/siteData';
import { CheckCircle2, Send, ShieldCheck } from 'lucide-react';

export default function QuoteModal({ isOpen, onClose, preselectedService }) {
  const form = useForm({
    name: '',
    email: '',
    phone: '',
    service: preselectedService?.title || 'Interior Painting',
    propertyType: 'Residential',
    projectSize: 'Medium (1 - 3 Rooms)',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    form.post('/quotes', {
      onSuccess: () => {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          form.reset();
          onClose();
        }, 3500);
      }
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={preselectedService?.title ? `Request a Quote - ${preselectedService.title}` : "Request a Free Quote"} maxWidth="600px">
      {submitted ? (
        <div style={{ textAlign: 'center', padding: '30px 10px' }}>
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
          <h3 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--color-text-main)', marginBottom: '8px' }}>
            Thank You, {form.data.name || 'Friend'}!
          </h3>
          <p style={{ fontSize: '15px', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
            We have received your quotation request for <strong>{form.data.service}</strong>. We will review your details and contact you promptly with clear, honest pricing.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--color-text-main)', marginBottom: '6px' }}>
              Your Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Alexander Smith"
              value={form.data.name}
              onChange={(e) => form.setData('name', e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--color-text-main)', marginBottom: '6px' }}>
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="alexander@example.com"
                value={form.data.email}
                onChange={(e) => form.setData('email', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)',
                  fontSize: '14px',
                  outline: 'none'
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
                value={form.data.phone}
                onChange={(e) => form.setData('phone', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--color-text-main)', marginBottom: '6px' }}>
                Service Required
              </label>
              <select
                value={form.data.service}
                onChange={(e) => form.setData('service', e.target.value)}
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
                {services.map((s) => (
                  <option key={s.id} value={s.title}>{s.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--color-text-main)', marginBottom: '6px' }}>
                Property Scope
              </label>
              <select
                value={form.data.projectSize}
                onChange={(e) => form.setData('projectSize', e.target.value)}
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
                <option value="Single Room">Single Room</option>
                <option value="Medium (1 - 3 Rooms)">Medium (1 - 3 Rooms)</option>
                <option value="Full House / Apartment">Full House / Apartment</option>
                <option value="Commercial Facility">Commercial Facility</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--color-text-main)', marginBottom: '6px' }}>
              Project Notes or Address
            </label>
            <textarea
              rows={3}
              placeholder="Tell us about the surfaces, colors you like, or preferred start dates..."
              value={form.data.message}
              onChange={(e) => form.setData('message', e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
                fontSize: '14px',
                outline: 'none',
                resize: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--color-text-muted)', margin: '4px 0' }}>
            <ShieldCheck size={16} color="var(--color-primary)" />
            <span>100% Privacy guarantee. No spam, zero obligation estimate.</span>
          </div>

          <Button type="submit" variant="primary" fullWidth icon={Send} disabled={form.processing}>
            Submit Quote Request
          </Button>
        </form>
      )}
    </Modal>
  );
}