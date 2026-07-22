import React, { useState, useEffect, Suspense, lazy } from 'react';
import { translations } from './i18n/translations';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import Services from './components/Services';
import ParallaxSection from './components/ParallaxSection';
import PromoCountdown from './components/PromoCountdown';
import Testimonials from './components/Testimonials';
import Expertise from './components/Expertise';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LeadModal from './components/LeadModal';
import FloatingWhatsApp from './components/FloatingWhatsApp';

const AdminDashboard = lazy(() => import('./components/AdminDashboard'));


// Configurable Webhook URL for Google Sheets.
// You can replace this value with your actual Google Apps Script Webhook URL.
const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycby-YOUR-WEBHOOK-ID/exec';
window.GOOGLE_SHEET_URL = GOOGLE_SHEET_URL;

export default function App() {
  // Arabe is the default locale (RTL) as requested.
  const [lang, setLang] = useState('ar');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalService, setModalService] = useState('General');

  // Sync document language attributes for accessibility and RTL rendering
  useEffect(() => {
    const currentTranslation = translations[lang];
    document.documentElement.lang = lang;
    document.documentElement.dir = currentTranslation.dir;
  }, [lang]);

  // URL query parameter detector: opens the modal automatically if URL contains "?action=reserve"
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('action') === 'reserve') {
      // Small delay to ensure smooth rendering/loading animations
      const timer = setTimeout(() => {
        handleOpenModal('General');
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  // Smooth Scroll Reveal Observer for fluid page animations
  useEffect(() => {
    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    };

    const observerOptions = {
      threshold: 0.05,
      rootMargin: '0px 0px -30px 0px',
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const targets = document.querySelectorAll('.reveal-on-scroll');

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, [lang]);

  const handleOpenModal = (serviceName = 'General') => {
    setModalService(serviceName);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const t = translations[lang];

  // Render Admin Dashboard if visiting /admin route
  if (window.location.pathname === '/admin') {
    return (
      <Suspense fallback={
        <div className="min-h-screen bg-sand-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-600"></div>
        </div>
      }>
        <AdminDashboard lang={lang} setLang={setLang} t={t} />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-sand-50 text-sand-900 overflow-x-clip">
      {/* Navbar + Top promo bar */}
      <Header lang={lang} setLang={setLang} t={t} onOpenModal={handleOpenModal} />

      {/* Main Page Content */}
      <main>
        {/* Hero Section */}
        <Hero t={t} onOpenModal={handleOpenModal} />

        {/* Medical Trust & Reassurance Bar */}
        <div className="reveal-on-scroll">
          <TrustBar t={t} />
        </div>

        {/* 4 Services grid */}
        <div className="reveal-on-scroll">
          <Services t={t} onOpenModal={handleOpenModal} />
        </div>

        {/* Parallax ambient section with glassmorphism statistics */}
        <div className="reveal-on-scroll">
          <ParallaxSection t={t} onOpenModal={handleOpenModal} />
        </div>

        {/* Countdown promo pack */}
        <div className="reveal-on-scroll">
          <PromoCountdown t={t} onOpenModal={handleOpenModal} />
        </div>

        {/* Patient Testimonials & Social Proof */}
        <div className="reveal-on-scroll">
          <Testimonials t={t} />
        </div>

        {/* Presentation and clinic expertise */}
        <div className="reveal-on-scroll">
          <Expertise t={t} />
        </div>

        {/* Interactive FAQ Accordion */}
        <div className="reveal-on-scroll">
          <FAQ t={t} />
        </div>

        {/* Contact details, form and map location */}
        <div className="reveal-on-scroll">
          <Contact t={t} onOpenModal={handleOpenModal} />
        </div>
      </main>

      {/* Footer info & socials */}
      <Footer t={t} onOpenModal={handleOpenModal} />

      {/* Lead Generation modal */}
      <LeadModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        defaultService={modalService}
        t={t}
      />

      {/* Floating WhatsApp Action Widget */}
      <FloatingWhatsApp t={t} />
    </div>
  );
}
