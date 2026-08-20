import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle, AlertCircle, Loader2, PhoneCall, ChevronDown } from 'lucide-react';
import { saveLead } from '../firebase';

const serviceCategories = [
  {
    label: "💎 الباقات والعروض المدمجة / Packs",
    options: [
      { value: "Massage + Hijama Dos (250 DH)", label: "مساج + حجامة ظهر (250 DH)" },
      { value: "Massage + Hijama + Chiropraxie (400 DH)", label: "مساج + حجامة + كيروبراكتيك (400 DH)" },
      { value: "Massage + Hijama Complète (400 DH)", label: "مساج + حجامة كاملة (400 DH)" },
      { value: "Pack VIP Massage + Hijama Complète + Chiro (500 DH)", label: "Pack VIP: مساج + حجامة كاملة + كيروبراكتيك (500 DH)" },
    ]
  },
  {
    label: "💆‍♂️ المساج والتدليك / Massages",
    options: [
      { value: "Massage Relaxant (300 DH)", label: "مساج استرخائي (300 DH)" },
      { value: "Massage Tonic (400 DH)", label: "مساج Tonic (400 DH)" },
      { value: "Massage aux Pierres Chaudes (300 DH)", label: "مساج بالأحجار الساخنة (300 DH)" },
      { value: "Massage Crânien & Visage (300 DH)", label: "مساج الوجه و الرأس (300 DH)" },
      { value: "Réflexologie (300 DH)", label: "ريفلوكسولوجي (300 DH)" },
      { value: "Massage Thaïlandais (500 DH)", label: "مساج تيلاندي (500 DH)" },
      { value: "Massage Sportif (500 DH)", label: "مساج رياضي (500 DH)" },
    ]
  },
  {
    label: "🩺 الجلسات العلاجية / Séances",
    options: [
      { value: "Hijama Thérapeutique (200 DH)", label: "حجامة علاجية (200 DH)" },
      { value: "Hijama Sportive Dos (250 DH)", label: "حجامة رياضية للظهر (250 DH)" },
      { value: "Hijama Complète (300 DH)", label: "حجامة كاملة (300 DH)" },
      { value: "Séance Chiropraxie (300 DH)", label: "حصة كيروبراكتيك (300 DH)" },
      { value: "Séance Ostéopathie (400 DH)", label: "حصة أوستيوباتي (400 DH)" },
      { value: "Acupuncture Chinoise (250 DH)", label: "أبر صينية (250 DH)" },
    ]
  },
  {
    label: "🏖️ العلاجات وحمام الرمل / Cures",
    options: [
      { value: "Hammam de Sable avec Massage (800 DH)", label: "حمام الرمل مع مساج (800 DH)" },
      { value: "Cure 3 Jours (1950 DH)", label: "ثلاث حصص يومية (1950 DH)" },
      { value: "Cure 5 Jours (2950 DH)", label: "خمس حصص يومية (2950 DH)" },
    ]
  }
];

