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
    <section id="contact" className="py-10 md:py-14 bg-therapy-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10 space-y-3">
          <h2 className="text-2xl md:text-4xl font-extrabold text-therapy-900 tracking-tight">
            {t.contact.title}
          </h2>
          <p className="text-sm md:text-base text-sand-900/85 font-semibold">
            {t.contact.subtitle}
          </p>
          <div className="w-16 h-1 bg-medical-500 mx-auto rounded-full mt-2"></div>
        </div>

        {/* 2-Column Balanced Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Compact Reservation Form (col-span-7) */}
          <div className="lg:col-span-7 flex flex-col">
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 md:p-7 border border-sand-200/60 shadow-lg flex flex-col justify-between space-y-5 h-full">
              
              {/* Inputs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="flex flex-col text-start space-y-1.5">
                  <label htmlFor="contact-name" className="text-xs font-bold text-therapy-900">
                    {t.contact.namePlaceholder} *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder={t.contact.namePlaceholder}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-medical-500 font-medium bg-sand-50/50 text-xs md:text-sm"
                  />
                </div>

                {/* WhatsApp */}
                <div className="flex flex-col text-start space-y-1.5">
                  <label htmlFor="contact-whatsapp" className="text-xs font-bold text-therapy-900">
                    {t.contact.whatsappPlaceholder.split(' (')[0]} *
                  </label>
                  <input
                    id="contact-whatsapp"
                    type="tel"
                    required
                    placeholder="0612345678"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-medical-500 font-medium bg-sand-50/50 text-xs md:text-sm dir-ltr text-start"
                  />
                </div>
              </div>

              {/* Service Requested */}
              <div className="flex flex-col text-start space-y-1.5">
                <label htmlFor="contact-service" className="text-xs font-bold text-therapy-900">
                  {t.contact.servicePlaceholder} *
                </label>
                <select
                  id="contact-service"
                  required
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-medical-500 font-medium bg-sand-50/50 text-xs md:text-sm"
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
              <div className="flex flex-col text-start space-y-1.5">
                <label htmlFor="contact-message" className="text-xs font-bold text-therapy-900">
                  {t.contact.messagePlaceholder.replace('...', '')}
                </label>
                <textarea
                  id="contact-message"
                  rows="2"
                  placeholder={t.contact.messagePlaceholder}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-medical-500 font-medium bg-sand-50/50 text-xs md:text-sm resize-none"
                ></textarea>
              </div>

              {/* Feedback & Submit Button */}
              <div className="space-y-3 pt-1">
                {status === 'success' && (
                  <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 p-3 rounded-xl text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>{t.modal.success}</span>
                  </div>
                )}
                
                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-700 bg-red-50 border border-red-200 p-4 rounded-xl text-xs font-bold">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{t.modal.error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-2 bg-medical-500 hover:bg-medical-600 active:bg-medical-700 disabled:bg-medical-300 text-white font-extrabold py-3.5 rounded-xl shadow-md transition-all text-sm"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{t.modal.sending}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 rtl:rotate-180" />
                      <span>{t.contact.submit}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Google Maps & 3 Clean Contact Cards (col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-3">
            
            {/* Google Maps Container */}
            <div className="relative w-full h-[200px] md:h-[210px] rounded-3xl overflow-hidden shadow-md border border-sand-200 bg-sand-200">
              <iframe
                title="Google Maps Location - Cabinet SSADIK Tanger"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.5446!2d-5.807469!3d35.737400!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0b810059a37c67%3A0xdbd98f651349f467!2sSsadik%20th%C3%A9rapie!5e0!3m2!1sfr!2sma!4v1700000000000!5m2!1sfr!2sma"
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Card 1: Address (Clickable link to Google Maps) */}
            <a
              href="https://www.google.com/maps/place/Etage+3,+Ssadik+th%C3%A9rapie,+6,+2+Av.+Aicha+Moussafer,+Tanger+90060/data=!4m2!3m1!1s0xd0b810059a37c67:0xdbd98f651349f467!18m1!1e1?utm_source=mstt_1&entry=gps&coh=192189&g_ep=CAESBzI2LjI5LjIYACCIJyq9ASw5NDI2NzcyNyw5NDI5MjE5NSw5NDI5OTUzMiwxMDA3OTY0OTgsMTAwNzk3NzYxLDEwMDgyNjQ3OSwxMDA3OTY1MzUsMTAwODIyMTI5LDk0MjgwNTc2LDk0MjA3Mzk0LDk0MjA3NTA2LDk0MjA4NTA2LDk0MjE4NjUzLDk0MjI5ODM5LDk0Mjc1MTY4LDk0Mjc5NjE5LDEwMDgxNTYzNSwxMDA4MjUwMjEsMTAwODIwMjM3LDEwMDgyMjQ4OUICTUE%3D&skid=b745a039-a436-4752-aeae-88fb0c1beeb2&g_st=aw"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl p-3 border border-sand-200/60 shadow-xs flex items-center justify-between gap-3 text-start hover:border-medical-400 hover:shadow-sm transition-all group"
              title="Google Maps"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="bg-medical-50 text-medical-600 p-2 rounded-xl border border-medical-100 flex-shrink-0 group-hover:bg-medical-500 group-hover:text-white transition-colors">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-therapy-900 text-xs mb-0.5">{t.contact.addressTitle}</h4>
                  <p className="text-xs text-sand-900/75 font-semibold truncate">{t.contact.addressText}</p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-sand-50 text-sand-900/70 border border-sand-200 group-hover:bg-medical-50 group-hover:text-medical-700 transition-colors flex-shrink-0">
                {t.dir === 'rtl' ? 'الخريطة ↗' : 'Itinéraire ↗'}
              </span>
            </a>

            {/* Card 2: Phone / WhatsApp */}
            <a
              href="tel:+212661508910"
              className="bg-white rounded-2xl p-3 border border-sand-200/60 shadow-xs flex items-center justify-between gap-3 text-start hover:border-medical-400 hover:shadow-sm transition-all group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="bg-medical-50 text-medical-600 p-2 rounded-xl border border-medical-100 flex-shrink-0 group-hover:bg-medical-500 group-hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-therapy-900 text-xs mb-0.5">{t.contact.phoneTitle}</h4>
                  <p className="text-xs text-medical-700 font-extrabold text-start">
                    <span dir="ltr" className="inline-block [unicode-bidi:isolate]">+212 661-508910</span>
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-sand-50 text-sand-900/70 border border-sand-200 group-hover:bg-medical-50 group-hover:text-medical-700 transition-colors flex-shrink-0">
                {t.dir === 'rtl' ? 'اتصال مباشر' : 'Appeler'}
              </span>
            </a>

            {/* Card 3: Online RDV */}
            <button
              onClick={() => onOpenModal('General')}
              className="bg-white rounded-2xl p-3 border border-sand-200/60 shadow-xs flex items-center justify-between gap-3 text-start hover:border-medical-400 hover:shadow-sm transition-all group w-full"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="bg-medical-50 text-medical-600 p-2 rounded-xl border border-medical-100 flex-shrink-0 group-hover:bg-medical-500 group-hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-therapy-900 text-xs mb-0.5">{t.contact.emailTitle}</h4>
                  <p className="text-xs text-medical-600 font-bold">{t.contact.emailText}</p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-medical-500 text-white shadow-2xs group-hover:bg-medical-600 transition-colors flex-shrink-0">
                {t.dir === 'rtl' ? 'احجز الآن' : 'Réserver'}
              </span>
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}
