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
    <section className="w-full bg-white border-y border-sand-200/60 py-6 shadow-xs relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="flex items-center gap-4 text-start p-3 rounded-2xl hover:bg-sand-50/60 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-medical-50 border border-medical-200 text-medical-600 flex items-center justify-center flex-shrink-0 shadow-xs">
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
