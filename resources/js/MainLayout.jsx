import React, { useState, cloneElement } from 'react';
import Navbar from './components/layout/Navbar';
import MobileDrawer from './components/layout/MobileDrawer';
import MobileStickyBar from './components/layout/MobileStickyBar';
import Footer from './components/layout/Footer';
import QuoteModal from './components/modals/QuoteModal';
import Lightbox from './components/common/Lightbox';
import BackToTop from './components/common/BackToTop';
import { usePage } from '@inertiajs/react';

export default function MainLayout({ children }) {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState(null);
  const [lightboxData, setLightboxData] = useState({ isOpen: false, image: '', title: '', category: '' });

  const { url } = usePage();
  const isDashboard = url.startsWith('/dashboard');

  const handleOpenQuote = (service = null) => { setPreselectedService(service); setIsQuoteOpen(true); };
  const handleSelectService = (service) => { handleOpenQuote(service); };
  const handleOpenLightbox = (project) => { setLightboxData({ isOpen: true, image: project.image, title: project.title, category: project.category }); };
  const handleCloseLightbox = () => { setLightboxData(prev => ({ ...prev, isOpen: false })); };

  return (
    <div className="paintters-app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {!isDashboard && (
        <>
          <Navbar onOpenQuote={handleOpenQuote} onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)} isMobileMenuOpen={isMobileMenuOpen} onOpenLogin={() => {}} />
          <MobileDrawer isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} onOpenQuote={handleOpenQuote} />
        </>
      )}

      <main style={{ flexGrow: 1 }}>
        {cloneElement(children, { onOpenQuote: handleOpenQuote, onSelectService: handleSelectService, onOpenLightbox: handleOpenLightbox })}
      </main>

      {!isDashboard && (
        <>
          <Footer onOpenQuote={handleOpenQuote} />
          <MobileStickyBar onOpenQuote={handleOpenQuote} />
          <BackToTop />
        </>
      )}

      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} preselectedService={preselectedService} />
      <Lightbox isOpen={lightboxData.isOpen} onClose={handleCloseLightbox} image={lightboxData.image} title={lightboxData.title} category={lightboxData.category} />
    </div>
  );
}
