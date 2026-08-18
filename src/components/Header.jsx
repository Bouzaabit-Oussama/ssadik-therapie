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
    { name: t.dir === 'rtl' ? 'الأسعار والعروض' : 'Tarifs & Offres', href: '#pricing' },
    { name: t.nav.specialties, href: '#specialties' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.contact, href: '#contact' },
  ];

  return (
    <header className="w-full sticky top-0 z-50 shadow-md">
      {/* Main Navbar with Prominent Calacatta Gold Marble Background */}
      <nav className="w-full bg-marble-prominent border-b-2 border-amber-400/60 shadow-md transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            {/* Logo Section */}
            <div className="flex items-center">
              <a href="#home" className="flex items-center group">
                <img 
                  src="/assets/logo centre ssadik-No background.png" 
                  alt="Cabinet SSADIK - Hijama, Thérapies, Bien-Être" 
                  className="h-16 sm:h-20 md:h-22 w-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md py-1"
                />
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
