import React from 'react';
import { Play, CheckCircle2, User } from 'lucide-react';

export default function Expertise({ t }) {

  return (
    <section id="about" className="py-20 bg-marble-card scroll-mt-20 relative overflow-hidden">
      {/* Subtle Top & Bottom Gold Glow Stripes */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-400/80 to-transparent"></div>
      <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-400/80 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-therapy-900 tracking-tight">
            {t.expertise.title}
          </h2>
          <div className="w-16 h-1 bg-medical-500 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Video Presentation (col-span-5) */}
          <div className="lg:col-span-5 w-full">
            <div className="relative aspect-video lg:h-[400px] w-full rounded-2xl overflow-hidden shadow-omnidirectional border border-sand-200/80 bg-sand-900 group">
              {/* Video Thumbnail */}
              <img
                src="/assets/clinic_room.png"
                alt={t.expertise.videoLabel}
                className="w-full h-full object-cover opacity-85"
              />
              {/* Decorative Play Icon Badge (Non-clickable / Disabled) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="bg-amber-600/90 text-white rounded-full p-5 shadow-2xl pointer-events-none select-none"
                  aria-label="Video presentation coming soon"
                >
                  <Play className="w-8 h-8 fill-current translate-x-0.5 rtl:-translate-x-0.5" />
                </div>
              </div>
              {/* Video Label */}
              <div className="absolute bottom-4 start-4 bg-black/70 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold backdrop-blur-sm shadow-md">
                {t.expertise.videoLabel}
              </div>
            </div>
          </div>

          {/* Middle Column: Visual Assets Grid (col-span-3) */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-4">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-md border-2 border-amber-400/40">
              <img
                src="/assets/dr_sadik_acupuncture.jpg"
                alt="Dr. Sadik - Consultation Cabinet"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden shadow-md border-2 border-amber-400/40">
              <img
                src="/assets/clinic_room.png"
                alt="Espace Thérapeutique Dédié"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden shadow-md border-2 border-amber-400/40 col-span-2">
              <img
                src="/assets/hijama_equipment_room.jpg"
                alt="Équipement Médical Stérile & Cabinet"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Right Column: Therapist Bio Profile (col-span-4) */}
          <div className="lg:col-span-4 bg-marble-card border-gold-shine rounded-3xl p-6 shadow-lg flex flex-col space-y-6">
            
            {/* Therapist Profile Header */}
            <div className="flex items-center gap-4 text-start">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-500 shadow-md">
                <img
                  src="/assets/dr_sadik_acupuncture.jpg"
                  alt={t.expertise.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-100/80 px-2.5 py-1 rounded-md mb-1 border border-amber-300">
                  <User className="w-3.5 h-3.5 text-amber-600" />
                  <span>{t.expertise.physio}</span>
                </span>
                <h3 className="text-lg font-black text-therapy-900 leading-none">
                  {t.expertise.name}
                </h3>
              </div>
            </div>

            {/* Bio Text */}
            <p className="text-sm text-sand-900/85 leading-relaxed font-medium text-start">
              {t.expertise.bio}
            </p>

            {/* Quality Badges */}
            <div className="space-y-2.5 pt-4 border-t border-amber-200/60">
              <div className="flex items-center gap-2 text-start text-xs font-extrabold text-therapy-900">
                <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>Praticiens Hommes & Femmes Dédiés</span>
              </div>
              <div className="flex items-center gap-2 text-start text-xs font-extrabold text-therapy-900">
                <CheckCircle2 className="w-4 h-4 text-medical-600 flex-shrink-0" />
                <span>Certification Nationale & Expérience Médicale</span>
              </div>
              <div className="flex items-center gap-2 text-start text-xs font-extrabold text-therapy-900">
                <CheckCircle2 className="w-4 h-4 text-medical-600 flex-shrink-0" />
                <span>Matériel Stérile et à Usage Unique</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
