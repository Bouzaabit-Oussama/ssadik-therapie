import React, { useState } from 'react';
import { Menu, X, Calendar, Globe } from 'lucide-react';

export default function Header({ lang, setLang, t, onOpenModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLang(lang === 'ar' ? 'fr' : 'ar');
  };

  const navLinks = [
    { name: t.nav.home, href: '#home' },
    { name: t.nav.services, href: '#services' },
    { name: t.nav.specialties, href: '#specialties' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.contact, href: '#contact' },
  ];

  return (
    <header className="w-full sticky top-0 z-50 shadow-md">
      {/* Top Promotional Bar */}
      <div className="w-full bg-therapy-900 text-sand-50 py-2 px-4 text-center text-xs md:text-sm font-medium transition-all duration-300">
        <span>{t.topbar.text}</span>
        <button 
          onClick={() => onOpenModal(t.promo.title)}
          className="underline hover:text-sand-200 transition-colors focus:outline-none focus:ring-1 focus:ring-sand-200 font-semibold"
        >
          {t.topbar.linkText}
        </button>
      </div>

      {/* Main Navbar */}
      <nav className="w-full bg-white/95 backdrop-blur-md border-b border-sand-200/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <div className="flex items-center gap-3">
              <a href="#home" className="flex items-center gap-2">
                <img 
                  src="/assets/logo.png" 
                  alt="Ssadik Thérapie Logo" 
                  className="h-14 w-14 object-contain rounded-full shadow-sm hover:scale-105 transition-transform"
                />
                <div className="flex flex-col text-start">
                  <span className="font-sans font-extrabold text-xl leading-none text-therapy-900 tracking-tight">SSADIK</span>
                  <span className="font-sans font-semibold text-xs tracking-wider text-medical-600">THÉRAPIE</span>
                </div>
              </a>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sand-900/80 hover:text-medical-600 font-semibold text-sm transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:start-0 after:w-0 after:h-0.5 after:bg-medical-500 hover:after:w-full after:transition-all"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Action Buttons (Language Switcher & CTA) */}
            <div className="hidden md:flex items-center gap-4">
              {/* Language Selector Button */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sand-900/80 hover:text-medical-600 hover:bg-sand-100 font-bold transition-all text-sm border border-sand-200"
                aria-label="Toggle language"
              >
                <Globe className="w-4 h-4" />
                <span>{t.langName}</span>
              </button>

              {/* Prendre RDV Button */}
              <button
                onClick={() => onOpenModal('General')}
                className="flex items-center gap-2 bg-medical-500 hover:bg-medical-600 text-white font-bold px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.nav.cta}</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-3 md:hidden">
              {/* Language Selector Button (Mobile) */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-sand-900/80 hover:bg-sand-100 font-bold transition-all text-xs border border-sand-200"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{t.langName}</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-sand-900/80 hover:bg-sand-100 focus:outline-none transition-all"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-sand-200/50 bg-white/95 backdrop-blur-md animate-fade-in">
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-3 rounded-lg text-base font-semibold text-sand-900 hover:text-medical-600 hover:bg-sand-50 transition-all text-start"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-sand-100">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenModal('General');
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-medical-500 hover:bg-medical-600 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all text-sm"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t.nav.cta}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
