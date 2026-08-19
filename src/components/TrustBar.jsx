import React from 'react';
import { Award, ShieldCheck, MapPin, Clock } from 'lucide-react';

export default function TrustBar({ t }) {
  const items = [
    {
      id: 'diploma',
      title: t?.trustBar?.item1Title || 'Praticiens Diplômés',
      sub: t?.trustBar?.item1Sub || 'Expertise médicale à Tanger',
      icon: Award,
    },
    {
      id: 'hygiene',
      title: t?.trustBar?.item2Title || 'Matériel 100% Stérile',
      sub: t?.trustBar?.item2Sub || 'Kits à usage unique garanti',
      icon: ShieldCheck,
    },
    {
      id: 'location',
      title: t?.trustBar?.item3Title || 'Accès & Parking Facile',
      sub: t?.trustBar?.item3Sub || 'Localisation Jirari 2, Tanger',
      icon: MapPin,
    },
    {
      id: 'timing',
      title: t?.trustBar?.item4Title || 'RDV Sans Attente',
      sub: t?.trustBar?.item4Sub || 'Accompagnement personnalisé',
      icon: Clock,
    },
  ];

  return (
    <section className="w-full bg-gradient-to-r from-sand-100/90 via-white to-sand-100/90 py-6 shadow-sm relative z-20 overflow-hidden">
      {/* Subtle Bottom Gold Glow Stripe */}
      <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-400/80 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="flex items-center gap-4 text-start p-4 rounded-2xl bg-marble-card shadow-omnidirectional shadow-omnidirectional-hover hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-100/90 text-amber-800 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex flex-col space-y-0.5">
                  <h4 className="font-extrabold text-therapy-900 text-sm md:text-base leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-xs text-sand-900/80 font-medium">
                    {item.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
