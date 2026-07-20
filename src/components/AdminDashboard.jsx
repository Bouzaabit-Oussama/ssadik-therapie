import React, { useState, useEffect } from 'react';
import { 
  signInUser, 
  signOutUser, 
  getLeadsRealtime, 
  updateLeadStatus, 
  auth 
} from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { 
  Search, 
  LogOut, 
  Lock, 
  Mail, 
  Phone, 
  User, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  MessageSquare, 
  Globe, 
  Loader2,
  Calendar,
  Undo
} from 'lucide-react';

const dashboardTranslations = {
  ar: {
    title: "لوحة التحكم - صادق للعلاج الطبيعي",
    loginTitle: "تسجيل الدخول للمساعد(ة)",
    emailLabel: "البريد الإلكتروني",
    passwordLabel: "كلمة المرور",
    loginBtn: "دخول",
    loggingIn: "جاري الدخول...",
    logoutBtn: "تسجيل الخروج",
    statsTotal: "إجمالي الحجوزات",
    statsPending: "في الانتظار",
    statsConfirmed: "مؤكدة",
    statsCancelled: "ملغاة",
    searchPlaceholder: "البحث بالاسم أو الهاتف...",
    filterAll: "الكل",
    filterPending: "في الانتظار",
    filterConfirmed: "مؤكدة",
    filterCancelled: "ملغاة",
    colName: "العميل",
    colPhone: "الهاتف",
    colService: "الخدمة",
    colDate: "التاريخ",
    colStatus: "الحالة",
    colActions: "إجراءات",
    btnConfirm: "تأكيد",
    btnCancel: "إلغاء",
    btnReset: "إعادة تعيين",
    whatsappTooltip: "ارسل رسالة تأكيد عبر واتساب",
    noData: "لا توجد حجوزات متطابقة",
    authError: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
    statusPendingLabel: "قيد الانتظار",
    statusConfirmedLabel: "مؤكد",
    statusCancelledLabel: "ملغي",
    backToSite: "العودة للموقع الرئيسي"
  },
  fr: {
    title: "Tableau de Bord - Ssadik Thérapie",
    loginTitle: "Connexion Assistant(e)",
    emailLabel: "Adresse Email",
    passwordLabel: "Mot de passe",
    loginBtn: "Se connecter",
    loggingIn: "Connexion en cours...",
    logoutBtn: "Se déconnecter",
    statsTotal: "Total Réservations",
    statsPending: "En attente",
    statsConfirmed: "Confirmés",
    statsCancelled: "Annulés",
    searchPlaceholder: "Rechercher par nom ou téléphone...",
    filterAll: "Tous",
    filterPending: "En attente",
    filterConfirmed: "Confirmés",
    filterCancelled: "Annulés",
    colName: "Client",
    colPhone: "Téléphone",
    colService: "Service",
    colDate: "Date",
    colStatus: "Statut",
    colActions: "Actions",
    btnConfirm: "Confirmer",
    btnCancel: "Annuler",
    btnReset: "Réinitialiser",
    whatsappTooltip: "Envoyer confirmation WhatsApp",
    noData: "Aucune réservation trouvée",
    authError: "Email ou mot de passe incorrect.",
    statusPendingLabel: "En attente",
    statusConfirmedLabel: "Confirmé",
    statusCancelledLabel: "Annulé",
    backToSite: "Retour au site public"
  }
};

