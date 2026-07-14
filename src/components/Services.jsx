import React from 'react';
import { ChevronRight, ArrowRight } from 'lucide-react';

export default function Services({ t, onOpenModal }) {
  const servicesList = [
    {
      id: 'hijama',
      title: t.services.hijama.title,
      desc: t.services.hijama.desc,
      image: '/assets/hijama.png',
      badgeIcon: '🩸',
      serviceKey: 'Hijama'
    },
    {
      id: 'massage',
      title: t.services.massage.title,
      desc: t.services.massage.desc,
      image: '/assets/massage.png',
      badgeIcon: '💆',
      serviceKey: 'Massage'
    },
    {
      id: 'acupuncture',
      title: t.services.acupuncture.title,
      desc: t.services.acupuncture.desc,
      image: '/assets/acupuncture.png',
      badgeIcon: '🪡',
      serviceKey: 'Acupuncture'
    },
    {
      id: 'chiropraxie',
      title: t.services.chiro.title,
      desc: t.services.chiro.desc,
      image: '/assets/chiropraxie.png',
      badgeIcon: '🦴',
      serviceKey: 'Chiropraxie'
    }
  ];

  return (
    <section id="services" className="py-20 bg-therapy-50/50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-therapy-900 tracking-tight">
            {t.services.title}
          </h2>
          <p className="text-base md:text-lg text-sand-900/60 font-medium">
            {t.services.subtitle}
          </p>
          <div className="w-16 h-1 bg-medical-500 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesList.map((service, index) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-sand-200/40 p-6 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1.5 group"
            >
              {/* Image Circle Container */}
              <div className="relative w-32 h-32 mb-6">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-therapy-200 shadow-inner">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                {/* Overlapping Mini-Badge Icon */}
                <div className="absolute bottom-0 end-0 bg-white border border-sand-200 shadow-md w-10 h-10 rounded-full flex items-center justify-center text-lg">
                  {service.badgeIcon}
                </div>
              </div>

              {/* Service Title */}
              <h3 className="text-lg font-bold text-therapy-900 mb-3 group-hover:text-medical-600 transition-colors">
                {service.title}
              </h3>

              {/* Service Description */}
              <p className="text-sm text-sand-900/65 leading-relaxed mb-6 flex-grow font-medium">
                {service.desc}
              </p>

              {/* Action Link (En savoir plus) */}
              <button
                onClick={() => onOpenModal(service.serviceKey)}
                className="inline-flex items-center gap-1 text-medical-600 hover:text-medical-700 font-bold text-sm focus:outline-none transition-colors group/btn"
              >
                <span>{t.services.hijama.more.replace(' >', '')}</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 rtl:rotate-180 rtl:group-hover/btn:-translate-x-1" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
