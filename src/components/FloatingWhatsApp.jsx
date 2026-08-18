import React, { useState, useEffect } from 'react';

export default function FloatingWhatsApp({ t }) {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Initial expansion after 1.5s
    const initialTimer = setTimeout(() => {
      setIsExpanded(true);
      setTimeout(() => setIsExpanded(false), 4500);
    }, 1500);

    // Repeat expansion cycle every 30 seconds
    const interval = setInterval(() => {
      setIsExpanded(true);
      setTimeout(() => {
        setIsExpanded(false);
      }, 4500); // Stays visible for 4.5s
    }, 30000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  const whatsappNumber = "212661508910";
  const message = encodeURIComponent(
    t?.dir === 'rtl'
      ? 'السلام عليكم، أرغب في الاستفسار وحجز موعد في عيادة صادق للعلاج الطبيعي بطنجة.'
      : 'Bonjour, je souhaite réserver une consultation ou avoir des informations chez Ssadik Thérapie Tanger.'
  );

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3 select-none flex-row-reverse rtl:flex-row">
      
      {/* Floating WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center transition-transform duration-300 hover:scale-110 focus:outline-none flex-shrink-0"
        title={t?.floatingWhatsapp?.tooltip || 'WhatsApp'}
      >
        {/* Pulsing ring background */}
        <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-35 pointer-events-none"></span>
        <img 
          src="/assets/whatsapp_logo.webp" 
          alt="WhatsApp" 
          className="w-full h-full object-contain relative z-10 filter drop-shadow-lg"
        />
      </a>

      {/* Tooltip Pill: Extends out to the left side and hides repeatedly */}
      <div 
        className={`transition-all duration-500 ease-in-out overflow-hidden flex items-center ${
          isExpanded 
            ? 'max-w-xs opacity-100 translate-x-0' 
            : 'max-w-0 opacity-0 translate-x-6 pointer-events-none'
        }`}
      >
        <div className="bg-white/95 backdrop-blur-md border border-sand-200 text-therapy-900 text-xs font-extrabold px-3.5 py-2.5 rounded-2xl shadow-xl whitespace-nowrap flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping flex-shrink-0"></span>
          <span>{t?.floatingWhatsapp?.badgeText || (t?.dir === 'rtl' ? 'رد سريع خلال دقائق' : 'Réponse rapide en quelques minutes')}</span>
        </div>
      </div>

    </div>
  );
}
