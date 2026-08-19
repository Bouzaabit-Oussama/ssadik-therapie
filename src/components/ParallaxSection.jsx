import React, { useState, useEffect, useRef } from 'react';
import { Users, ShieldCheck, Award, CheckCircle2, Sparkles, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

function Counter({ endValue, duration = 2000, suffix = '', isVisible }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime = null;
    let animationFrameId;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const easeOutProgress = progress * (2 - progress);
      const currentCount = Math.floor(easeOutProgress * endValue);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(endValue);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isVisible, endValue, duration]);

  const formattedCount = count >= 1000 ? count.toLocaleString('fr-FR') : count;

  return (
    <span>
      {formattedCount}{suffix}
    </span>
  );
}

export default function ParallaxSection({ t }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // ⚡ 60FPS Hardware-Accelerated Interactive Parallax & Zoom Listener
  useEffect(() => {
    let ticking = false;

    const updateParallax = () => {
      if (sectionRef.current && bgRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate scroll progress relative to viewport (0 to 1)
        if (rect.top < windowHeight && rect.bottom > 0) {
          const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
          const zoomScale = 1 + scrollProgress * 0.15; // Smooth zoom from 1.0 to 1.15
          const translateY = (scrollProgress - 0.5) * 45; // Smooth 45px parallax shift

          bgRef.current.style.transform = `translate3d(0, ${translateY}px, 0) scale3d(${zoomScale}, ${zoomScale}, 1)`;
        }
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateParallax(); // Initial sync

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    {
      id: 'patients',
      endValue: 5000,
      suffix: '+',
      label: t?.parallax?.stat1 || 'Patients Soignés',
      icon: Users,
    },
    {
      id: 'hygiene',
      endValue: 100,
      suffix: '%',
      label: t?.parallax?.stat2 || 'Matériel Stérile',
      icon: ShieldCheck,
    },
    {
      id: 'specialties',
      endValue: 4,
      suffix: '',
      label: t?.parallax?.stat3 || 'Spécialités Soins',
      icon: Award,
    },
    {
      id: 'satisfaction',
      endValue: 98,
      suffix: '%',
      label: t?.parallax?.stat4 || 'Satisfaction Client',
      icon: CheckCircle2,
    },
  ];

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full py-12 md:py-16 my-8 overflow-hidden select-none bg-marble-card shadow-xl"
    >
      {/* 🖼️ INTERACTIVE SCROLL-REACTIVE BLURRED BACKGROUND IMAGE */}
      <div 
        ref={bgRef}
        className="absolute inset-[-20px] pointer-events-none"
        style={{
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1)',
        }}
      >
        <img
          src="/assets/clinic_room.webp"
          alt="Cabinet Sadik Room"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover opacity-50 filter blur-[3px] contrast-105 brightness-105"
        />
      </div>

      {/* Gradient Readability Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-sand-50/70 via-sand-50/40 to-sand-50/80 pointer-events-none"></div>

      {/* Subtle Bottom Gold Glow Stripe */}
      <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-400/80 to-transparent z-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 font-extrabold text-xs tracking-wide shadow-xs">
            <Eye className="w-4 h-4 text-amber-600" />
            <span>{t?.parallax?.badge || 'جولة داخل المركز'}</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-therapy-900 tracking-tight">
            {t?.parallax?.title || 'بيئة علاجية فاخرة ومجهزة بأحدث التقنيات في طنجة'}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full mt-3"></div>
        </div>

        {/* 📊 ANIMATED STATISTICAL CARDS FLOATING OVER MARBLE BACKDROP */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 items-center">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="flex items-center gap-3.5 p-4 md:p-5 rounded-2xl bg-white/95 backdrop-blur-md shadow-omnidirectional shadow-omnidirectional-hover hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-100/80 text-amber-700 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 shadow-xs">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex flex-col text-start min-w-0">
                  <span className="font-sans font-black text-2xl md:text-3xl text-therapy-900 leading-none tracking-tight">
                    <Counter 
                      endValue={stat.endValue} 
                      suffix={stat.suffix} 
                      duration={2200} 
                      isVisible={isVisible} 
                    />
                  </span>
                  <span className="text-xs font-bold text-sand-900/85 leading-snug mt-1 truncate">
                    {stat.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
