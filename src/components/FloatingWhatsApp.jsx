import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function FloatingWhatsApp({ t }) {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappNumber = "212712500809";
  const message = encodeURIComponent(
    t?.langName === 'Français'
      ? 'السلام عليكم، أرغب في الاستفسار وحجز موعد في عيادة صادق للعلاج الطبيعي بطنجة.'
      : 'Bonjour, je souhaite réserver une consultation ou avoir des informations chez Ssadik Thérapie Tanger.'
  );

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div className="fixed bottom-6 end-6 z-40 flex flex-col items-end group select-none">
      {/* Tooltip Notification */}
      {showTooltip && (
        <div className="mb-2 me-1 bg-white border border-sand-200 text-therapy-900 text-xs font-extrabold px-3.5 py-2 rounded-2xl shadow-xl flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span>{t?.floatingWhatsapp?.badgeText || 'Réponse rapide < 5 min'}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-sand-400 hover:text-sand-600 ms-1"
            aria-label="Fermer la notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-emerald-300"
        title={t?.floatingWhatsapp?.tooltip || 'WhatsApp'}
      >
        {/* Pulsing ring background */}
        <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-30 pointer-events-none"></span>
        <MessageCircle className="w-7 h-7 fill-current relative z-10" />
      </a>
    </div>
  );
}
