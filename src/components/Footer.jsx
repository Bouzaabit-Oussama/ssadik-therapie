import React from 'react';
import { MapPin, Phone, Instagram, Facebook, Calendar, MessageSquare } from 'lucide-react';

export default function Footer({ t, onOpenModal }) {
  const footerLinks = [
    { name: t.nav.home, href: '#home' },
    { name: t.nav.services, href: '#services' },
    { name: t.nav.specialties, href: '#specialties' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.contact, href: '#contact' },
  ];

  return (
    <footer className="bg-white border-t border-sand-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-8 border-b border-sand-100">
          
          {/* Logo & Slogan (col-span-4) */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-start space-y-3">
            <div className="flex items-center gap-2">
              <img 
                src="/assets/logo.png" 
                alt="Ssadik Thérapie Logo" 
                className="h-12 w-12 object-contain rounded-full shadow-sm"
              />
              <div className="flex flex-col text-start">
                <span className="font-sans font-extrabold text-lg leading-none text-therapy-900 tracking-tight">SSADIK</span>
                <span className="font-sans font-semibold text-[10px] tracking-wider text-medical-600">THÉRAPIE</span>
              </div>
            </div>
          </div>

          {/* Quick Links (col-span-5) */}
          <div className="md:col-span-5 flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={`footer-${link.href}`}
                href={link.href}
                className="text-sm font-semibold text-sand-900/70 hover:text-medical-600 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Action CTA Button (col-span-3) */}
          <div className="md:col-span-3 flex justify-center md:justify-end">
            <button
              onClick={() => onOpenModal('General')}
              className="flex items-center gap-2 bg-medical-500 hover:bg-medical-600 text-white font-bold px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all text-sm"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.nav.cta}</span>
            </button>
          </div>

        </div>

        {/* Bottom Contact Details & Socials Layout */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Contacts Data Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-row md:flex-wrap items-center gap-6 text-xs font-semibold text-sand-900/70">
            
            {/* Address */}
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <MapPin className="w-4 h-4 text-medical-600 flex-shrink-0" />
              <span>{t.contact.addressText}</span>
            </div>

            {/* Phone */}
            <a
              href="tel:+212712500809"
              className="flex items-center gap-2 justify-center md:justify-start hover:text-medical-600 transition-colors"
            >
              <Phone className="w-4 h-4 text-medical-600 flex-shrink-0" />
              <span className="dir-ltr">+212 7 12500809</span>
            </a>

            {/* Appointment link */}
            <button
              onClick={() => onOpenModal('General')}
              className="flex items-center gap-2 justify-center md:justify-start hover:text-medical-600 transition-colors underline"
            >
              <Calendar className="w-4 h-4 text-medical-600 flex-shrink-0" />
              <span>{t.contact.emailText}</span>
            </button>

          </div>

          {/* Social Media Link Icons */}
          <div className="flex items-center gap-4">
            {/* Instagram */}
            <a
              href="https://instagram.com/p.mohamedssadik"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full border border-sand-200 hover:border-pink-300 hover:bg-pink-50 hover:text-pink-600 text-sand-900/60 transition-all"
              aria-label="Instagram Profile"
            >
              <Instagram className="w-5 h-5" />
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/212712500809"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full border border-sand-200 hover:border-green-300 hover:bg-green-50 hover:text-green-600 text-sand-900/60 transition-all"
              aria-label="WhatsApp Chat"
            >
              <MessageSquare className="w-5 h-5" />
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com/ssadik.therapie"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full border border-sand-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 text-sand-900/60 transition-all"
              aria-label="Facebook Page"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </div>

        </div>

        {/* Copyright notice */}
        <div className="mt-8 pt-8 border-t border-sand-100/50 text-center text-xs text-sand-900/40 font-semibold">
          <p>{t.footer.rights}</p>
        </div>

      </div>
    </footer>
  );
}
