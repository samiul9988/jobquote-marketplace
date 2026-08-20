import { usePage } from '@inertiajs/react';
import React, { useEffect } from 'react';
import HeroSection from '../components/sections/HeroSection';
import FeaturesBar from '../components/sections/FeaturesBar';
import AboutSection from '../components/sections/AboutSection';
import ServicesSection from '../components/sections/ServicesSection';
import WhyChooseUsSection from '../components/sections/WhyChooseUsSection';
import ProcessSection from '../components/sections/ProcessSection';
import PortfolioSection from '../components/sections/PortfolioSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import ServiceAreaSection from '../components/sections/ServiceAreaSection';
import FaqSection from '../components/sections/FaqSection';
import CtaBannerSection from '../components/sections/CtaBannerSection';

export default function HomePage({ onOpenQuote, onSelectService, onOpenLightbox }) {
  const { heroImages = [], faqs = [] } = usePage().props;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {/* 1. Hero Section */}
      <HeroSection onOpenQuote={onOpenQuote} heroImages={heroImages} />

      {/* 2. 4 Trust Features Bar */}
      <FeaturesBar />

      {/* 3. Introduction / About */}
      <AboutSection onOpenQuote={onOpenQuote} />

      {/* 4. 2 Core Services */}
      <ServicesSection onSelectService={onSelectService} />

      {/* 5. Why Choose Us */}
      <WhyChooseUsSection onOpenQuote={onOpenQuote} />

      {/* 6. 4-Step Process */}
      <ProcessSection />

      {/* 7. Project Gallery Preview */}
      <PortfolioSection onOpenLightbox={onOpenLightbox} />

      {/* 8. Customer Reviews Showcase */}
      <TestimonialsSection onOpenQuote={onOpenQuote} />

      {/* 9. Service Area Liverpool */}
      <ServiceAreaSection onOpenQuote={onOpenQuote} />

      {/* 10. FAQs */}
      <FaqSection onOpenQuote={onOpenQuote} faqs={faqs} />

      {/* 11. Final Conversion CTA Banner */}
      <CtaBannerSection onOpenQuote={onOpenQuote} />
    </div>
  );
}