export default function LeadModal({ isOpen, onClose, defaultService, t }) {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [service, setService] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update selected service whenever defaultService prop changes
  useEffect(() => {
    if (defaultService) {
      if (defaultService === 'General') {
        setService('');
      } else {
        setService(defaultService);
      }
    }
  }, [defaultService, isOpen]);

  // Clean form values on modal close
  useEffect(() => {
    if (!isOpen) {
      setName('');
      setWhatsapp('');
      setStatus('idle');
      setErrorMessage('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const GOOGLE_SHEET_URL = window.GOOGLE_SHEET_URL || '';

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validation for Name
    if (!name.trim()) {
      setErrorMessage(t.modal.validationName);
      setStatus('error');
      return;
    }

    // 2. Validation for WhatsApp (Moroccan numbers: 06, 07, +2126, +2127)
    let whatsappClean = whatsapp.trim().replace(/\s+/g, '');
    if (whatsappClean.startsWith('00212')) {
      whatsappClean = '+212' + whatsappClean.slice(5);
    }
    const moroccanPhoneRegex = /^(?:\+212|0)[67]\d{8}$/;
    
    if (!moroccanPhoneRegex.test(whatsappClean)) {
      setErrorMessage(t.modal.validationPhone);
      setStatus('error');
      return;
    }

    // 3. Validation for Service selection
    if (!service) {
      setErrorMessage(t.modal.validationService);
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const leadPayload = {
        name: name.trim(),
        whatsapp: whatsappClean,
        service: service,
        date: new Date().toISOString(),
        userAgent: navigator.userAgent,
        source: 'Lead Modal',
        status: 'Pending'
      };

      // Concurrently save to Firestore and post to Google Sheets
      const firestorePromise = saveLead(leadPayload);
      
      let sheetsPromise = Promise.resolve();
      if (GOOGLE_SHEET_URL && !GOOGLE_SHEET_URL.includes('YOUR-WEBHOOK-ID')) {
        sheetsPromise = fetch(GOOGLE_SHEET_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...leadPayload,
            date: new Date().toLocaleString()
          }),
        }).catch(err => {
          console.error("Google Sheets webhook error:", err);
          // Do not fail the user submission if Google Sheets fails but Firestore succeeds
        });
      } else {
        // Fallback POST if URL is not configured or is demo
        sheetsPromise = fetch(GOOGLE_SHEET_URL || 'https://httpbin.org/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...leadPayload,
            date: new Date().toLocaleString()
          }),
        }).catch(err => console.error("Demo post error:", err));
      }

      await Promise.all([firestorePromise, sheetsPromise]);

      setStatus('success');
      // Close modal after 2.5 seconds success state
      setTimeout(() => {
        onClose();
      }, 2500);
    } catch (err) {
      console.error('Error posting lead data:', err);
      setStatus('error');
      setErrorMessage(t.modal.error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
      ></div>

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-marble-card rounded-3xl border-2 border-amber-400/50 shadow-2xl overflow-visible p-6 md:p-8 animate-slide-up z-10">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 end-4 p-2 rounded-full text-sand-900/50 hover:text-sand-900 hover:bg-amber-100/60 transition-all focus:outline-none"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-start space-y-2 mb-6 pe-6">
          <div className="flex items-center gap-2 mb-1">
            <img src="/assets/logo centre ssadik-No background.webp" alt="Logo" className="w-9 h-9 rounded-lg border border-amber-400/50 object-contain shadow-sm bg-white p-0.5" />
            <span className="text-xs font-black text-amber-700 uppercase tracking-widest">Cabinet SSADIK</span>
          </div>
          <h3 className="text-xl md:text-2xl font-black text-therapy-900 flex items-center gap-2">
            <PhoneCall className="w-5 h-5 text-amber-600" />
            <span>{t.modal.title}</span>
          </h3>
          <p className="text-xs md:text-sm text-sand-900/70 leading-relaxed font-semibold">
            {t.modal.subtitle}
          </p>
        </div>

        {/* Modal Body Form */}
        {status === 'success' ? (
          <div className="flex flex-col items-center justify-center py-10 space-y-4 text-center">
            <div className="bg-green-50 text-green-600 p-4 rounded-full border-2 border-green-200 shadow-inner">
              <CheckCircle className="w-12 h-12" />
            </div>
            <h4 className="text-lg font-bold text-green-800">
              {t.modal.success}
            </h4>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 text-start">
            {/* Input Name */}
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="lead-name" className="text-xs md:text-sm font-bold text-therapy-900">
                {t.modal.labelName} *
              </label>
              <input
                id="lead-name"
                type="text"
                required
                placeholder={t.contact.namePlaceholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-medical-500 font-medium bg-sand-50/50 text-sm text-sand-900"
              />
            </div>

            {/* Input WhatsApp */}
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="lead-whatsapp" className="text-xs md:text-sm font-bold text-therapy-900">
                {t.modal.labelWhatsapp} *
              </label>
              <input
                id="lead-whatsapp"
                type="tel"
                required
                placeholder="0612345678"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-medical-500 font-medium bg-sand-50/50 text-sm text-sand-900 text-start dir-ltr"
              />
            </div>

            {/* Input Service Selection (Custom Dropdown) */}
            <div className="flex flex-col space-y-1.5 relative" ref={dropdownRef}>
              <label className="text-xs md:text-sm font-bold text-therapy-900">
                {t.modal.labelService} *
              </label>
              <div 
                className={`w-full px-4 py-3 rounded-xl border ${isDropdownOpen ? 'border-medical-500 ring-2 ring-medical-500/20' : 'border-sand-200'} cursor-pointer flex justify-between items-center bg-sand-50/50 text-sm font-medium transition-all hover:border-medical-400`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className={service ? "text-sand-900 truncate" : "text-sand-900/50 truncate"}>
                  {service ? (serviceCategories.flatMap(c => c.options).find(o => o.value === service)?.label || service) : t.contact.selectService}
                </span>
                <ChevronDown className={`w-4 h-4 text-sand-900/50 transition-transform duration-300 flex-shrink-0 ${isDropdownOpen ? 'rotate-180 text-medical-600' : ''}`} />
              </div>

              {/* Custom Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute bottom-[100%] start-0 w-full mb-2 bg-white border border-sand-200 shadow-xl rounded-xl z-50 max-h-[240px] overflow-y-auto animate-dropdown-popup custom-scrollbar">
                  {/* Unlisted/Dynamic Service (if passed via props and not in list) */}
                  {service && !serviceCategories.some(cat => cat.options.some(opt => opt.value === service)) && (
                    <div 
                      className="px-4 py-3 text-sm font-medium text-medical-700 bg-medical-50 hover:bg-medical-100 cursor-pointer border-b border-sand-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      {service} (Sélectionné)
                    </div>
                  )}

                  {/* Categories */}
                  {serviceCategories.map((category, idx) => (
                    <div key={idx} className="border-b border-sand-100/50 last:border-b-0 pb-1">
                      <div className="sticky top-0 bg-sand-50/95 backdrop-blur-sm px-4 py-2 text-xs font-black text-therapy-900 uppercase tracking-wider z-10 border-y border-sand-200/50 mt-1 first:mt-0 first:border-t-0">
                        {category.label}
                      </div>
                      <div className="flex flex-col py-1">
                        {category.options.map((option, optIdx) => (
                          <div
                            key={optIdx}
                            className={`px-4 py-2.5 text-sm font-semibold cursor-pointer transition-all duration-200 active:scale-[0.98] active:bg-medical-100 ${
                              service === option.value 
                                ? 'bg-medical-50 text-medical-700 border-s-4 border-medical-500' 
                                : 'text-sand-800 hover:bg-sand-50 hover:text-medical-600 border-s-4 border-transparent'
                            }`}
                            onClick={() => {
                              setService(option.value);
                              setTimeout(() => setIsDropdownOpen(false), 150);
                            }}
                          >
                            {option.label}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Error Message */}
            {status === 'error' && (
              <div className="flex items-center gap-2 text-red-700 bg-red-50 border border-red-200 p-4 rounded-xl text-xs font-bold leading-relaxed">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="order-2 sm:order-1 w-full sm:w-1/3 bg-sand-100 hover:bg-sand-200 text-sand-900 font-bold py-3 px-4 rounded-xl transition-all text-sm border border-sand-200"
              >
                {t.modal.btnClose}
              </button>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="relative overflow-hidden order-1 sm:order-2 w-full sm:w-2/3 flex items-center justify-center gap-2 bg-medical-500 hover:bg-medical-600 active:bg-medical-700 disabled:bg-medical-300 text-white font-extrabold py-3 px-4 rounded-xl shadow-md transition-all text-sm group"
              >
                {/* Liquid Shine Reflection Sweep */}
                <span className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] animate-btn-shine pointer-events-none"></span>

                {status === 'loading' ? (
                  <>
                    <Loader2 className="relative z-10 w-4 h-4 animate-spin" />
                    <span className="relative z-10">{t.modal.sending}</span>
                  </>
                ) : (
                  <span className="relative z-10">{t.modal.btnSubmit}</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
