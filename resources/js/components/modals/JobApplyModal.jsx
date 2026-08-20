import React, { useState, useEffect } from 'react';
import {
  X,
  Send,
  CheckCircle2,
  HardHat,
  Briefcase,
  Upload,
  FileText,
  User,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

export default function JobApplyModal({ isOpen, onClose, preselectedRole }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: preselectedRole || 'Experienced Painter & Decorator',
    experience: '3 - 5 Years',
    location: '',
    hasTools: 'Yes, full tool kit & transport',
    message: '',
    fileName: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (preselectedRole) {
      setFormData((prev) => ({ ...prev, role: preselectedRole }));
    }
  }, [preselectedRole]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, fileName: e.target.files[0].name });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: preselectedRole || 'Experienced Painter & Decorator',
      experience: '3 - 5 Years',
      location: '',
      hasTools: 'Yes, full tool kit & transport',
      message: '',
      fileName: ''
    });
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999,
        backgroundColor: 'rgba(16, 22, 58, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={handleResetAndClose}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-2xl)',
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
          position: 'relative',
          padding: '40px',
          border: '1px solid var(--color-border)',
          animation: 'modalSlideUp 0.3s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
        className="job-apply-modal-box"
      >
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-light)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--color-text-muted)',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-primary-light)';
            e.currentTarget.style.color = 'var(--color-primary)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-light)';
            e.currentTarget.style.color = 'var(--color-text-muted)';
          }}
        >
          <X size={20} />
        </button>

        {isSubmitted ? (
          /* Success Screen */
          <div style={{ textAlign: 'center', padding: '30px 10px' }}>
            <div
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px auto',
                boxShadow: '0 8px 20px rgba(36, 45, 138, 0.15)'
              }}
            >
              <CheckCircle2 size={40} />
            </div>

            <h3 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--color-primary)', marginBottom: '8px' }}>
              Application Submitted!
            </h3>

            <p style={{ fontSize: '15px', color: 'var(--color-text-muted)', lineHeight: '1.6', maxWidth: '480px', margin: '0 auto 24px auto' }}>
              Thank you, <strong>{formData.name}</strong>. Your trade application for <strong>{formData.role}</strong> has been received by our management team. We will review your experience and get back to you within 24–48 hours.
            </p>

            <button
              onClick={handleResetAndClose}
              style={{
                backgroundColor: 'var(--color-primary)',
                color: '#FFFFFF',
                padding: '12px 32px',
                borderRadius: 'var(--radius-full)',
                fontSize: '14px',
                fontWeight: '700',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Close Window
            </button>
          </div>
        ) : (
          /* Application Form */
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Header */}
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
                <span>Trade Application</span>
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--color-primary)', marginBottom: '4px' }}>
                Apply for {formData.role}
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: 0 }}>
                SK Home Solutions UK • Liverpool & Merseyside Projects
              </p>
            </div>

            {/* Row 1: Name & Phone */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="modal-form-grid">
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--color-text-main)', marginBottom: '6px' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. David Clarke"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--color-text-main)', marginBottom: '6px' }}>
                  UK Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+44 7912 345678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* Row 2: Email & Location */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="modal-form-grid">
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--color-text-main)', marginBottom: '6px' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="david@example.co.uk"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--color-text-main)', marginBottom: '6px' }}>
                  Liverpool Area / Postcode *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Crosby, L23"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* Row 3: Role & Experience */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="modal-form-grid">
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--color-text-main)', marginBottom: '6px' }}>
                  Trade Position *
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
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
                  UK Trade Experience *
                </label>
                <select
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
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

            {/* Row 4: Tools & Transport */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--color-text-main)', marginBottom: '6px' }}>
                Tools & Transport Status *
              </label>
              <select
                value={formData.hasTools}
                onChange={(e) => setFormData({ ...formData, hasTools: e.target.value })}
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)',
                  fontSize: '14px',
                  outline: 'none',
                  backgroundColor: '#FFFFFF'
                }}
              >
                <option value="Yes, full tool kit & transport">Yes, I have my own tools and transport</option>
                <option value="Hand tools only, have transport">Hand tools only, have transport</option>
                <option value="Tools available, rely on public transport">Tools available, rely on public transport</option>
              </select>
            </div>

            {/* Row 5: Experience & Availability */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--color-text-main)', marginBottom: '6px' }}>
                Past Experience, Qualifications & Availability *
              </label>
              <textarea
                required
                rows="3"
                placeholder="Briefly describe past projects you have completed and when you can start..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)',
                  fontSize: '14px',
                  outline: 'none',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Row 6: File Upload (CV or Photos) */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--color-text-main)', marginBottom: '6px' }}>
                Upload CV or Photos of Past Work (Optional)
              </label>
              <label
                style={{
                  border: '2px dashed var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  backgroundColor: 'var(--color-light)',
                  transition: 'border-color 0.2s ease'
                }}
                onMouseOver={(e) => (e.currentTarget.style.borderColor = 'var(--color-secondary)')}
                onMouseOut={(e) => (e.currentTarget.style.borderColor = 'var(--color-border)')}
              >
                <Upload size={18} style={{ color: 'var(--color-secondary)' }} />
                <span style={{ fontSize: '13px', color: 'var(--color-text-main)', fontWeight: '600' }}>
                  {formData.fileName ? formData.fileName : 'Click to select CV / Image files'}
                </span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.png"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
              </label>
            </div>

            {/* Submit Button */}
            <div style={{ marginTop: '10px' }}>
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  backgroundColor: 'var(--color-primary)',
                  color: '#FFFFFF',
                  padding: '14px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '15px',
                  fontWeight: '700',
                  border: 'none',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: 'var(--shadow-primary)',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  if (!isSubmitting) e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)';
                }}
                onMouseOut={(e) => {
                  if (!isSubmitting) e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                }}
              >
                {isSubmitting ? (
                  <span>Sending Application...</span>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Submit Application for {formData.role}</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>

      <style>{`
        @keyframes modalSlideUp {
          from {
            opacity: 0;
            transform: translateY(25px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @media (max-width: 640px) {
          .job-apply-modal-box {
            padding: 24px 18px !important;
          }
          .modal-form-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
