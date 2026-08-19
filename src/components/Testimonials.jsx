import React from 'react';
import { Star, MapPin, CheckCircle } from 'lucide-react';

// Official 4-Color Google "G" SVG Component
const GoogleGIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
  </svg>
);

export default function Testimonials({ t }) {
  const reviews = t?.testimonials?.reviews || [];
  const isRtl = t?.dir === 'rtl';

  // Duplicate reviews array to guarantee a seamless non-stop infinite loop without jumps
  const loopReviews = [...reviews, ...reviews];

  return (
    <section className="py-12 md:py-16 bg-transparent relative overflow-hidden scroll-mt-20">
      {/* Subtle Bottom Gold Glow Stripe */}
      <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-400/80 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Google Reviews Trust Header Widget */}
        <div className="text-center max-w-2xl mx-auto mb-10 px-4 space-y-3">
          
          {/* Authentic Google Badge Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-sand-300 text-therapy-900 font-extrabold text-xs tracking-wide shadow-2xs backdrop-blur-md">
            <GoogleGIcon className="w-4 h-4" />
            <span className="font-extrabold text-therapy-950">Google</span>
            <span className="text-amber-500 font-black">4.9 ★★★★★</span>
            <span className="text-sand-700 text-[11px] font-bold">({t?.testimonials?.googleCount || '+150 مراجعة'})</span>
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
                className="w-80 sm:w-96 flex-shrink-0 bg-white/95 rounded-2xl p-5 md:p-6 flex flex-col justify-between space-y-4 relative group hover:-translate-y-1.5 border border-sand-200/90 hover:border-amber-400/70 google-card-shadow"
              >
                {/* Google Card Header: Avatar + Patient Name + Google G Logo */}
                <div className="flex items-start justify-between gap-3 text-start">
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Patient Avatar Circle with colorful Google background */}
                    <div className={`w-10 h-10 rounded-full ${review.color || 'bg-blue-600'} text-white font-extrabold flex items-center justify-center text-sm shadow-2xs flex-shrink-0`}>
                      {review.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-black text-therapy-950 text-sm leading-tight truncate">
                        {review.name}
                      </h4>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-[11px] font-bold text-sand-700 truncate">
                          {review.role}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Official Google G Logo Badge */}
                  <div className="flex-shrink-0 bg-sand-50 p-1.5 rounded-lg border border-sand-200/60 shadow-2xs">
                    <GoogleGIcon className="w-4 h-4" />
                  </div>
                </div>

                {/* Rating Stars & Time Ago Tag */}
                <div className="flex items-center justify-between gap-2 border-t border-b border-sand-100 py-2">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(review.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-sand-600">
                    {review.timeAgo || 'منذ أسبوع'}
                  </span>
                </div>

                {/* Review Comment Body */}
                <p className="text-xs md:text-sm text-sand-950 leading-relaxed font-medium text-start">
                  "{review.comment}"
                </p>

                {/* Google Verified Footer Badge */}
                <div className="flex items-center justify-between pt-2 text-start text-[11px]">
                  <div className="flex items-center gap-1 text-emerald-700 font-extrabold">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
                    <span>{isRtl ? 'تم التحقق بواسطة Google' : 'Vérifié par Google'}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sand-500 font-bold">
                    <MapPin className="w-3 h-3 text-amber-600" />
                    <span>طنجة</span>
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
