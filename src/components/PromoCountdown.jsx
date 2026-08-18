import React, { useState, useEffect } from 'react';
import { Flame, Percent } from 'lucide-react';

export default function PromoCountdown({ t, onOpenModal }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 18,
    minutes: 30,
    seconds: 44
  });

  useEffect(() => {
    // 18 hours, 30 minutes, 44 seconds in milliseconds
    const initialDuration = (18 * 3600 + 30 * 60 + 44) * 1000;
    let targetTime = localStorage.getItem('ssadik_promo_deadline');

    if (!targetTime) {
      targetTime = Date.now() + initialDuration;
      localStorage.setItem('ssadik_promo_deadline', targetTime);
    } else {
      targetTime = parseInt(targetTime, 10);
      // If deadline has passed, reset it to create urgency
      if (targetTime < Date.now()) {
        targetTime = Date.now() + initialDuration;
        localStorage.setItem('ssadik_promo_deadline', targetTime);
      }
    }

    const interval = setInterval(() => {
      const difference = targetTime - Date.now();

      if (difference <= 0) {
        // Reset countdown to maintain marketing urgency
        const newDeadline = Date.now() + initialDuration;
        localStorage.setItem('ssadik_promo_deadline', newDeadline);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Helper to format numbers to 2 digits
  const formatTime = (num) => String(num).padStart(2, '0');

  const timerItems = [
    { label: t.promo.days, value: formatTime(timeLeft.days) },
    { label: t.promo.hours, value: formatTime(timeLeft.hours) },
    { label: t.promo.minutes, value: formatTime(timeLeft.minutes) },
    { label: t.promo.seconds, value: formatTime(timeLeft.seconds) }
  ];

  return (
    <section id="promo" className="my-12 max-w-5xl mx-auto px-4 scroll-mt-24">
      {/* Banner Container with Prominent Marble styling */}
      <div className="relative overflow-hidden bg-marble-prominent rounded-3xl p-8 md:p-12 shadow-omnidirectional shadow-omnidirectional-hover flex flex-col items-center text-center space-y-6 md:space-y-8">
        
        {/* Decorative Ambient Gold Orbs */}
        <div className="absolute top-0 start-0 w-32 h-32 bg-amber-300/20 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-0 end-0 w-44 h-44 bg-amber-400/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 text-amber-800 border border-amber-300/80 font-extrabold text-xs md:text-sm tracking-wide shadow-sm">
          <Flame className="w-4 h-4 fill-amber-500 text-amber-600 animate-bounce" />
          <span>{t.promo.badge}</span>
        </div>

        {/* Offer Description */}
        <div className="space-y-3 max-w-3xl">
          <h2 className="text-2xl md:text-4xl font-black text-therapy-900 leading-tight">
            {t.promo.title}
          </h2>
          <p className="text-lg md:text-xl font-black text-amber-700">
            {t.promo.subtitle}{' '}
            <span className="text-sand-900/60 line-through text-sm md:text-base font-semibold ms-2">
              {t.promo.priceOriginal}
            </span>
          </p>
        </div>

        {/* Countdown Timer Grid */}
        <div className="flex items-center justify-center gap-4 md:gap-6 dir-ltr select-none">
          {timerItems.map((item, idx) => (
            <React.Fragment key={item.label}>
              <div className="flex flex-col items-center">
                <div className="bg-marble-card text-therapy-900 font-sans font-black text-2xl md:text-3xl w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-2xl shadow-md">
                  {item.value}
                </div>
                <span className="text-xs font-black text-amber-900 mt-2">
                  {item.label}
                </span>
              </div>
              {idx < timerItems.length - 1 && (
                <span className="text-amber-600 font-black text-2xl mb-6">:</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* CTA Button */}
        <div>
          <button
            onClick={() => onOpenModal('Pack VIP Massage + Hijama Complète + Chiro (500 DH)')}
            className="relative overflow-hidden w-full sm:w-auto flex items-center justify-center gap-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black px-9 py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all text-base animate-pulse-soft border border-amber-300/40 group"
          >
            {/* Liquid Shine Reflection Sweep */}
            <span className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] animate-btn-shine pointer-events-none"></span>

            <Percent className="relative z-10 w-5 h-5 text-amber-100" />
            <span className="relative z-10">{t.promo.cta}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
