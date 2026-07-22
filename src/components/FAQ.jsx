import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQ({ t }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const faqItems = t?.faq?.items || [];

  return (
    <section id="faq" className="py-20 bg-white scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-medical-50 border border-medical-200 text-medical-700 font-extrabold text-xs tracking-wide">
            <HelpCircle className="w-4 h-4 text-medical-600" />
            <span>{t?.langName === 'Français' ? 'أسئلة وأجوبة' : 'Questions Fréquentes'}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-therapy-900 tracking-tight">
            {t?.faq?.title}
          </h2>
          <p className="text-base md:text-lg text-sand-900/85 font-medium">
            {t?.faq?.subtitle}
          </p>
          <div className="w-16 h-1 bg-medical-500 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-sand-200/80 rounded-2xl overflow-hidden transition-all duration-200 bg-sand-50/40"
              >
                <button
                  onClick={() => toggleItem(idx)}
                  className="w-full flex items-center justify-between p-5 text-start font-extrabold text-therapy-900 text-base md:text-lg focus:outline-none hover:text-medical-600 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="pe-4">{item.q}</span>
                  <div className={`w-8 h-8 rounded-full bg-white border border-sand-200 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-medical-50 border-medical-300 text-medical-600' : 'text-therapy-700'}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 text-start text-sm md:text-base text-sand-900/85 font-medium leading-relaxed border-t border-sand-200/40 pt-4 bg-white animate-fade-in">
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
