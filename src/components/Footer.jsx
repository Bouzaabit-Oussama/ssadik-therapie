import React from 'react';
import { Phone, Instagram, Facebook, MessageSquare } from 'lucide-react';
import { APP_VERSION } from '../version';

export default function Footer({ t, onOpenModal }) {
  const footerLinks = [
    { name: t.nav.home, href: '#home' },
    { name: t.nav.services, href: '#services' },
    { name: t.nav.specialties, href: '#specialties' },
    { name: t.nav.about, href: '#about' },
  ];

  return (
    <footer className="relative z-10 bg-marble-prominent border-t-2 border-amber-400/60 py-6 md:py-8 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        
        {/* Main Header / Nav Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          
          {/* Brand Logo */}
          <a href="#home" className="flex items-center group">
            <img 
              src="/assets/logo centre ssadik-No background.webp" 
              alt="Logo Ssadik Thérapie" 
              className="h-16 w-auto object-contain drop-shadow-md"
            />
          </a>

          {/* Quick Navigation Links */}
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-7">
            {footerLinks.map((link) => (
              <a
                key={`footer-${link.href}`}
                href={link.href}
                className="text-xs md:text-sm font-extrabold text-sand-900/80 hover:text-medical-600 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Contact Actions & Social Icons */}
          <div className="flex items-center gap-3">
            {/* Phone badge */}
            <a
              href="tel:+212661508910"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sand-50 border border-sand-200 text-xs font-black text-therapy-900 hover:border-medical-400 transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-medical-600" />
              <span dir="ltr" className="inline-block [unicode-bidi:isolate]">+212 661-508910</span>
            </a>

            {/* Social Media Link Icons */}
            <div className="flex items-center gap-1.5">
              <a
                href="https://instagram.com/p.mohamedssadik"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-sand-200 hover:border-pink-300 hover:bg-pink-50 hover:text-pink-600 text-sand-900/70 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/212661508910"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-sand-200 hover:border-green-300 hover:bg-green-50 hover:text-green-600 text-sand-900/70 transition-all"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com/ssadik.therapie"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-sand-200 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-600 text-sand-900/70 transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Strip Row */}
        <div className="relative pt-4 border-t border-sand-100 flex items-center justify-center min-h-[36px]">
          
          {/* Version badge ALWAYS pinned to physical left side */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 dir-ltr">
            <span className="px-2.5 py-0.5 rounded-full bg-sand-100 border border-sand-200 text-[10px] font-extrabold text-therapy-900 shadow-2xs">
              {APP_VERSION}
            </span>
          </div>

          {/* Centered Copyright Text */}
          <p className="text-center text-xs font-semibold text-sand-900/70 px-14">
            {t.footer.rights}
          </p>

        </div>
      </div>
    </footer>
  );
}
