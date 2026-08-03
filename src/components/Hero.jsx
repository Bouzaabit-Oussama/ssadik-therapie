import React, { useEffect, useRef } from 'react';
import { CalendarRange, Sparkles, MapPin } from 'lucide-react';

export default function Hero({ t, onOpenModal }) {
  const bgRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const updateZoom = () => {
      if (bgRef.current) {
        const scrollY = window.scrollY;
        const zoomScale = 1 + Math.min(scrollY * 0.0008, 0.45);
        bgRef.current.style.transform = `scale3d(${zoomScale}, ${zoomScale}, 1)`;
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateZoom);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial sync
    updateZoom();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="home" 
      className="relative w-full overflow-hidden py-12 md:py-24"
    >
      {/* 🖼️ 60FPS GPU-ACCELERATED SCROLL-DRIVEN ZOOM-IN BACKGROUND (clinic_room.png) */}
      <div 
        ref={bgRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          willChange: 'transform',
          transform: 'scale3d(1, 1, 1)',
          transformOrigin: 'center center',
        }}
      >
        <img
          src="/assets/clinic_room.png"
          alt="Clinic Room Background"
          className="w-full h-full object-cover opacity-70 filter blur-[1.5px] contrast-105 brightness-105"
        />
      </div>

      {/* Glassmorphism Gradient Overlay for High Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-sand-50/40 via-transparent to-sand-50/50 pointer-events-none"></div>

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

          {/* Hero Visual Column with Omnidirectional Dark Shadow */}
          <div className="md:col-span-5 relative w-full h-[340px] sm:h-[420px] md:h-[470px] rounded-3xl overflow-hidden shadow-[0_0_35px_rgba(0,0,0,0.55)] md:shadow-[0_0_45px_rgba(0,0,0,0.65)] hover:shadow-[0_0_55px_rgba(0,0,0,0.75)] transition-shadow duration-500 bg-marble-card group">
            {/* Real Hero Image: Dr. Sadik performing therapy */}
            <img
              src="/assets/dr_sadik_acupuncture.jpg"
              alt="Dr. Sadik - Consultation & Thérapie à Tanger"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="eager"
            />
            {/* Soft Ambient Inner Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none"></div>
          </div>

        </div>
      </div>
    </section>
  );
}
