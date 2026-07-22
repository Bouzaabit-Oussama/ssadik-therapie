import React, { useState, useEffect, Suspense, lazy } from 'react';
import { translations } from './i18n/translations';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import ParallaxSection from './components/ParallaxSection';
import PromoCountdown from './components/PromoCountdown';
import Expertise from './components/Expertise';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LeadModal from './components/LeadModal';

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
    <div className="min-h-screen bg-sand-50 text-sand-900 overflow-x-hidden">
      {/* Navbar + Top promo bar */}
      <Header lang={lang} setLang={setLang} t={t} onOpenModal={handleOpenModal} />

      {/* Hero Section */}
      <main>
        <Hero t={t} onOpenModal={handleOpenModal} />

        {/* 4 Services grid */}
        <Services t={t} onOpenModal={handleOpenModal} />

        {/* Parallax ambient section with glassmorphism statistics */}
        <ParallaxSection t={t} onOpenModal={handleOpenModal} />

        {/* Countdown promo pack */}
        <PromoCountdown t={t} onOpenModal={handleOpenModal} />

        {/* Presentation and clinic expertise */}
        <Expertise t={t} />

        {/* Contact details, form and map location */}
        <Contact t={t} onOpenModal={handleOpenModal} />
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
    </div>
  );
}
