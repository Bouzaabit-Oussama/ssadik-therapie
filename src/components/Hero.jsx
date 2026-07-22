import React from 'react';
import { CalendarRange, Sparkles, MapPin } from 'lucide-react';

export default function Hero({ t, onOpenModal }) {
  return (
    <section 
      id="home" 
      className="relative w-full overflow-hidden bg-fixed bg-cover bg-center py-12 md:py-24"
      style={{ backgroundImage: `url('/assets/hero_bg.png')` }}
    >
      {/* Light Glassmorphism / Contrast Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-sand-50/95 via-sand-50/80 to-sand-100/50 backdrop-blur-[1px]"></div>

      {/* Background Decor Elements */}
      <div className="absolute top-0 start-0 w-80 h-80 bg-medical-200/40 rounded-full filter blur-3xl opacity-60 translate-x-[-20%] translate-y-[-20%] animate-float-slow pointer-events-none"></div>
      <div className="absolute bottom-0 end-0 w-96 h-96 bg-therapy-200/40 rounded-full filter blur-3xl opacity-50 translate-x-[20%] translate-y-[20%] animate-float-delayed pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Hero Content Column (Without white card background) */}
          <div className="md:col-span-7 flex flex-col items-start text-start space-y-6 md:space-y-8">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-medical-200 text-medical-700 font-extrabold text-xs md:text-sm shadow-sm animate-pulse-soft">
              <Sparkles className="w-4 h-4 text-medical-600" />
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-medical-500" />
                Tanger, Maroc
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-therapy-900 leading-tight tracking-tight">
              {t.hero.title}
            </h1>

            {/* Sub-headline / Description */}
            <p className="text-base sm:text-lg text-sand-900/90 leading-relaxed font-semibold max-w-xl">
              {t.hero.subtitle}
            </p>

            {/* CTA Button */}
            <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onOpenModal('General')}
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-medical-500 hover:bg-medical-600 active:bg-medical-700 text-white font-extrabold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-medical-500/30 hover:-translate-y-0.5 transition-all text-base tracking-wide"
              >
                <CalendarRange className="w-5 h-5" />
                <span>{t.hero.cta}</span>
              </button>
            </div>
          </div>

          {/* Hero Visual Column */}
          <div className="md:col-span-5 relative w-full h-[320px] sm:h-[400px] md:h-[450px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-sand-200 group">
            {/* Hero Image */}
            <img
              src="/assets/hero.png"
              alt="Ssadik Thérapie Tanger - Consultation & Massage"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="eager"
            />
            {/* Gradient Overlay for Text Visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-therapy-900/70 via-transparent to-transparent"></div>
            
            {/* Floating Serif text "TANGER" */}
            <div className="absolute bottom-6 inset-x-0 text-center select-none pointer-events-none">
              <h2 className="font-serif text-5xl md:text-6xl text-white font-light tracking-[0.25em] uppercase drop-shadow-lg">
                Tanger
              </h2>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