export default function AdminDashboard({ lang, setLang, t }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  
  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Leads and filter states
  const [leads, setLeads] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const dt = dashboardTranslations[lang] || dashboardTranslations['fr'];
  const isRtl = lang === 'ar';

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  // Listen to Firestore leads
  useEffect(() => {
    if (!user) return;

    const unsubscribe = getLeadsRealtime((fetchedLeads) => {
      setLeads(fetchedLeads);
    });
    return () => unsubscribe();
  }, [user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoggingIn(true);
    setLoginError('');

    try {
      await signInUser(email, password);
    } catch (err) {
      console.error("Login error:", err);
      setLoginError(dt.authError);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOutUser();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handleUpdateStatus = async (leadId, newStatus) => {
    try {
      await updateLeadStatus(leadId, newStatus);
    } catch (err) {
      alert("Error updating status: " + err.message);
    }
  };

  const getWhatsAppLink = (lead) => {
    // Format Moroccan numbers for Global WhatsApp wa.me links
    // e.g. 0612345678 -> 212612345678 or +2126... -> 2126...
    let cleanPhone = lead.whatsapp.replace(/[\s\-\+]/g, '');
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '212' + cleanPhone.substring(1);
    }

    // Determine booking date display
    let formattedDate = "";
    try {
      formattedDate = new Date(lead.date).toLocaleString(lang === 'ar' ? 'ar-MA' : 'fr-MA', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      formattedDate = lead.date;
    }

    // Multilingual templates
    const message = lang === 'ar'
      ? `مرحباً ${lead.name}، معك مركز صادق للعلاج الطبيعي بطنجة. نود تأكيد موعد حصتك الخاصة بـ (${lead.service}) المحجوزة بتاريخ ${formattedDate}. هل هذا التوقيت لا يزال مناسباً لك؟`
      : `Bonjour ${lead.name}, c'est Ssadik Thérapie à Tanger. Je souhaite confirmer votre réservation pour la séance de (${lead.service}) demandée le ${formattedDate}. Est-ce que ce créneau vous convient toujours ?`;

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  };

  // Compute stats
  const totalCount = leads.length;
  const pendingCount = leads.filter(l => l.status === 'Pending').length;
  const confirmedCount = leads.filter(l => l.status === 'Confirmed').length;
  const cancelledCount = leads.filter(l => l.status === 'Cancelled').length;

  // Filter & search logic
  const filteredLeads = leads.filter(lead => {
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchLower) || 
      lead.whatsapp.includes(searchLower) ||
      (lead.service && lead.service.toLowerCase().includes(searchLower));
    
    return matchesStatus && matchesSearch;
  });

  if (loadingAuth) {
    return (
      <div className="min-h-screen bg-sand-50 flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-medical-600" />
      </div>
    );
  }

  // LOGIN SCREEN
  if (!user) {
    return (
      <div className="min-h-screen bg-sand-50 flex flex-col justify-center items-center p-4" dir={isRtl ? 'rtl' : 'ltr'}>
        {/* Language switch at top */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
          <button 
            onClick={() => setLang(lang === 'ar' ? 'fr' : 'ar')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-sand-200 text-xs font-bold text-therapy-900 shadow-sm hover:bg-sand-100 transition-all"
          >
            <Globe className="w-3.5 h-3.5 text-medical-500" />
            <span>{lang === 'ar' ? 'Français' : 'عربي'}</span>
          </button>
        </div>

        <div className="w-full max-w-md">
          {/* Brand/Clinic Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-black text-therapy-900 tracking-tight">
              {lang === 'ar' ? 'صادق للعلاج الطبيعي' : 'Ssadik Thérapie'}
            </h1>
            <p className="text-sm font-semibold text-sand-900/50 mt-1">Tanger, Maroc</p>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-sand-200 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-medical-500 to-medical-700"></div>

            <h2 className="text-lg md:text-xl font-bold text-therapy-900 mb-6 flex items-center gap-2">
              <Lock className="w-5 h-5 text-medical-500" />
              <span>{dt.loginTitle}</span>
            </h2>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div className="flex flex-col space-y-1.5 text-start">
                <label className="text-xs font-bold text-therapy-900">
                  {dt.emailLabel}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-sand-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="assistant@ssadik.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full ps-10 pe-4 py-3 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-medical-500 bg-sand-50/50 font-medium text-sm text-sand-900"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col space-y-1.5 text-start">
                <label className="text-xs font-bold text-therapy-900">
                  {dt.passwordLabel}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-sand-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full ps-10 pe-4 py-3 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-medical-500 bg-sand-50/50 font-medium text-sm text-sand-900"
                  />
                </div>
              </div>

              {/* Error Info */}
              {loginError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-bold text-red-600 text-start flex items-center gap-2">
                  <XCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full flex items-center justify-center gap-2 bg-medical-500 hover:bg-medical-600 text-white font-extrabold py-3.5 rounded-xl shadow-md transition-all text-sm disabled:bg-medical-300"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{dt.loggingIn}</span>
                  </>
                ) : (
                  <span>{dt.loginBtn}</span>
                )}
              </button>
            </form>
          </div>

          {/* Return to site */}
          <div className="text-center mt-6">
            <a 
              href="/" 
              className="text-xs font-bold text-medical-600 hover:underline"
            >
              ← {dt.backToSite}
            </a>
          </div>
        </div>
      </div>
    );
  }

  // MAIN DASHBOARD PANEL
  return (
    <div className="min-h-screen bg-sand-50 text-sand-900 flex flex-col font-sans" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Top Navigation Bar */}
      <header className="sticky top-0 bg-white border-b border-sand-200/60 z-20 shadow-sm px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Title & Brand */}
          <div className="flex items-center gap-3">
            <div className="bg-medical-500 text-white p-2 rounded-xl">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="text-start">
              <h1 className="text-lg md:text-xl font-black text-therapy-900 leading-tight">
                {dt.title}
              </h1>
              <p className="text-xs font-bold text-sand-400">Tanger, Maroc • {user.email}</p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            {/* Lang switch */}
            <button 
              onClick={() => setLang(lang === 'ar' ? 'fr' : 'ar')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-sand-100 hover:bg-sand-200 text-xs font-bold text-therapy-900 transition-colors"
            >
              <Globe className="w-4 h-4 text-medical-500" />
              <span>{lang === 'ar' ? 'Français' : 'عربي'}</span>
            </button>

            {/* Public website */}
            <a 
              href="/"
              className="px-3 py-2 rounded-xl border border-sand-200 hover:bg-sand-100 text-xs font-bold text-therapy-900 transition-colors text-center"
            >
              {dt.backToSite}
            </a>

            {/* Logout */}
            <button 
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">{dt.logoutBtn}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* STATS OVERVIEW CARDS */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Total */}
          <div className="bg-white p-4 md:p-6 rounded-2xl border border-sand-200 shadow-sm text-start flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-bold text-sand-400">{dt.statsTotal}</p>
              <h3 className="text-2xl md:text-3xl font-black text-therapy-900 mt-1">{totalCount}</h3>
            </div>
            <div className="bg-sand-100 text-therapy-800 p-2.5 rounded-xl hidden sm:block">
              <Calendar className="w-6 h-6" />
            </div>
          </div>

          {/* Card 2: Pending */}
          <div className="bg-white p-4 md:p-6 rounded-2xl border border-sand-200 shadow-sm text-start flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-bold text-sand-400">{dt.statsPending}</p>
              <h3 className="text-2xl md:text-3xl font-black text-amber-600 mt-1">{pendingCount}</h3>
            </div>
            <div className="bg-amber-50 text-amber-600 p-2.5 rounded-xl hidden sm:block">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          {/* Card 3: Confirmed */}
          <div className="bg-white p-4 md:p-6 rounded-2xl border border-sand-200 shadow-sm text-start flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-bold text-sand-400">{dt.statsConfirmed}</p>
              <h3 className="text-2xl md:text-3xl font-black text-green-600 mt-1">{confirmedCount}</h3>
            </div>
            <div className="bg-green-50 text-green-600 p-2.5 rounded-xl hidden sm:block">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>

          {/* Card 4: Cancelled */}
          <div className="bg-white p-4 md:p-6 rounded-2xl border border-sand-200 shadow-sm text-start flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-bold text-sand-400">{dt.statsCancelled}</p>
              <h3 className="text-2xl md:text-3xl font-black text-red-600 mt-1">{cancelledCount}</h3>
            </div>
            <div className="bg-red-50 text-red-600 p-2.5 rounded-xl hidden sm:block">
              <XCircle className="w-6 h-6" />
            </div>
          </div>
        </section>

        {/* SEARCH AND FILTERS CONTROLS */}
        <section className="bg-white rounded-3xl p-4 md:p-6 border border-sand-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search box */}
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-sand-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder={dt.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full ps-9 pe-4 py-2.5 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-medical-500 font-medium text-xs md:text-sm text-sand-900 bg-sand-50/50"
            />
          </div>

          {/* Filter tabs */}
          <div className="flex bg-sand-100 p-1 rounded-xl gap-1 self-start md:self-auto overflow-x-auto max-w-full">
            {[
              { key: 'All', label: dt.filterAll },
              { key: 'Pending', label: dt.filterPending },
              { key: 'Confirmed', label: dt.filterConfirmed },
              { key: 'Cancelled', label: dt.filterCancelled }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setStatusFilter(tab.key)}
                className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-bold transition-all whitespace-nowrap ${
                  statusFilter === tab.key 
                    ? 'bg-white text-therapy-900 shadow-sm' 
                    : 'text-sand-900/60 hover:text-therapy-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </section>

        {/* RESERVATIONS LIST */}
        <section className="bg-white rounded-3xl border border-sand-200 shadow-md overflow-hidden">
          {filteredLeads.length === 0 ? (
            <div className="py-16 text-center text-sand-900/50 font-bold">
              <Calendar className="w-12 h-12 mx-auto text-sand-300 mb-3" />
              <p>{dt.noData}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              {/* DESKTOP TABLE VIEW */}
              <table className="w-full text-start border-collapse hidden md:table">
                <thead>
                  <tr className="bg-sand-100 border-b border-sand-200 text-therapy-900 font-black text-xs uppercase text-start">
                    <th className="px-6 py-4 text-start font-bold">{dt.colName}</th>
                    <th className="px-6 py-4 text-start font-bold">{dt.colPhone}</th>
                    <th className="px-6 py-4 text-start font-bold">{dt.colService}</th>
                    <th className="px-6 py-4 text-start font-bold">{dt.colDate}</th>
                    <th className="px-6 py-4 text-start font-bold">{dt.colStatus}</th>
                    <th className="px-6 py-4 text-center font-bold">{dt.colActions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand-200/70">
                  {filteredLeads.map((lead) => {
                    const statusColors = {
                      Pending: 'bg-amber-50 text-amber-700 border-amber-200',
                      Confirmed: 'bg-green-50 text-green-700 border-green-200',
                      Cancelled: 'bg-red-50 text-red-700 border-red-200'
                    }[lead.status] || 'bg-sand-50 text-sand-700 border-sand-200';

                    const statusLabels = {
                      Pending: dt.statusPendingLabel,
                      Confirmed: dt.statusConfirmedLabel,
                      Cancelled: dt.statusCancelledLabel
                    }[lead.status] || lead.status;

                    return (
                      <tr key={lead.id} className="hover:bg-sand-50/50 transition-colors">
                        {/* Name */}
                        <td className="px-6 py-4 text-start font-bold text-therapy-900">
                          {lead.name}
                        </td>
                        
                        {/* WhatsApp Phone */}
                        <td className="px-6 py-4 text-start font-semibold text-sand-900/70">
                          <span className="dir-ltr inline-block text-sm">{lead.whatsapp}</span>
                        </td>

                        {/* Service requested */}
                        <td className="px-6 py-4 text-start">
                          <span className="inline-block px-2.5 py-1 text-xs font-bold bg-medical-50 text-medical-600 rounded-lg border border-medical-100">
                            {lead.service}
                          </span>
                        </td>

                        {/* Date submitted */}
                        <td className="px-6 py-4 text-start text-xs font-bold text-sand-900/60">
                          {new Date(lead.date).toLocaleString(lang === 'ar' ? 'ar-MA' : 'fr-MA', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </td>

                        {/* Status Badge */}
                        <td className="px-6 py-4 text-start">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${statusColors}`}>
                            {statusLabels}
                          </span>
                        </td>

                        {/* Action buttons */}
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            {lead.status === 'Pending' ? (
                              <>
                                {/* Confirm */}
                                <button
                                  onClick={() => handleUpdateStatus(lead.id, 'Confirmed')}
                                  title={dt.btnConfirm}
                                  className="p-1.5 bg-green-50 hover:bg-green-100 border border-green-200 text-green-600 rounded-lg transition-colors"
                                >
                                  <CheckCircle2 className="w-4 h-4" />
                                </button>
                                {/* Cancel */}
                                <button
                                  onClick={() => handleUpdateStatus(lead.id, 'Cancelled')}
                                  title={dt.btnCancel}
                                  className="p-1.5 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 rounded-lg transition-colors"
                                >
                                  <XCircle className="w-4 h-4" />
                                </button>
                              </>
                            ) : (
                              /* Reset to pending if confirmed/cancelled */
                              <button
                                onClick={() => handleUpdateStatus(lead.id, 'Pending')}
                                title={dt.btnReset}
                                className="p-1.5 bg-sand-100 hover:bg-sand-200 border border-sand-200 text-sand-600 rounded-lg transition-colors"
                              >
                                <Undo className="w-4 h-4" />
                              </button>
                            )}

                            {/* WhatsApp link */}
                            <a
                              href={getWhatsAppLink(lead)}
                              target="_blank"
                              rel="noreferrer"
                              title={dt.whatsappTooltip}
                              className="p-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-600 rounded-lg transition-colors flex items-center justify-center"
                            >
                              <MessageSquare className="w-4 h-4" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* MOBILE CARDS VIEW */}
              <div className="grid grid-cols-1 divide-y divide-sand-200 md:hidden">
                {filteredLeads.map((lead) => {
                  const statusColors = {
                    Pending: 'bg-amber-50 text-amber-700 border-amber-200',
                    Confirmed: 'bg-green-50 text-green-700 border-green-200',
                    Cancelled: 'bg-red-50 text-red-700 border-red-200'
                  }[lead.status] || 'bg-sand-50 text-sand-700 border-sand-200';

                  const statusLabels = {
                    Pending: dt.statusPendingLabel,
                    Confirmed: dt.statusConfirmedLabel,
                    Cancelled: dt.statusCancelledLabel
                  }[lead.status] || lead.status;

                  return (
                    <div key={lead.id} className="p-4 space-y-3 text-start">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-therapy-900 text-base">{lead.name}</h4>
                          <span className="inline-block px-2 py-0.5 mt-1 text-2xs font-bold bg-medical-50 text-medical-600 rounded border border-medical-100">
                            {lead.service}
                          </span>
                        </div>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-2xs font-bold border ${statusColors}`}>
                          {statusLabels}
                        </span>
                      </div>

                      <div className="space-y-1 text-xs text-sand-900/60 font-semibold">
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-sand-400" />
                          <span className="dir-ltr text-start">{lead.whatsapp}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-sand-400" />
                          <span>
                            {new Date(lead.date).toLocaleString(lang === 'ar' ? 'ar-MA' : 'fr-MA', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </div>

                      {lead.message && (
                        <div className="text-xs bg-sand-50 p-2.5 rounded-xl border border-sand-200 text-sand-900/80 font-medium">
                          {lead.message}
                        </div>
                      )}

                      {/* Mobile Actions block */}
                      <div className="flex justify-between items-center pt-2 border-t border-sand-100">
                        {/* WhatsApp contact */}
                        <a
                          href={getWhatsAppLink(lead)}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-xl hover:bg-emerald-100 transition-colors"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>WhatsApp</span>
                        </a>

                        {/* Status updates */}
                        <div className="flex gap-2">
                          {lead.status === 'Pending' ? (
                            <>
                              <button
                                onClick={() => handleUpdateStatus(lead.id, 'Confirmed')}
                                className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-green-700 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-colors"
                              >
                                <CheckCircle2 className="w-4 h-4" />
                                <span>{dt.btnConfirm}</span>
                              </button>
                              <button
                                onClick={() => handleUpdateStatus(lead.id, 'Cancelled')}
                                className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-red-600 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition-colors"
                              >
                                <XCircle className="w-4 h-4" />
                                <span>{dt.btnCancel}</span>
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => handleUpdateStatus(lead.id, 'Pending')}
                              className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-sand-600 bg-sand-100 border border-sand-200 rounded-xl hover:bg-sand-200 transition-colors"
                            >
                              <Undo className="w-3.5 h-3.5" />
                              <span>{dt.btnReset}</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
