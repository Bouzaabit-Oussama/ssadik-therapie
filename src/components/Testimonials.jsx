import React from 'react';
import { Star, Quote, UserCheck } from 'lucide-react';

export default function Testimonials({ t }) {
  const reviews = t?.testimonials?.reviews || [];
  const isRtl = t?.dir === 'rtl';

  // Duplicate reviews array to guarantee a seamless non-stop infinite loop without jumps
  const loopReviews = [...reviews, ...reviews];

  return (
    <section className="py-12 md:py-16 bg-transparent relative overflow-hidden scroll-mt-20">
      {/* Subtle Bottom Gold Glow Stripe */}
      <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-400/80 to-transparent"></div>

      {/* Background Decor */}
      <div className="absolute top-6 start-10 w-60 h-60 bg-amber-100/30 rounded-full blur-3xl opacity-40 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 px-4 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 font-extrabold text-xs tracking-wide shadow-2xs">
            <UserCheck className="w-3.5 h-3.5 text-amber-600" />
            <span>{t?.langName === 'Français' ? 'Témoignages Vérifiés' : 'ثقة ومصداقية'}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-therapy-900 tracking-tight">
            {t?.testimonials?.title}
          </h2>
          <p className="text-sm md:text-base text-sand-900/85 font-medium">
            {t?.testimonials?.subtitle}
          </p>
          <div className="w-12 h-1 bg-amber-500 mx-auto rounded-full mt-2"></div>
        </div>

        {/* Infinite Carousel Container Wrapper with Pure Alpha Mask Edge Fade */}
        <div className="relative overflow-hidden w-full py-4 mask-edge-fade">
          {/* Marquee Moving Track (Pauses on hover so user can read) */}
          <div className={isRtl ? 'animate-marquee-rtl flex gap-6 px-4' : 'animate-marquee-ltr flex gap-6 px-4'}>
            {loopReviews.map((review, idx) => (
              <div
                key={idx}
                className="w-80 sm:w-96 flex-shrink-0 bg-marble-card rounded-2xl p-5 md:p-6 shadow-omnidirectional shadow-omnidirectional-hover transition-all duration-300 flex flex-col justify-between space-y-4 relative group hover:-translate-y-1 border border-sand-200/80 hover:border-amber-400/60"
              >
                {/* Compact Quote Watermark */}
                <Quote className="absolute top-4 end-4 w-7 h-7 text-sand-200/50 pointer-events-none group-hover:text-amber-200/60 transition-colors" />

                <div className="space-y-3 text-start pe-6">
                  {/* 5-Star Rating */}
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(review.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-xs md:text-sm text-sand-900/85 leading-relaxed font-medium italic">
                    "{review.comment}"
                  </p>
                </div>

                {/* Patient Info Footer */}
                <div className="flex items-center gap-3 pt-3 border-t border-sand-200/50 text-start">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-therapy-950 font-black flex items-center justify-center text-xs shadow-xs flex-shrink-0">
                    {review.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-extrabold text-therapy-900 text-xs md:text-sm leading-tight truncate">
                      {review.name}
                    </h4>
                    <span className="text-[11px] font-bold text-amber-700 block truncate">
                      {review.role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
