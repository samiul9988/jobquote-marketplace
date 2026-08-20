import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      if (totalScroll > 280) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      if (windowHeight > 0) {
        const progress = Math.min(100, Math.round((totalScroll / windowHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const circumference = 2 * Math.PI * 20;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      style={{
        position: 'fixed',
        bottom: '36px',
        right: '36px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: '#FFFFFF',
        color: 'var(--color-primary)',
        boxShadow: '0 8px 25px rgba(36, 45, 138, 0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 900,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)',
        pointerEvents: isVisible ? 'auto' : 'none',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        border: 'none',
        cursor: 'pointer'
      }}
      className="back-to-top-btn"
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px) scale(1.08)';
        e.currentTarget.style.backgroundColor = 'var(--color-secondary)';
        e.currentTarget.style.color = '#FFFFFF';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.backgroundColor = '#FFFFFF';
        e.currentTarget.style.color = 'var(--color-primary)';
      }}
    >
      {/* Circular Scroll Progress Ring */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          transform: 'rotate(-90deg)',
          pointerEvents: 'none'
        }}
        viewBox="0 0 48 48"
      >
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke="var(--color-border)"
          strokeWidth="3"
          fill="none"
        />
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke="var(--color-secondary)"
          strokeWidth="3"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.15s ease' }}
        />
      </svg>

      <ArrowUp size={20} style={{ position: 'relative', zIndex: 2 }} />

      <style>{`
        @media (max-width: 768px) {
          .back-to-top-btn {
            bottom: 75px !important;
            right: 18px !important;
            width: 44px !important;
            height: 44px !important;
          }
        }
      `}</style>
    </button>
  );
}
