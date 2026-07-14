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
    <section className="my-12 max-w-5xl mx-auto px-4">
      {/* Banner Container */}
      <div className="relative overflow-hidden bg-gradient-to-r from-therapy-100 to-sand-200 border border-therapy-200/60 rounded-3xl p-8 md:p-12 shadow-md flex flex-col items-center text-center space-y-6 md:space-y-8 animate-pulse-soft">
        
        {/* Decorative Circles */}
        <div className="absolute top-0 start-0 w-24 h-24 bg-white/20 rounded-full translate-x-[-30%] translate-y-[-30%]"></div>
        <div className="absolute bottom-0 end-0 w-36 h-36 bg-therapy-800/5 rounded-full translate-x-[30%] translate-y-[30%]"></div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 font-bold text-xs md:text-sm tracking-wide">
          <Flame className="w-4 h-4 fill-orange-500 text-orange-600 animate-bounce" />
          <span>{t.promo.badge}</span>
        </div>

        {/* Offer Description */}
        <div className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-extrabold text-therapy-900">
            {t.promo.title}
          </h2>
          <p className="text-lg md:text-xl font-bold text-medical-600">
            {t.promo.subtitle} <span className="text-sand-900/40 text-sm font-normal line-through ms-2">{t.promo.priceOriginal}</span>
          </p>
        </div>

        {/* Countdown Timer Grid */}
        <div className="flex items-center justify-center gap-4 md:gap-6 dir-ltr select-none">
          {timerItems.map((item, idx) => (
            <React.Fragment key={item.label}>
              <div className="flex flex-col items-center">
                <div className="bg-white text-therapy-900 border border-sand-200 font-sans font-black text-2xl md:text-3xl w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-xl shadow-sm">
                  {item.value}
                </div>
                <span className="text-xs font-bold text-therapy-800/80 mt-2">
                  {item.label}
                </span>
              </div>
              {idx < timerItems.length - 1 && (
                <span className="text-therapy-800/60 font-black text-2xl mb-6">:</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* CTA Button */}
        <div>
          <button
            onClick={() => onOpenModal('Pack complet (180 Dh)')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-medical-500 hover:bg-medical-600 text-white font-extrabold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-base"
          >
            <Percent className="w-5 h-5" />
            <span>{t.promo.cta}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
