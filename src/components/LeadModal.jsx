import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Loader2, PhoneCall } from 'lucide-react';
import { saveLead } from '../firebase';


export default function LeadModal({ isOpen, onClose, defaultService, t }) {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [service, setService] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState('');

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
      <div className="relative w-full max-w-lg bg-marble-card rounded-3xl border-2 border-amber-400/50 shadow-2xl overflow-hidden p-6 md:p-8 animate-slide-up z-10">
        
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
            <img src="/assets/logo centre ssadik-No background.png" alt="Logo" className="w-9 h-9 rounded-lg border border-amber-400/50 object-contain shadow-sm bg-white p-0.5" />
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

            {/* Input Service Selection */}
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="lead-service" className="text-xs md:text-sm font-bold text-therapy-900">
                {t.modal.labelService} *
              </label>
              <select
                id="lead-service"
                required
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-medical-500 font-medium bg-sand-50/50 text-sm text-sand-900"
              >
                <option value="">{t.contact.selectService}</option>
                {/* Dynamically render pre-selected service if not in default list */}
                {service && ![
                  'Massage + Hijama Dos (250 DH)', 'Massage + Hijama + Chiropraxie (400 DH)', 'Massage + Hijama Complète (400 DH)', 'Pack VIP Massage + Hijama Complète + Chiro (500 DH)',
                  'Massage Relaxant (300 DH)', 'Massage Tonic (400 DH)', 'Massage aux Pierres Chaudes (300 DH)', 'Massage Crânien & Visage (300 DH)', 'Réflexologie (300 DH)', 'Massage Thaïlandais (500 DH)', 'Massage Sportif (500 DH)',
                  'Hijama Thérapeutique (200 DH)', 'Hijama Sportive Dos (250 DH)', 'Hijama Complète (300 DH)', 'Séance Chiropraxie (300 DH)', 'Séance Ostéopathie (400 DH)', 'Acupuncture Chinoise (250 DH)',
                  'Hammam de Sable avec Massage (800 DH)', 'Cure 3 Jours (1950 DH)', 'Cure 5 Jours (2950 DH)'
                ].includes(service) && (
                  <option value={service}>{service}</option>
                )}

                <optgroup label="💎 الباقات والعروض المدمجة / Packs">
                  <option value="Massage + Hijama Dos (250 DH)">مساج + حجامة ظهر (250 DH)</option>
                  <option value="Massage + Hijama + Chiropraxie (400 DH)">مساج + حجامة + كيروبراكتيك (400 DH)</option>
                  <option value="Massage + Hijama Complète (400 DH)">مساج + حجامة كاملة (400 DH)</option>
                  <option value="Pack VIP Massage + Hijama Complète + Chiro (500 DH)">Pack VIP: مساج + حجامة كاملة + كيروبراكتيك (500 DH)</option>
                </optgroup>

                <optgroup label="💆‍♂️ المساج والتدليك / Massages">
                  <option value="Massage Relaxant (300 DH)">مساج استرخائي (300 DH)</option>
                  <option value="Massage Tonic (400 DH)">مساج Tonic (400 DH)</option>
                  <option value="Massage aux Pierres Chaudes (300 DH)">مساج بالأحجار الساخنة (300 DH)</option>
                  <option value="Massage Crânien & Visage (300 DH)">مساج الوجه و الرأس (300 DH)</option>
                  <option value="Réflexologie (300 DH)">ريفلوكسولوجي (300 DH)</option>
                  <option value="Massage Thaïlandais (500 DH)">مساج تيلاندي (500 DH)</option>
                  <option value="Massage Sportif (500 DH)">مساج رياضي (500 DH)</option>
                </optgroup>

                <optgroup label="🩺 الجلسات العلاجية / Séances">
                  <option value="Hijama Thérapeutique (200 DH)">حجامة علاجية (200 DH)</option>
                  <option value="Hijama Sportive Dos (250 DH)">حجامة رياضية للظهر (250 DH)</option>
                  <option value="Hijama Complète (300 DH)">حجامة كاملة (300 DH)</option>
                  <option value="Séance Chiropraxie (300 DH)">حصة كيروبراكتيك (300 DH)</option>
                  <option value="Séance Ostéopathie (400 DH)">حصة أوستيوباتي (400 DH)</option>
                  <option value="Acupuncture Chinoise (250 DH)">أبر صينية (250 DH)</option>
                </optgroup>

                <optgroup label="🏖️ العلاجات وحمام الرمل / Cures">
                  <option value="Hammam de Sable avec Massage (800 DH)">حمام الرمل مع مساج (800 DH)</option>
                  <option value="Cure 3 Jours (1950 DH)">ثلاث حصص يومية (1950 DH)</option>
                  <option value="Cure 5 Jours (2950 DH)">خمس حصص يومية (2950 DH)</option>
                </optgroup>
              </select>
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
                className="order-1 sm:order-2 w-full sm:w-2/3 flex items-center justify-center gap-2 bg-medical-500 hover:bg-medical-600 active:bg-medical-700 disabled:bg-medical-300 text-white font-extrabold py-3 px-4 rounded-xl shadow-md transition-all text-sm"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{t.modal.sending}</span>
                  </>
                ) : (
                  <span>{t.modal.btnSubmit}</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
