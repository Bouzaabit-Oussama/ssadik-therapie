import React from 'react';
import { Star, Quote, UserCheck } from 'lucide-react';

export default function Testimonials({ t }) {
  const reviews = t?.testimonials?.reviews || [];

  return (
    <section className="py-20 bg-sand-100/40 relative overflow-hidden scroll-mt-20">
      {/* Background Decor */}
      <div className="absolute top-10 start-10 w-72 h-72 bg-medical-100/30 rounded-full blur-3xl opacity-50 animate-float-slow pointer-events-none"></div>
      <div className="absolute bottom-10 end-10 w-80 h-80 bg-therapy-200/30 rounded-full blur-3xl opacity-50 animate-float-delayed pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-medical-50 border border-medical-200 text-medical-700 font-extrabold text-xs tracking-wide">
            <UserCheck className="w-4 h-4 text-medical-600" />
            <span>{t?.langName === 'Français' ? 'ثقة ومصداقية' : 'Témoignages Vérifiés'}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-therapy-900 tracking-tight">
            {t?.testimonials?.title}
          </h2>
          <p className="text-base md:text-lg text-sand-900/85 font-medium">
            {t?.testimonials?.subtitle}
          </p>
          <div className="w-16 h-1 bg-medical-500 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 border border-sand-200/70 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 relative group hover:-translate-y-1.5"
            >
              {/* Quote Watermark */}
              <Quote className="absolute top-6 end-6 w-10 h-10 text-sand-200/40 pointer-events-none group-hover:text-medical-200/50 transition-colors" />

              <div className="space-y-4 text-start">
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(review.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-sm text-sand-900/85 leading-relaxed font-medium italic">
                  "{review.comment}"
                </p>
              </div>

              {/* Patient Info Footer */}
              <div className="flex items-center gap-4 pt-4 border-t border-sand-100 text-start">
                <div className="w-11 h-11 rounded-full bg-medical-500 text-white font-extrabold flex items-center justify-center text-base shadow-sm">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-extrabold text-therapy-900 text-sm">
                    {review.name}
                  </h4>
                  <span className="text-xs font-semibold text-medical-600">
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
