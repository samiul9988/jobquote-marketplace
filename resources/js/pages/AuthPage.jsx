import React, { useState, useEffect } from 'react';
import { Link, useForm , usePage} from '@inertiajs/react';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Phone,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  HardHat,
  Home,
  Sparkles,
  KeyRound
} from 'lucide-react';
import Logo from '../components/common/Logo';
import ScrollReveal from '../components/common/ScrollReveal';
import { siteInfo } from '../data/siteData';

export default function AuthPage() {
  const { settings = {} } = usePage().props;
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'signup'
  const [userRole, setUserRole] = useState('client'); // 'client' or 'trade'
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [authSuccess, setAuthSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  
  // Inertia Form States
  const loginForm = useForm({
    email: '',
    password: '',
    remember: true,
  });

  const signupForm = useForm({
    fullName: '',
    email: '',
    phone: '',
    postcode: '',
    role: 'client',
    password: '',
    confirmPassword: '',
    agreeTerms: true
  });


  const handleLoginSubmit = (e) => {
    e.preventDefault();
    loginForm.post('/login', {
      onError: (errors) => {
        alert('Login failed: ' + JSON.stringify(errors));
      }
    });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    signupForm.post('/signup');
  };

  const fillDemoLogin = (role) => {
    setUserRole(role);
    if (role === 'client') {
      loginForm.setData('email', 'client.demo@skhomesolutions.co.uk');
      loginForm.setData('password', 'DemoClient2026!');
    } else {
      loginForm.setData('email', 'trade.joiner@skhomesolutions.co.uk');
      loginForm.setData('password', 'DemoTrade2026!');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-light)',
        paddingTop: '130px',
        paddingBottom: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}
      className="auth-page-container"
    >
      {/* Decorative Background Glows */}
      <div
        style={{
          position: 'absolute',
          top: '80px',
          left: '10%',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          backgroundColor: 'rgba(36, 45, 138, 0.06)',
          filter: 'blur(70px)',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '50px',
          right: '10%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          backgroundColor: 'rgba(242, 101, 34, 0.08)',
          filter: 'blur(70px)',
          pointerEvents: 'none'
        }}
      />

      <div className="container-custom" style={{ position: 'relative', zIndex: 10, maxWidth: '1080px' }}>
        
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-2xl)',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--color-border)',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: '1fr 1.15fr'
          }}
          className="auth-grid-box"
        >
          {/* Left Column: Brand Hero Showcase Banner */}
          <div
            style={{
              backgroundColor: 'var(--color-primary)',
              backgroundImage: 'linear-gradient(145deg, #1A2270 0%, #242D8A 60%, #171E68 100%)',
              color: '#FFFFFF',
              padding: '48px 40px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden'
            }}
            className="auth-side-banner"
          >
            {/* Background Pattern Image */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: "url('/images/projects/gallery-interior.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.15,
                mixBlendMode: 'luminosity',
                pointerEvents: 'none'
              }}
            />

            {/* Top Side Info */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '12px',
                  fontWeight: '700',
                  color: 'var(--color-secondary)',
                  marginBottom: '28px',
                  backdropFilter: 'blur(4px)'
                }}
              >
                <ShieldCheck size={15} />
                <span>SK Client & Trade Portal</span>
              </div>

              <h2 style={{ fontSize: '32px', fontWeight: '900', lineHeight: '1.2', color: '#FFFFFF', marginBottom: '14px' }}>
                Manage Your Home Improvement Projects
              </h2>

              <p style={{ fontSize: '14px', color: '#CBD5E1', lineHeight: '1.65', marginBottom: '30px' }}>
                Log in to view your quotes, schedule upcoming painting or joinery jobs, download invoices, or submit subcontractor timesheets.
              </p>

              {/* 3 Key Benefits */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  "Track Quotes & Live Job Schedules",
                  "Verified UK Decorators & Master Carpenters",
                  "Direct WhatsApp & Dedicated Support"
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(242, 101, 34, 0.2)',
                        color: 'var(--color-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <CheckCircle2 size={15} />
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#F1F5F9' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Authentication Tabs & Forms */}
          <div style={{ padding: '48px 44px' }} className="auth-form-side">
            
            {authSuccess ? (
              /* Success Screen */
              <div style={{ textAlign: 'center', padding: '40px 10px' }}>
                <div
                  style={{
                    width: '68px',
                    height: '68px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-primary-light)',
                    color: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px auto',
                    boxShadow: '0 8px 25px rgba(36, 45, 138, 0.15)'
                  }}
                >
                  <CheckCircle2 size={38} />
                </div>

                <h3 style={{ fontSize: '26px', fontWeight: '900', color: 'var(--color-primary)', marginBottom: '8px' }}>
                  {authSuccess.type === 'login' ? `Welcome Back, ${authSuccess.name}!` : 'Account Created Successfully!'}
                </h3>

                <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: '1.6', maxWidth: '400px', margin: '0 auto 24px auto' }}>
                  You are now authenticated as <strong>{authSuccess.role}</strong>. You have full access to your quotes, booking management, and project communication.
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                  <Link
                    href="/dashboard"
                    style={{
                      backgroundColor: 'var(--color-primary)',
                      color: '#FFFFFF',
                      padding: '12px 28px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '14px',
                      fontWeight: '700',
                      textDecoration: 'none'
                    }}
                  >
                    Go to Dashboard
                  </Link>

                  <button
                    type="button"
                    onClick={() => setAuthSuccess(null)}
                    style={{
                      backgroundColor: 'var(--color-light)',
                      color: 'var(--color-text-main)',
                      padding: '12px 20px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '14px',
                      fontWeight: '700',
                      border: '1px solid var(--color-border)'
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {/* 1. Toggle Tabs */}
                <div
                  style={{
                    display: 'flex',
                    backgroundColor: 'var(--color-light)',
                    borderRadius: 'var(--radius-full)',
                    padding: '4px',
                    marginBottom: '32px',
                    border: '1px solid var(--color-border)'
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setActiveTab('login')}
                    style={{
                      flex: 1,
                      padding: '10px 16px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '14px',
                      fontWeight: '800',
                      backgroundColor: activeTab === 'login' ? 'var(--color-primary)' : 'transparent',
                      color: activeTab === 'login' ? '#FFFFFF' : 'var(--color-text-main)',
                      boxShadow: activeTab === 'login' ? 'var(--shadow-primary)' : 'none',
                      transition: 'all 0.25s ease'
                    }}
                  >
                    Sign In
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('signup')}
                    style={{
                      flex: 1,
                      padding: '10px 16px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '14px',
                      fontWeight: '800',
                      backgroundColor: activeTab === 'signup' ? 'var(--color-primary)' : 'transparent',
                      color: activeTab === 'signup' ? '#FFFFFF' : 'var(--color-text-main)',
                      boxShadow: activeTab === 'signup' ? 'var(--shadow-primary)' : 'none',
                      transition: 'all 0.25s ease'
                    }}
                  >
                    Create Account
                  </button>
                </div>

                {/* 2. Login Form */}
                {activeTab === 'login' ? (
                  <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    


                    {/* Email / Username */}
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--color-text-main)', marginBottom: '6px' }}>
                        Email Address or Phone
                      </label>
                      <div style={{ position: 'relative' }}>
                        <input
                          type="text"
                          required
                          placeholder="client@example.co.uk"
                          value={loginForm.data.email}
                          onChange={(e) => loginForm.setData('email', e.target.value)}
                            style={{ width: '100%', padding: '12px 14px 12px 40px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '14px', outline: 'none' }}
                          />
                          {loginForm.errors.email && <div style={{color: 'red', fontSize: '13px', marginTop: '4px', position: 'relative', zIndex: 10}}>{loginForm.errors.email}</div>}
                        <Mail size={16} style={{ position: 'absolute', top: '15px', left: '14px', color: 'var(--color-text-muted)' }} />
                      </div>
                    </div>

                    {/* Password */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-text-main)' }}>
                          Password
                        </label>
                        <a
                          href="#forgot"
                          onClick={(e) => {
                            e.preventDefault();
                            alert('Password reset link sent to registered email.');
                          }}
                          style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-secondary)', textDecoration: 'none' }}
                        >
                          Forgot Password?
                        </a>
                      </div>
                      <div style={{ position: 'relative' }}>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          placeholder="••••••••"
                          value={loginForm.data.password}
                          onChange={(e) => loginForm.setData('password', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '12px 40px 12px 40px',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--color-border)',
                            fontSize: '14px',
                            outline: 'none'
                          }}
                        />
                        <Lock size={16} style={{ position: 'absolute', top: '15px', left: '14px', color: 'var(--color-text-muted)' }} />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          style={{
                            position: 'absolute',
                            top: '12px',
                            right: '12px',
                            color: 'var(--color-text-muted)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    {/* Remember Me */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="checkbox"
                        id="remember"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        style={{ accentColor: 'var(--color-primary)', cursor: 'pointer' }}
                      />
                      <label htmlFor="remember" style={{ fontSize: '13px', color: 'var(--color-text-muted)', cursor: 'pointer' }}>
                        Keep me signed in on this device
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={activeTab === 'login' ? loginForm.processing : signupForm.processing}
                      style={{
                        backgroundColor: 'var(--color-primary)',
                        color: '#FFFFFF',
                        padding: '13px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '15px',
                        fontWeight: '700',
                        border: 'none',
                        cursor: (activeTab === 'login' ? loginForm.processing : signupForm.processing) ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        boxShadow: 'var(--shadow-primary)',
                        marginTop: '6px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseOver={(e) => {
                        if (!isSubmitting) e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)';
                      }}
                      onMouseOut={(e) => {
                        if (!isSubmitting) e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                      }}
                    >
                      {(activeTab === 'login' ? loginForm.processing : signupForm.processing) ? (
                        <span>Authenticating...</span>
                      ) : (
                        <>
                          <span>Sign In to Portal</span>
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>

                  </form>
                ) : (
                  /* 3. Sign Up Form */
                  <form onSubmit={handleSignupSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    


                    {/* Name & Phone */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }} className="auth-row-inputs">
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--color-text-main)', marginBottom: '4px' }}>
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="John Smith"
                          value={signupForm.data.fullName}
                          onChange={(e) => signupForm.setData('fullName', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '10px 12px',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--color-border)',
                            fontSize: '13px',
                            outline: 'none'
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--color-text-main)', marginBottom: '4px' }}>
                          UK Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+44 7912 345678"
                          value={signupForm.data.phone}
                          onChange={(e) => signupForm.setData('phone', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '10px 12px',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--color-border)',
                            fontSize: '13px',
                            outline: 'none'
                          }}
                        />
                      </div>
                    </div>

                    {/* Email & Postcode */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }} className="auth-row-inputs">
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--color-text-main)', marginBottom: '4px' }}>
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="john@example.co.uk"
                          value={signupForm.data.email}
                          onChange={(e) => signupForm.setData('email', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '10px 12px',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--color-border)',
                            fontSize: '13px',
                            outline: 'none'
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--color-text-main)', marginBottom: '4px' }}>
                          Liverpool Postcode *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. L23, Crosby"
                          value={signupForm.data.postcode}
                          onChange={(e) => signupForm.setData('postcode', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '10px 12px',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--color-border)',
                            fontSize: '13px',
                            outline: 'none'
                          }}
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--color-text-main)', marginBottom: '4px' }}>
                        Create Password *
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="Minimum 8 characters"
                        value={signupForm.data.password}
                        onChange={(e) => signupForm.setData('password', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--color-border)',
                          fontSize: '13px',
                          outline: 'none'
                        }}
                      />
                    </div>

                    {/* Terms */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="checkbox"
                        id="agree"
                        checked={signupForm.data.agreeTerms}
                        onChange={(e) => signupForm.setData('agreeTerms', e.target.checked)}
                        required
                        style={{ accentColor: 'var(--color-primary)', cursor: 'pointer' }}
                      />
                      <label htmlFor="agree" style={{ fontSize: '12px', color: 'var(--color-text-muted)', cursor: 'pointer' }}>
                        I agree to the Terms of Service & Privacy Policy
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={activeTab === 'login' ? loginForm.processing : signupForm.processing}
                      style={{
                        backgroundColor: 'var(--color-secondary)',
                        color: '#FFFFFF',
                        padding: '13px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '15px',
                        fontWeight: '700',
                        border: 'none',
                        cursor: (activeTab === 'login' ? loginForm.processing : signupForm.processing) ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        boxShadow: '0 8px 20px rgba(242, 101, 34, 0.35)',
                        marginTop: '4px'
                      }}
                    >
                      {(activeTab === 'login' ? loginForm.processing : signupForm.processing) ? (
                        <span>Creating Account...</span>
                      ) : (
                        <>
                          <span>Create Free Account</span>
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>

                  </form>
                )}
              </div>
            )}

          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .auth-grid-box {
            grid-template-columns: 1fr !important;
          }
          .auth-side-banner {
            display: none !important;
          }
          .auth-form-side {
            padding: 36px 24px !important;
          }
        }
        @media (max-width: 600px) {
          .auth-row-inputs {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}



