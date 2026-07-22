import React from 'react';
import { Users, ShieldCheck, Award, CheckCircle2, Calendar } from 'lucide-react';

export default function ParallaxSection({ t, onOpenModal }) {
  const stats = [
    {
      id: 'patients',
      number: '5 000+',
      label: t?.parallax?.stat1 || (t?.langName === 'Français' ? 'مرضى تم علاجهم بنجاح' : 'Patients Soignés'),
      icon: Users,
    },
    {
      id: 'hygiene',
      number: '100%',
      label: t?.parallax?.stat2 || (t?.langName === 'Français' ? 'معدات معقمة وحديثة' : 'Matériel Stérile'),
      icon: ShieldCheck,
    },
    {
      id: 'specialties',
      number: '4',
      label: t?.parallax?.stat3 || (t?.langName === 'Français' ? 'تخصصات دقيقة وتكاملية' : 'Spécialités Soins'),
      icon: Award,
    },
    {
      id: 'satisfaction',
      number: '98%',
      label: t?.parallax?.stat4 || (t?.langName === 'Français' ? 'نسبة رضا واستحسان المرضى' : 'Satisfaction Client'),
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="relative w-full py-24 bg-fixed bg-cover bg-center overflow-hidden my-12" style={{ backgroundImage: `url('/assets/parallax_bg.png')` }}>
      {/* Dark Glassmorphism Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-therapy-900/85 via-therapy-900/75 to-therapy-900/85 backdrop-blur-[2px]"></div>

      {/* Dynamic Ambient Glow Orbs */}
      <div className="absolute top-1/4 start-10 w-64 h-64 bg-medical-500/20 rounded-full blur-3xl animate-float-slow pointer-events-none"></div>
      <div className="absolute bottom-1/4 end-10 w-72 h-72 bg-sand-400/20 rounded-full blur-3xl animate-float-delayed pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12 z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-medical-500/20 border border-medical-400/40 text-medical-300 font-extrabold text-xs tracking-widest uppercase">
            {t?.langName === 'Français' ? 'المركز الرائد بالطنجة' : 'Cabinet de Référence à Tanger'}
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            {t?.langName === 'Français' 
              ? 'الخبرة والاحترافية في خدمة صحتك وراحتك' 
              : 'L\'Excellence Médicale au Service de Votre Santé'}
          </h2>
          <p className="text-sand-100/80 text-base md:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
            {t?.langName === 'Français'
              ? 'نوفر لكم أحدث التقنيات وأفضل البروتوكولات العلاجية لضمان تعافي سريع ونتائج ملموسة.'
              : 'Des soins personnalisés combinant kinésithérapie, hijama et médecine douce dans un cadre stérile et apaisant.'}
          </p>
        </div>

        {/* Glassmorphism Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-2xl hover:bg-white/15 hover:scale-105 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-medical-500/30 border border-medical-400/50 text-medical-300 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="font-sans font-black text-3xl md:text-4xl text-white tracking-tight mb-2">
                  {stat.number}
                </span>
                <span className="text-xs md:text-sm font-bold text-sand-200/90 leading-snug">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="pt-4">
          <button
            onClick={() => onOpenModal('General')}
            className="inline-flex items-center gap-3 bg-medical-500 hover:bg-medical-600 active:bg-medical-700 text-white font-extrabold px-8 py-4 rounded-2xl shadow-2xl hover:shadow-medical-500/30 hover:-translate-y-1 transition-all text-base tracking-wide"
          >
            <Calendar className="w-5 h-5" />
            <span>
              {t?.langName === 'Français' ? 'احجز موعدك الآن' : 'Réserver une Consultation'}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
