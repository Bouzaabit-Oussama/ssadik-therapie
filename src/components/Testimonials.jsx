import React from 'react';
import { Star, Quote, UserCheck } from 'lucide-react';

export default function Testimonials({ t }) {
  const reviews = t?.testimonials?.reviews || [];

  return (
    <section className="py-10 md:py-12 bg-transparent relative overflow-hidden scroll-mt-20">
      {/* Subtle Bottom Gold Glow Stripe */}
      <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-400/80 to-transparent"></div>

      {/* Background Decor */}
      <div className="absolute top-6 start-10 w-60 h-60 bg-amber-100/30 rounded-full blur-3xl opacity-40 pointer-events-none"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header (Compact Height) */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 font-extrabold text-xs tracking-wide shadow-2xs">
            <UserCheck className="w-3.5 h-3.5 text-amber-600" />
            <span>{t?.langName === 'Français' ? 'ثقة ومصداقية' : 'Témoignages Vérifiés'}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-therapy-900 tracking-tight">
            {t?.testimonials?.title}
          </h2>
          <p className="text-sm md:text-base text-sand-900/85 font-medium">
            {t?.testimonials?.subtitle}
          </p>
          <div className="w-12 h-1 bg-amber-500 mx-auto rounded-full mt-2"></div>
        </div>

        {/* Testimonials Grid (Compact & Reduced Card Sizes) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="bg-marble-card rounded-2xl p-5 md:p-6 shadow-omnidirectional shadow-omnidirectional-hover transition-all duration-300 flex flex-col justify-between space-y-4 relative group hover:-translate-y-1"
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
                <div className="w-9 h-9 rounded-full bg-amber-500 text-white font-extrabold flex items-center justify-center text-xs shadow-xs flex-shrink-0">
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
    </section>
  );
}
