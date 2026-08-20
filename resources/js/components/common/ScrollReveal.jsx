import React, { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({
  children,
  animation = 'fade-up', // 'fade-up', 'fade-in', 'fade-left', 'fade-right', 'zoom-in'
  delay = 0, // delay in ms
  duration = 600, // duration in ms
  className = '',
  style = {},
  threshold = 0.02
}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const currentElem = elementRef.current;
    if (!currentElem) return;

    // Check if already in viewport on initial mount
    const rect = currentElem.getBoundingClientRect();
    if (rect.top < window.innerHeight + 100 && rect.bottom > -100) {
      setIsVisible(true);
      return;
    }

    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.02,
          rootMargin: '100px 0px 100px 0px'
        }
      );

      observer.observe(currentElem);

      // Fallback timeout to guarantee visibility
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 800);

      return () => {
        observer.unobserve(currentElem);
        clearTimeout(timer);
      };
    } else {
      // Fallback for browsers without IntersectionObserver
      setIsVisible(true);
    }
  }, []);

  const getAnimationStyles = () => {
    const baseTransition = `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`;

    switch (animation) {
      case 'fade-up':
        return {
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(35px)',
          transition: baseTransition
        };
      case 'fade-left':
        return {
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateX(0)' : 'translateX(-35px)',
          transition: baseTransition
        };
      case 'fade-right':
        return {
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateX(0)' : 'translateX(35px)',
          transition: baseTransition
        };
      case 'zoom-in':
        return {
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.92)',
          transition: baseTransition
        };
      case 'fade-in':
      default:
        return {
          opacity: isVisible ? 1 : 0,
          transition: baseTransition
        };
    }
  };

  return (
    <div
      ref={elementRef}
      className={`scroll-reveal-container ${className}`}
      style={{
        ...getAnimationStyles(),
        ...style
      }}
    >
      {children}
    </div>
  );
}
