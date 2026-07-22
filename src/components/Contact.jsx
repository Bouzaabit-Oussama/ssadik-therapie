import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { saveLead } from '../firebase';


export default function Contact({ t, onOpenModal }) {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    service: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const GOOGLE_SHEET_URL = window.GOOGLE_SHEET_URL || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check validation
    if (!formData.name.trim()) {
      alert(t.modal.validationName);
      return;
    }
    
    const waRegex = /^(?:\+212|0)[67]\d{8}$/;
    if (!waRegex.test(formData.whatsapp.trim())) {
      alert(t.modal.validationPhone);
      return;
    }

    if (!formData.service) {
      alert(t.modal.validationService);
      return;
    }

    setStatus('loading');

    try {
      const leadPayload = {
        name: formData.name.trim(),
        whatsapp: formData.whatsapp.trim(),
        service: formData.service,
        message: formData.message || "",
        date: new Date().toISOString(),
        userAgent: navigator.userAgent,
        source: 'Contact Form',
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
      setFormData({ name: '', whatsapp: '', service: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 bg-therapy-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-therapy-900 tracking-tight">
            {t.contact.title}
          </h2>
          <p className="text-base md:text-lg text-sand-900/85 font-medium">
            {t.contact.subtitle}
          </p>
          <div className="w-16 h-1 bg-medical-500 mx-auto rounded-full mt-4"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Column: Form & Info (col-span-7) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 border border-sand-200/50 shadow-md space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Full Name */}
                <div className="flex flex-col text-start space-y-2">
                  <label htmlFor="contact-name" className="text-sm font-bold text-therapy-900">
                    {t.contact.namePlaceholder} *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder={t.contact.namePlaceholder}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-medical-500 font-medium bg-sand-50/50 text-sm"
                  />
                </div>

                {/* WhatsApp */}
                <div className="flex flex-col text-start space-y-2">
                  <label htmlFor="contact-whatsapp" className="text-sm font-bold text-therapy-900">
                    {t.contact.whatsappPlaceholder.split(' (')[0]} *
                  </label>
                  <input
                    id="contact-whatsapp"
                    type="tel"
                    required
                    placeholder="0612345678"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-medical-500 font-medium bg-sand-50/50 text-sm dir-ltr text-start"
                  />
                </div>

              </div>

              {/* Service Requested */}
              <div className="flex flex-col text-start space-y-2">
                <label htmlFor="contact-service" className="text-sm font-bold text-therapy-900">
                  {t.contact.servicePlaceholder} *
                </label>
                <select
                  id="contact-service"
                  required
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-medical-500 font-medium bg-sand-50/50 text-sm"
                >
                  <option value="">{t.contact.selectService}</option>
                  <option value="Hijama">{t.contact.service1}</option>
                  <option value="Massage">{t.contact.service2}</option>
                  <option value="Acupuncture">{t.contact.service3}</option>
                  <option value="Chiropraxie">{t.contact.service4}</option>
                  <option value="Pack complet">{t.contact.servicePack}</option>
                </select>
              </div>

              {/* Message */}
              <div className="flex flex-col text-start space-y-2">
                <label htmlFor="contact-message" className="text-sm font-bold text-therapy-900">
                  {t.contact.messagePlaceholder.replace('...', '')}
                </label>
                <textarea
                  id="contact-message"
                  rows="4"
                  placeholder={t.contact.messagePlaceholder}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-medical-500 font-medium bg-sand-50/50 text-sm resize-none"
                ></textarea>
              </div>

              {/* Form Feedback & Actions */}
              <div className="flex flex-col space-y-4">
                {status === 'success' && (
                  <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 p-4 rounded-xl text-sm font-bold">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    <span>{t.modal.success}</span>
                  </div>
                )}
                
                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-700 bg-red-50 border border-red-200 p-4 rounded-xl text-sm font-bold">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span>{t.modal.error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-2 bg-medical-500 hover:bg-medical-600 active:bg-medical-700 disabled:bg-medical-300 text-white font-extrabold py-4 rounded-xl shadow-md transition-all text-base"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>{t.modal.sending}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 rtl:rotate-180" />
                      <span>{t.contact.submit}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Google Maps & Direct Contact Cards (col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {/* Google Maps Iframe */}
            <div className="w-full h-[280px] rounded-3xl overflow-hidden shadow-md border border-sand-200 bg-sand-200">
              <iframe
                title="Google Maps Location - Jirari 2, Tanger"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.544605988775!2d-5.8078996!3d35.7374092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDQ0JzE0LjciTiA1wrA0OCcyOC40Ilc!5e0!3m2!1sfr!2sma!4v1650000000000!5m2!1sfr!2sma"
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Address Card */}
            <div className="bg-white rounded-2xl p-5 border border-sand-200/50 shadow-sm flex items-start gap-4 text-start">
              <div className="bg-medical-50 text-medical-600 p-3 rounded-xl border border-medical-100 flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-therapy-900 text-sm mb-1">{t.contact.addressTitle}</h4>
                <p className="text-xs text-sand-900/70 font-semibold leading-relaxed">{t.contact.addressText}</p>
              </div>
            </div>

            {/* Phone Card */}
            <a
              href="tel:+212712500809"
              className="bg-white rounded-2xl p-5 border border-sand-200/50 shadow-sm flex items-start gap-4 text-start hover:border-medical-300 transition-colors"
            >
              <div className="bg-medical-50 text-medical-600 p-3 rounded-xl border border-medical-100 flex-shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-therapy-900 text-sm mb-1">{t.contact.phoneTitle}</h4>
                <p className="text-xs text-sand-900/70 font-semibold dir-ltr text-start">+212 7 12500809</p>
              </div>
            </a>

            {/* Email / Fast Booking Card */}
            <button
              onClick={() => onOpenModal('General')}
              className="bg-white rounded-2xl p-5 border border-sand-200/50 shadow-sm flex items-start gap-4 text-start hover:border-medical-300 transition-colors focus:outline-none"
            >
              <div className="bg-medical-50 text-medical-600 p-3 rounded-xl border border-medical-100 flex-shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-therapy-900 text-sm mb-1">{t.contact.emailTitle}</h4>
                <p className="text-xs text-medical-600 font-bold underline">{t.contact.emailText}</p>
              </div>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
