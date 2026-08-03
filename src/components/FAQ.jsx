import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQ({ t }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const faqItems = t?.faq?.items || [];

  return (
    <section id="faq" className="py-20 bg-transparent scroll-mt-20 relative overflow-hidden">
      {/* Subtle Top & Bottom Gold Glow Stripes */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-400/80 to-transparent"></div>
      <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-400/80 to-transparent"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50/90 border border-amber-300 text-amber-800 font-extrabold text-xs tracking-wide shadow-2xs">
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <span>{t?.langName === 'Français' ? 'أسئلة وأجوبة' : 'Questions Fréquentes'}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-therapy-900 tracking-tight">
            {t?.faq?.title}
          </h2>
          <p className="text-base md:text-lg text-sand-900/85 font-medium">
            {t?.faq?.subtitle}
          </p>
          <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-amber-400/50 rounded-2xl overflow-hidden transition-all duration-200 bg-white/80 backdrop-blur-md shadow-xs hover:border-amber-400/90"
              >
                <button
                  onClick={() => toggleItem(idx)}
                  className="w-full flex items-center justify-between p-5 text-start font-extrabold text-therapy-900 text-base md:text-lg focus:outline-none hover:text-amber-700 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="pe-4">{item.q}</span>
                  <div className={`w-8 h-8 rounded-full bg-white border border-amber-300 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-amber-50 border-amber-400 text-amber-700' : 'text-therapy-700'}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 text-start text-sm md:text-base text-sand-900/85 font-medium leading-relaxed border-t border-amber-200/50 pt-4 bg-transparent animate-fade-in">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
