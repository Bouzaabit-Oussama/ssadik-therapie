import React from 'react';
import { CalendarRange, Sparkles } from 'lucide-react';

export default function Hero({ t, onOpenModal }) {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-sand-100/40 via-sand-50 to-white pt-6 pb-16 md:py-24">
      {/* Background Decor Elements */}
      <div className="absolute top-0 start-0 w-72 h-72 bg-medical-100/30 rounded-full filter blur-3xl opacity-60 -z-10 translate-x-[-20%] translate-y-[-20%]"></div>
      <div className="absolute bottom-0 end-0 w-96 h-96 bg-therapy-200/30 rounded-full filter blur-3xl opacity-50 -z-10 translate-x-[20%] translate-y-[20%]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Hero Content Column */}
          <div className="md:col-span-7 flex flex-col items-start text-start space-y-6 md:space-y-8">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-medical-50 border border-medical-200 text-medical-700 font-bold text-xs md:text-sm animate-pulse-soft">
              <Sparkles className="w-4 h-4 text-medical-600" />
              <span>Tanger, Maroc</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-therapy-900 leading-tight tracking-tight">
              {t.hero.title}
            </h1>

            {/* Sub-headline / Description */}
            <p className="text-base sm:text-lg text-sand-900/85 leading-relaxed font-medium max-w-xl">
              {t.hero.subtitle}
            </p>

            {/* CTA Button */}
            <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onOpenModal('General')}
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-medical-500 hover:bg-medical-600 active:bg-medical-700 text-white font-extrabold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-base tracking-wide"
              >
                <CalendarRange className="w-5 h-5" />
                <span>{t.hero.cta}</span>
              </button>
            </div>
          </div>

          {/* Hero Visual Column */}
          <div className="md:col-span-5 relative w-full h-[320px] sm:h-[400px] md:h-[450px] rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-sand-200">
            {/* Hero Image */}
            <img
              src="/assets/hero.png"
              alt="Ssadik Thérapie Tanger - Consultation & Massage"
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
            />
            {/* Gradient Overlay for Text Visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-therapy-900/60 via-transparent to-transparent"></div>
            
            {/* Floating Serif text "TANGER" */}
            <div className="absolute bottom-6 inset-x-0 text-center select-none pointer-events-none">
              <h2 className="font-serif text-5xl md:text-6xl text-white font-light tracking-[0.25em] uppercase drop-shadow-md">
                Tanger
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
