import React, { useState } from 'react';
import { Play, CheckCircle2, User } from 'lucide-react';

export default function Expertise({ t }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="about" className="py-20 bg-white scroll-mt-20">
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
            <div className="relative aspect-video lg:h-[400px] w-full rounded-2xl overflow-hidden shadow-lg border border-sand-200 bg-sand-900 group">
              {!isPlaying ? (
                <>
                  {/* Video Thumbnail */}
                  <img
                    src="/assets/clinic_room.png"
                    alt={t.expertise.videoLabel}
                    className="w-full h-full object-cover opacity-80"
                  />
                  {/* Overlay play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={() => setIsPlaying(true)}
                      className="bg-medical-500 hover:bg-medical-600 active:bg-medical-700 text-white rounded-full p-5 shadow-2xl transition-all hover:scale-110 focus:outline-none focus:ring-4 focus:ring-medical-200"
                      aria-label="Play video"
                    >
                      <Play className="w-8 h-8 fill-current translate-x-0.5 rtl:-translate-x-0.5" />
                    </button>
                  </div>
                  {/* Video Label */}
                  <div className="absolute bottom-4 start-4 bg-black/60 text-white px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-sm">
                    {t.expertise.videoLabel}
                  </div>
                </>
              ) : (
                /* Embed a friendly placeholder video loop or YouTube iframe */
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                  title="Ssadik Therapie Presentation"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </div>

          {/* Middle Column: Visual Assets Grid (col-span-3) */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-4">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-sm border border-sand-200">
              <img
                src="/assets/hero.png"
                alt="Clinic Tanger View"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden shadow-sm border border-sand-200">
              <img
                src="/assets/acupuncture.png"
                alt="Therapy session"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden shadow-sm border border-sand-200 col-span-2">
              <img
                src="/assets/massage.png"
                alt="Therapy treatment"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Right Column: Therapist Bio Profile (col-span-4) */}
          <div className="lg:col-span-4 bg-sand-50 rounded-2xl p-6 border border-sand-200/60 flex flex-col space-y-6">
            
            {/* Therapist Profile Header */}
            <div className="flex items-center gap-4 text-start">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-medical-500 shadow-md">
                <img
                  src="/assets/therapist.png"
                  alt={t.expertise.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-medical-600 bg-medical-50 px-2 py-1 rounded-md mb-1">
                  <User className="w-3.5 h-3.5" />
                  <span>{t.expertise.physio}</span>
                </span>
                <h3 className="text-lg font-black text-therapy-900 leading-none">
                  {t.expertise.name}
                </h3>
              </div>
            </div>

            {/* Bio Text */}
            <p className="text-sm text-sand-900/75 leading-relaxed font-medium text-start">
              {t.expertise.bio}
            </p>

            {/* Quality Badges */}
            <div className="space-y-2 pt-4 border-t border-sand-200">
              <div className="flex items-center gap-2 text-start text-xs font-bold text-therapy-900">
                <CheckCircle2 className="w-4 h-4 text-medical-500 flex-shrink-0" />
                <span>Certification Nationale & Expérience</span>
              </div>
              <div className="flex items-center gap-2 text-start text-xs font-bold text-therapy-900">
                <CheckCircle2 className="w-4 h-4 text-medical-500 flex-shrink-0" />
                <span>Matériel Stérile et à Usage Unique</span>
              </div>
              <div className="flex items-center gap-2 text-start text-xs font-bold text-therapy-900">
                <CheckCircle2 className="w-4 h-4 text-medical-500 flex-shrink-0" />
                <span>Protocoles Médicaux Personnalisés</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
