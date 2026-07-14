import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Loader2, PhoneCall } from 'lucide-react';

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
        // Map keys to match the dropdown value options
        const mapped = ['Hijama', 'Massage', 'Acupuncture', 'Chiropraxie', 'Pack complet'].find(
          (opt) => opt.toLowerCase().includes(defaultService.toLowerCase()) || defaultService.toLowerCase().includes(opt.toLowerCase())
        );
        setService(mapped || '');
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
    const whatsappClean = whatsapp.trim().replace(/\s+/g, '');
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
      // Post form data to the Google Sheet URL webhook
      const response = await fetch(GOOGLE_SHEET_URL || 'https://httpbin.org/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          whatsapp: whatsappClean,
          service: service,
          date: new Date().toLocaleString(),
          userAgent: navigator.userAgent,
          source: 'Lead Modal'
        }),
      });

      if (response.ok) {
        setStatus('success');
        // Close modal after 2.5 seconds success state
        setTimeout(() => {
          onClose();
        }, 2500);
      } else {
        setStatus('error');
        setErrorMessage(t.modal.error);
      }
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
      <div className="relative w-full max-w-lg bg-white rounded-3xl border border-sand-200/50 shadow-2xl overflow-hidden p-6 md:p-8 animate-slide-up z-10">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 end-4 p-2 rounded-full text-sand-900/40 hover:text-sand-900 hover:bg-sand-100 transition-all focus:outline-none"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-start space-y-2 mb-6 pe-6">
          <h3 className="text-xl md:text-2xl font-black text-therapy-900 flex items-center gap-2">
            <PhoneCall className="w-5 h-5 text-medical-500" />
            <span>{t.modal.title}</span>
          </h3>
          <p className="text-xs md:text-sm text-sand-900/60 leading-relaxed font-semibold">
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
                <option value="Hijama">{t.contact.service1}</option>
                <option value="Massage">{t.contact.service2}</option>
                <option value="Acupuncture">{t.contact.service3}</option>
                <option value="Chiropraxie">{t.contact.service4}</option>
                <option value="Pack complet">{t.contact.servicePack}</option>
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
