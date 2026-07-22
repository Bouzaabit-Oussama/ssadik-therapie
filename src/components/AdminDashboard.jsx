import React, { useState, useEffect } from 'react';
import { 
  signInUser, 
  signOutUser, 
  getLeadsRealtime, 
  updateLeadStatus, 
  updateLeadDetails,
  getUserProfile,
  getUsersRealtime,
  updateAssistantPermissions,
  updateUserRole,
  createAssistantUser,
  updateAssistantAccount,
  deleteAssistantUser,
  syncDefaultAccounts,
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
  Undo,
  Eye,
  EyeOff,
  Pencil,
  Check,
  X,
  Shield,
  UserCheck,
  Users,
  Sliders,
  Settings,
  AlertCircle,
  Info,
  Crown,
  UserCog,
  UserPlus,
  Trash2,
  Key,
  RefreshCw
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';

const AVAILABLE_SERVICES = [
  'Hijama',
  'Massage',
  'Acupuncture',
  'Chiropraxie',
  'General'
];

const dashboardTranslations = {
  ar: {
    title: "لوحة التحكم - صادق للعلاج الطبيعي",
    loginTitle: "تسجيل الدخول للمساعد(ة) / المدير",
    emailLabel: "البريد الإلكتروني",
    passwordLabel: "كلمة المرور",
    loginBtn: "دخول",
    loggingIn: "جاري الدخول...",
    logoutBtn: "تسجيل الخروج",
    statsTotal: "إجمالي الحجوزات",
    statsPending: "في الانتظار",
    statsConfirmed: "مؤكدة",
    statsCancelled: "ملغاة",
    searchPlaceholder: "البحث بالاسم، الهاتف أو الخدمة...",
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
    btnEdit: "تعديل",
    btnSave: "حفظ",
    btnCancelEdit: "إلغاء",
    whatsappTooltip: "ارسل رسالة تأكيد عبر واتساب",
    noData: "لا توجد حجوزات متطابقة",
    authError: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
    statusPendingLabel: "قيد الانتظار",
    statusConfirmedLabel: "مؤكد",
    statusCancelledLabel: "ملغي",
    backToSite: "العودة للموقع الرئيسي",
    filterDateAll: "كل الأوقات",
    filterDateToday: "اليوم",
    filterDateWeek: "آخر 7 أيام",
    filterDateMonth: "آخر 30 يوم",
    analyticsTitle: "التحليلات والبيانات",
    analyticsToggleShow: "عرض الرسوم البيانية",
    analyticsToggleHide: "إخفاء الرسوم البيانية",
    chartEvolutionTitle: "تطور الحجوزات اليومية",
    chartServiceTitle: "أداء الخدمات ونسبة التأكيد",
    chartLeadTotal: "إجمالي الحجوزات",
    chartLeadConfirmed: "مؤكدة",
    chartLeadCancelled: "ملغاة",
    chartLeadPending: "في الانتظار",
    conversionRateLabel: "نسبة التأكيد",
    noDataChart: "لا توجد بيانات كافية لعرض الرسوم البيانية",
    roleAdmin: "مدير مسؤول",
    roleAssistant: "مساعد(ة)",
    tabReservations: "قائمة الحجوزات",
    tabAssistants: "إدارة المساعدين",
    assistantNotice: "تنبيه حساب مساعد: يتم عرض الحجوزات الخاصة بآخر {days} أيام فقط.",
    noEditPermission: "ليس لديك إذن تعديل البيانات.",
    assistantsTitle: "إدارة حسابات وصلاحيات المساعدين",
    colEmail: "البريد الإلكتروني",
    colRole: "الرتبة",
    colCanEdit: "إذن التعديل",
    colMaxDays: "حد الأقدمية (أيام)",
    permissionAllowed: "مسموح بالتعديل",
    permissionDenied: "قراءة فقط",
    daysOption7: "7 أيام",
    daysOption14: "14 يوم",
    daysOption30: "30 يوم",
    daysOption90: "90 يوم",
    daysOptionAll: "غير محدود",
    toastUpdated: "تم تحديث البيانات بنجاح!",
    toastPermsUpdated: "تم تحديث صلاحيات المساعد بنجاح!",
    addAssistantTitle: "إضافة حساب مساعد جديد",
    addAssistantDesc: "يمكنك إنشاء حساب مساعد جديد وربطه تلقائياً بنظام Firebase",
    btnCreateAssistant: "إنشاء حساب المساعد",
    creatingAssistant: "جاري الإنشاء...",
    newAssistantEmail: "البريد الإلكتروني للمساعد",
    newAssistantPassword: "كلمة المرور (6 أحرف على الأقل)",
    toastAssistantCreated: "تم إنشاء حساب المساعد وتعيين صلاحياته بنجاح!",
    colPassword: "كلمة المرور",
    btnDeleteAccount: "حذف",
    confirmDeleteAccount: "هل أنت تأكد من رغبتك في حذف هذا الحساب؟",
    toastAccountDeleted: "تم حذف حساب المساعد بنجاح!",
    toastAccountUpdated: "تم تحديث بيانات الحساب بنجاح!"
  },
  fr: {
    title: "Tableau de Bord - Ssadik Thérapie",
    loginTitle: "Connexion Assistant(e) / Admin",
    emailLabel: "Adresse Email",
    passwordLabel: "Mot de passe",
    loginBtn: "Se connecter",
    loggingIn: "Connexion en cours...",
    logoutBtn: "Se déconnecter",
    statsTotal: "Total Réservations",
    statsPending: "En attente",
    statsConfirmed: "Confirmés",
    statsCancelled: "Annulés",
    searchPlaceholder: "Rechercher par nom, téléphone ou service...",
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
    btnEdit: "Éditer",
    btnSave: "Enregistrer",
    btnCancelEdit: "Annuler",
    whatsappTooltip: "Envoyer confirmation WhatsApp",
    noData: "Aucune réservation trouvée",
    authError: "Email ou mot de passe incorrect.",
    statusPendingLabel: "En attente",
    statusConfirmedLabel: "Confirmé",
    statusCancelledLabel: "Annulé",
    backToSite: "Retour au site public",
    filterDateAll: "Tous les temps",
    filterDateToday: "Aujourd'hui",
    filterDateWeek: "7 derniers jours",
    filterDateMonth: "30 derniers jours",
    analyticsTitle: "Analyses & Statistiques",
    analyticsToggleShow: "Afficher les analyses",
    analyticsToggleHide: "Masquer les analyses",
    chartEvolutionTitle: "Évolution Quotidienne des Réservations",
    chartServiceTitle: "Répartition & Taux de Confirmation par Service",
    chartLeadTotal: "Total Réservations",
    chartLeadConfirmed: "Confirmés",
    chartLeadCancelled: "Annulés",
    chartLeadPending: "En attente",
    conversionRateLabel: "Taux de Confirmation",
    noDataChart: "Pas assez de données pour afficher les graphiques",
    roleAdmin: "Administrateur",
    roleAssistant: "Assistant(e)",
    tabReservations: "Réservations",
    tabAssistants: "Gestion Assistants",
    assistantNotice: "Mode Assistant : Seules les réservations des {days} derniers jours sont affichées.",
    noEditPermission: "Accès restreint : Vous n'avez pas l'autorisation de modifier les données.",
    assistantsTitle: "Gestion des Comptes & Autorisations Assistants",
    colEmail: "Adresse Email",
    colRole: "Rôle",
    colCanEdit: "Droit de Modification",
    colMaxDays: "Limite d'ancienneté",
    permissionAllowed: "Autorisé",
    permissionDenied: "Lecture seule",
    daysOption7: "7 jours",
    daysOption14: "14 jours",
    daysOption30: "30 jours",
    daysOption90: "90 jours",
    daysOptionAll: "Illimité",
    toastUpdated: "Réservation mise à jour avec succès !",
    toastPermsUpdated: "Permissions de l'assistant mises à jour !",
    addAssistantTitle: "Créer un nouveau compte Assistant",
    addAssistantDesc: "Ajoutez un nouveau compte assistant directement lié à Firebase Authentication & Firestore.",
    btnCreateAssistant: "Créer le compte Assistant",
    creatingAssistant: "Création en cours...",
    newAssistantEmail: "Adresse Email de l'assistant",
    newAssistantPassword: "Mot de passe (min 6 caractères)",
    toastAssistantCreated: "Compte assistant créé et enregistré avec succès !",
    colPassword: "Mot de passe",
    btnDeleteAccount: "Supprimer",
    confirmDeleteAccount: "Êtes-vous sûr de vouloir supprimer ce compte assistant ?",
    toastAccountDeleted: "Compte assistant supprimé avec succès !",
    toastAccountUpdated: "Identifiants mis à jour avec succès !"
  }
};

// Helper to deduplicate accounts by lowercased email address (one row per email)
function deduplicateUsersByEmail(usersArray) {
  const map = new Map();
  usersArray.forEach(u => {
    const cleanEmail = (u.email || "").toLowerCase().trim();
    if (!cleanEmail) return;

    if (!map.has(cleanEmail)) {
      map.set(cleanEmail, u);
    } else {
      const existing = map.get(cleanEmail);
      if ((u.role === 'admin' && existing.role !== 'admin') || (u.password && !existing.password)) {
        map.set(cleanEmail, u);
      }
    }
  });
  return Array.from(map.values());
}

const DEFAULT_ACCOUNTS_FALLBACK = [
  {
    id: "admin_fallback_id",
    email: "admin@cabinet.com",
    password: "admin@cabinet.com",
    role: "admin",
    canEdit: true,
    maxDaysView: 3650
  },
  {
    id: "assistant_fallback_id",
    email: "assistante@cabinet.com",
    password: "assistante@cabinet.com",
    role: "assistant",
    canEdit: true,
    maxDaysView: 7
  }
];

export default function AdminDashboard({ lang = 'ar', setLang, onNavigate }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  
  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Navigation tab state: 'reservations' | 'assistants'
  const [activeTab, setActiveTab] = useState('reservations');
  const [assistantsList, setAssistantsList] = useState(DEFAULT_ACCOUNTS_FALLBACK);

  // Leads and filter states
  const [leads, setLeads] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('all');
  const [showAnalytics, setShowAnalytics] = useState(true);

  // Inline edit state
  const [editingLeadId, setEditingLeadId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [editingService, setEditingService] = useState('General');

  // Create Assistant Form & Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newCanEdit, setNewCanEdit] = useState(true);
  const [newMaxDaysView, setNewMaxDaysView] = useState('7');
  const [isCreatingAssistant, setIsCreatingAssistant] = useState(false);
  const [assistantError, setAssistantError] = useState('');

  // Editing & Visibility State for Assistant Accounts
  const [editingAssistantId, setEditingAssistantId] = useState(null);
  const [editingAssistantEmail, setEditingAssistantEmail] = useState('');
  const [editingAssistantPassword, setEditingAssistantPassword] = useState('');
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [isSyncing, setIsSyncing] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState('');

  const dt = dashboardTranslations[lang] || dashboardTranslations['fr'];
  const isRtl = lang === 'ar';

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Monitor auth state & load user profile (Admin / Assistant)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const profile = await getUserProfile(currentUser.uid, currentUser.email);
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }
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


  const handleManualSync = async () => {
    setIsSyncing(true);
    try {
      await syncDefaultAccounts();
      showToast(lang === 'ar' ? 'تمت مزامنة وتنظيف الحسابات بنجاح!' : 'Comptes synchronisés et nettoyés avec succès !');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSyncing(false);
    }
  };

  // Listen to Users/Assistants list if logged in as Admin
  useEffect(() => {
    if (!user || userProfile?.role !== 'admin') return;

    // Trigger background sync of default accounts
    syncDefaultAccounts();

    const unsubscribe = getUsersRealtime((fetchedUsers) => {
      let combined = fetchedUsers && fetchedUsers.length > 0 ? fetchedUsers : DEFAULT_ACCOUNTS_FALLBACK;
      
      DEFAULT_ACCOUNTS_FALLBACK.forEach(def => {
        if (!combined.some(u => (u.email || "").toLowerCase().trim() === def.email.toLowerCase().trim())) {
          combined.push(def);
        }
      });

      const deduplicated = deduplicateUsersByEmail(combined);
      setAssistantsList(deduplicated);
    });
    return () => unsubscribe();
  }, [user, userProfile]);

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
    const canEdit = userProfile?.role === 'admin' || userProfile?.canEdit;
    if (!canEdit) {
      showToast(dt.noEditPermission);
      return;
    }

    try {
      await updateLeadStatus(leadId, newStatus);
      showToast(dt.toastUpdated);
    } catch (err) {
      alert("Error updating status: " + err.message);
    }
  };

  // Inline editing handlers
  const handleStartEdit = (lead) => {
    const canEdit = userProfile?.role === 'admin' || userProfile?.canEdit;
    if (!canEdit) {
      showToast(dt.noEditPermission);
      return;
    }
    setEditingLeadId(lead.id);
    setEditingName(lead.name);
    setEditingService(lead.service || 'General');
  };

  const handleSaveEdit = async (leadId) => {
    if (!editingName.trim()) return;
    try {
      await updateLeadDetails(leadId, {
        name: editingName.trim(),
        service: editingService
      }, user?.email || "");
      setEditingLeadId(null);
      showToast(dt.toastUpdated);
    } catch (err) {
      alert("Error saving: " + err.message);
    }
  };

  const handleCancelEdit = () => {
    setEditingLeadId(null);
  };

  // Create Assistant account handler (Admin only)
  const handleCreateAssistant = async (e) => {
    e.preventDefault();
    if (!newEmail || !newPassword) return;
    if (newPassword.length < 6) {
      setAssistantError(lang === 'ar' ? 'كلمة المرور يجب أن تتكون من 6 أحرف على الأقل' : 'Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    const cleanEmail = newEmail.trim().toLowerCase();
    if (assistantsList.some(u => (u.email || "").toLowerCase().trim() === cleanEmail)) {
      setAssistantError(lang === 'ar' ? 'هذا البريد الإلكتروني مستخدم بالفعل بحساب آخر!' : 'Un compte existe déjà avec cette adresse email !');
      return;
    }

    setIsCreatingAssistant(true);
    setAssistantError('');

    try {
      await createAssistantUser(newEmail, newPassword, {
        canEdit: newCanEdit,
        maxDaysView: parseInt(newMaxDaysView, 10)
      });
      setNewEmail('');
      setNewPassword('');
      setIsAddModalOpen(false);
      showToast(dt.toastAssistantCreated);
    } catch (err) {
      console.error("Error creating assistant:", err);
      if (err.code === 'auth/email-already-in-use' || err.message === 'EMAIL_EXISTS') {
        setAssistantError(lang === 'ar' ? 'هذا البريد الإلكتروني مستخدم بالفعل بحساب آخر!' : 'Un compte existe déjà avec cette adresse email !');
      } else {
        setAssistantError(err.message);
      }
    } finally {
      setIsCreatingAssistant(false);
    }
  };

  // Assistant permissions & account controls (Admin only)
  const togglePasswordVisibility = (id) => {
    setVisiblePasswords(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleStartEditAssistant = (assistant) => {
    setEditingAssistantId(assistant.id);
    setEditingAssistantEmail(assistant.email || '');
    setEditingAssistantPassword(assistant.password || '');
  };

  const handleSaveEditAssistant = async (assistantId) => {
    if (!editingAssistantEmail.trim()) return;
    try {
      await updateAssistantAccount(assistantId, {
        email: editingAssistantEmail.trim(),
        password: editingAssistantPassword
      });
      setEditingAssistantId(null);
      showToast(dt.toastAccountUpdated);
    } catch (err) {
      alert("Error updating assistant account: " + err.message);
    }
  };

  const handleDeleteAssistant = async (assistant) => {
    if (window.confirm(dt.confirmDeleteAccount)) {
      try {
        await deleteAssistantUser(assistant);
        showToast(dt.toastAccountDeleted);
      } catch (err) {
        alert("Error deleting assistant account: " + err.message);
      }
    }
  };

  const handleChangeUserRole = async (assistantId, newRole) => {
    try {
      await updateUserRole(assistantId, newRole);
      showToast(dt.toastPermsUpdated);
    } catch (err) {
      alert("Error updating user role: " + err.message);
    }
  };

  const handleToggleCanEdit = async (assistantId, currentVal) => {
    try {
      await updateAssistantPermissions(assistantId, { canEdit: !currentVal });
      showToast(dt.toastPermsUpdated);
    } catch (err) {
      alert("Error updating permissions: " + err.message);
    }
  };

  const handleChangeMaxDays = async (assistantId, newMaxDays) => {
    try {
      await updateAssistantPermissions(assistantId, { maxDaysView: parseInt(newMaxDays, 10) });
      showToast(dt.toastPermsUpdated);
    } catch (err) {
      alert("Error updating max days: " + err.message);
    }
  };

  const getWhatsAppLink = (lead) => {
    let cleanPhone = lead.whatsapp.replace(/[\s\-\+]/g, '');
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '212' + cleanPhone.substring(1);
    }

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

    const message = lang === 'ar'
      ? `مرحباً ${lead.name}، معك مركز صادق للعلاج الطبيعي بطنجة. نود تأكيد موعد حصتك الخاصة بـ (${lead.service}) المحجوزة بتاريخ ${formattedDate}. هل هذا التوقيت لا يزال مناسباً لك؟`
      : `Bonjour ${lead.name}, c'est Ssadik Thérapie à Tanger. Je souhaite confirmer votre réservation pour la séance de (${lead.service}) demandée le ${formattedDate}. Est-ce que ce créneau vous convient toujours ?`;

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  };

  // Restrict leads per assistant maxDaysView rule
  const accessibleLeads = leads.filter(lead => {
    if (!userProfile || userProfile.role === 'admin') return true;
    
    const maxDays = userProfile.maxDaysView !== undefined ? userProfile.maxDaysView : 7;
    if (maxDays >= 3650) return true; // Unlimited
    
    if (!lead.date) return false;
    const leadDate = new Date(lead.date);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - maxDays);
    cutoffDate.setHours(0, 0, 0, 0);

    return leadDate >= cutoffDate;
  });

  // Filter by date first to compute stats for the active time period
  const dateFilteredLeads = accessibleLeads.filter(lead => {
    if (dateFilter === 'all') return true;
    if (!lead.date) return false;
    const leadDate = new Date(lead.date);
    const now = new Date();
    if (dateFilter === 'today') {
      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      return leadDate >= startOfToday;
    } else if (dateFilter === 'week') {
      const startOfWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return leadDate >= startOfWeek;
    } else if (dateFilter === 'month') {
      const startOfMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      return leadDate >= startOfMonth;
    }
    return true;
  });

  // Compute stats based on the selected date filter
  const totalCount = dateFilteredLeads.length;
  const pendingCount = dateFilteredLeads.filter(l => l.status === 'Pending').length;
  const confirmedCount = dateFilteredLeads.filter(l => l.status === 'Confirmed').length;
  const cancelledCount = dateFilteredLeads.filter(l => l.status === 'Cancelled').length;

  // Apply status filter and search query to get final list
  const filteredLeads = dateFilteredLeads.filter(lead => {
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchLower) || 
      lead.whatsapp.includes(searchLower) ||
      (lead.service && lead.service.toLowerCase().includes(searchLower));
    
    return matchesStatus && matchesSearch;
  });

  // Analytics helper functions
  const getEvolutionData = () => {
    const dailyMap = {};
    const sortedLeads = [...dateFilteredLeads].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    sortedLeads.forEach(lead => {
      if (!lead.date) return;
      const dateStr = lead.date.substring(0, 10);
      
      if (!dailyMap[dateStr]) {
        dailyMap[dateStr] = { 
          date: dateStr, 
          [dt.chartLeadTotal]: 0, 
          [dt.chartLeadConfirmed]: 0, 
          [dt.chartLeadCancelled]: 0 
        };
      }
      
      dailyMap[dateStr][dt.chartLeadTotal] += 1;
      if (lead.status === 'Confirmed') {
        dailyMap[dateStr][dt.chartLeadConfirmed] += 1;
      } else if (lead.status === 'Cancelled') {
        dailyMap[dateStr][dt.chartLeadCancelled] += 1;
      }
    });

    return Object.values(dailyMap).map(day => {
      let label = day.date;
      try {
        const d = new Date(day.date);
        label = d.toLocaleDateString(lang === 'ar' ? 'ar-MA' : 'fr-MA', {
          day: 'numeric',
          month: 'short'
        });
      } catch (e) {}
      
      return {
        ...day,
        label
      };
    });
  };

  const getServiceData = () => {
    const serviceMap = {};
    
    dateFilteredLeads.forEach(lead => {
      const serviceName = lead.service || 'Autre';
      if (!serviceMap[serviceName]) {
        serviceMap[serviceName] = { 
          service: serviceName, 
          [dt.chartLeadTotal]: 0, 
          [dt.chartLeadConfirmed]: 0 
        };
      }
      
      serviceMap[serviceName][dt.chartLeadTotal] += 1;
      if (lead.status === 'Confirmed') {
        serviceMap[serviceName][dt.chartLeadConfirmed] += 1;
      }
    });

    return Object.values(serviceMap).map(item => {
      const total = item[dt.chartLeadTotal];
      const confirmed = item[dt.chartLeadConfirmed];
      const cr = total > 0 ? Math.round((confirmed / total) * 100) : 0;
      return {
        ...item,
        [dt.conversionRateLabel]: cr
      };
    });
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-md p-3 border border-sand-200 shadow-lg rounded-xl text-start">
          <p className="text-xs font-black text-therapy-900 mb-1.5">{label}</p>
          <div className="space-y-1">
            {payload.map((entry, index) => (
              <p key={index} className="text-xs font-bold flex items-center gap-1.5" style={{ color: entry.color }}>
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }}></span>
                <span>{entry.name}: {entry.value}</span>
              </p>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const ServiceTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white/95 backdrop-blur-md p-3 border border-sand-200 shadow-lg rounded-xl text-start space-y-1">
          <p className="text-xs font-black text-therapy-900 mb-1.5">{label}</p>
          <p className="text-xs font-bold text-therapy-800">
            {dt.chartLeadTotal}: {data[dt.chartLeadTotal]}
          </p>
          <p className="text-xs font-bold text-green-600">
            {dt.chartLeadConfirmed}: {data[dt.chartLeadConfirmed]}
          </p>
          <p className="text-xs font-bold text-medical-600">
            {dt.conversionRateLabel}: {data[dt.conversionRateLabel]}%
          </p>
        </div>
      );
    }
    return null;
  };

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
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-black text-therapy-900 tracking-tight">
              {lang === 'ar' ? 'صادق للعلاج الطبيعي' : 'Ssadik Thérapie'}
            </h1>
            <p className="text-sm font-semibold text-sand-900/50 mt-1">Tanger, Maroc</p>
          </div>

          <div className="bg-white rounded-3xl p-6 md:p-8 border border-sand-200 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-medical-500 to-medical-700"></div>

            <h2 className="text-lg md:text-xl font-bold text-therapy-900 mb-6 flex items-center gap-2">
              <Lock className="w-5 h-5 text-medical-500" />
              <span>{dt.loginTitle}</span>
            </h2>

            <form onSubmit={handleLogin} className="space-y-5">
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

              <div className="flex flex-col space-y-1.5 text-start">
                <label className="text-xs font-bold text-therapy-900">
                  {dt.passwordLabel}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-sand-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full ps-10 pe-10 py-3 rounded-xl border border-sand-200 focus:outline-none focus:ring-2 focus:ring-medical-500 bg-sand-50/50 font-medium text-sm text-sand-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 end-0 flex items-center pe-3.5 text-sand-400 hover:text-therapy-900"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {loginError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-bold text-red-600 text-start flex items-center gap-2">
                  <XCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

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
    <div className="min-h-screen bg-sand-50 text-sand-900 flex flex-col font-sans relative" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Toast Notification Floating Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 start-1/2 -translate-x-1/2 z-50 bg-therapy-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-therapy-700 text-xs md:text-sm font-extrabold flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation Bar */}
      <header className="sticky top-0 bg-white border-b border-sand-200/60 z-20 shadow-sm px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          
          {/* Title, Brand & User Role Badge */}
          <div className="flex items-center gap-3">
            <div className="bg-medical-500 text-white p-2.5 rounded-2xl shadow-sm">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="text-start">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg md:text-xl font-black text-therapy-900 leading-tight">
                  {dt.title}
                </h1>
                {/* User Role Badge */}
                {userProfile?.role === 'admin' ? (
                  <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 font-black text-2xs rounded-full flex items-center gap-1">
                    <Crown className="w-3 h-3 text-amber-600" />
                    <span>{dt.roleAdmin}</span>
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-900 border border-emerald-300 font-black text-2xs rounded-full flex items-center gap-1">
                    <UserCog className="w-3 h-3 text-emerald-600" />
                    <span>{dt.roleAssistant}</span>
                  </span>
                )}
              </div>
              <p className="text-xs font-bold text-sand-400 mt-0.5">Tanger, Maroc • {user.email}</p>
            </div>
          </div>

          {/* Action buttons & Admin Navigation Tabs */}
          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-end">
            
            {/* Admin Tabs */}
            {userProfile?.role === 'admin' && (
              <div className="flex bg-sand-100 p-1 rounded-xl gap-1">
                <button
                  onClick={() => setActiveTab('reservations')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${
                    activeTab === 'reservations' 
                      ? 'bg-white text-therapy-900 shadow-sm' 
                      : 'text-sand-600 hover:text-therapy-900'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{dt.tabReservations}</span>
                </button>
                <button
                  onClick={() => setActiveTab('assistants')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${
                    activeTab === 'assistants' 
                      ? 'bg-white text-medical-700 shadow-sm' 
                      : 'text-sand-600 hover:text-therapy-900'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>{dt.tabAssistants}</span>
                </button>
              </div>
            )}

            {/* Language switch */}
            <button 
              onClick={() => setLang && setLang(lang === 'ar' ? 'fr' : 'ar')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-sand-100 hover:bg-sand-200 text-xs font-bold text-therapy-900 transition-colors"
            >
              <Globe className="w-4 h-4 text-medical-500" />
              <span>{lang === 'ar' ? 'Français' : 'عربي'}</span>
            </button>

            {/* Return to website */}
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

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Assistant Informative Banner */}
        {userProfile?.role === 'assistant' && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between gap-3 text-start">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-100 text-emerald-700 p-2 rounded-xl">
                <Info className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs md:text-sm font-extrabold text-emerald-950">
                  {dt.assistantNotice.replace('{days}', userProfile?.maxDaysView || 7)}
                </h4>
                <p className="text-2xs md:text-xs font-semibold text-emerald-800 mt-0.5">
                  {userProfile?.canEdit ? `✓ ${dt.permissionAllowed}` : `🔒 ${dt.permissionDenied}`}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: RESERVATIONS VIEW */}
        {activeTab === 'reservations' && (
          <>
            {/* STATS OVERVIEW CARDS - VISIBLE FOR ADMIN ONLY */}
            {userProfile?.role === 'admin' && (
              <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 md:p-6 rounded-2xl border border-sand-200 shadow-sm text-start flex items-center justify-between">
                  <div>
                    <p className="text-xs md:text-sm font-bold text-sand-400">{dt.statsTotal}</p>
                    <h3 className="text-2xl md:text-3xl font-black text-therapy-900 mt-1">{totalCount}</h3>
                  </div>
                  <div className="bg-sand-100 text-therapy-800 p-2.5 rounded-xl hidden sm:block">
                    <Calendar className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-white p-4 md:p-6 rounded-2xl border border-sand-200 shadow-sm text-start flex items-center justify-between">
                  <div>
                    <p className="text-xs md:text-sm font-bold text-sand-400">{dt.statsPending}</p>
                    <h3 className="text-2xl md:text-3xl font-black text-amber-600 mt-1">{pendingCount}</h3>
                  </div>
                  <div className="bg-amber-50 text-amber-600 p-2.5 rounded-xl hidden sm:block">
                    <Clock className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-white p-4 md:p-6 rounded-2xl border border-sand-200 shadow-sm text-start flex items-center justify-between">
                  <div>
                    <p className="text-xs md:text-sm font-bold text-sand-400">{dt.statsConfirmed}</p>
                    <h3 className="text-2xl md:text-3xl font-black text-green-600 mt-1">{confirmedCount}</h3>
                  </div>
                  <div className="bg-green-50 text-green-600 p-2.5 rounded-xl hidden sm:block">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                </div>

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
            )}

            {/* ANALYTICS SECTION - VISIBLE FOR ADMIN ONLY */}
            {userProfile?.role === 'admin' && (
              <section className="bg-white rounded-3xl border border-sand-200 shadow-md overflow-hidden text-start">
                <div className="p-4 md:p-6 border-b border-sand-200/60 flex justify-between items-center bg-sand-50/50">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <h2 className="text-base md:text-lg font-black text-therapy-900 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-medical-500" />
                      <span>{dt.analyticsTitle}</span>
                    </h2>
                    {totalCount > 0 && (
                      <span className="inline-flex items-center w-fit px-2.5 py-0.5 rounded-full text-xs font-bold bg-medical-50 text-medical-600 border border-medical-200">
                        {dt.conversionRateLabel}: {Math.round((confirmedCount / (totalCount || 1)) * 100)}%
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setShowAnalytics(!showAnalytics)}
                    className="text-xs font-extrabold text-medical-600 hover:text-medical-700 hover:underline flex items-center gap-1.5"
                  >
                    {showAnalytics ? dt.analyticsToggleHide : dt.analyticsToggleShow}
                  </button>
                </div>
                
                {showAnalytics && (
                  <div className="p-4 md:p-6">
                    {totalCount === 0 ? (
                      <div className="py-12 text-center text-sand-900/50 font-bold">
                        <TrendingUp className="w-12 h-12 mx-auto text-sand-300 mb-3" />
                        <p>{dt.noDataChart}</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Daily Evolution Chart */}
                        <div className="space-y-4">
                          <h3 className="text-sm font-bold text-therapy-900 px-1">
                            {dt.chartEvolutionTitle}
                          </h3>
                          <div className="h-[300px] w-full" dir="ltr">
                            <ResponsiveContainer width="100%" height="100%">
                              <AreaChart
                                data={getEvolutionData()}
                                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                              >
                                <defs>
                                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2}/>
                                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                                  </linearGradient>
                                  <linearGradient id="colorConfirmed" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                  </linearGradient>
                                  <linearGradient id="colorCancelled" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2}/>
                                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                                  </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                <XAxis 
                                  dataKey="label" 
                                  tick={{ fontSize: 10, fill: '#64748b', fontWeight: 'bold' }} 
                                  stroke="#e2e8f0"
                                />
                                <YAxis 
                                  tick={{ fontSize: 10, fill: '#64748b', fontWeight: 'bold' }}
                                  stroke="#e2e8f0" 
                                  allowDecimals={false}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend tick={{ fontSize: 11, fontWeight: 'bold' }} />
                                <Area 
                                  type="monotone" 
                                  dataKey={dt.chartLeadTotal} 
                                  stroke="#0ea5e9" 
                                  strokeWidth={2}
                                  fillOpacity={1} 
                                  fill="url(#colorTotal)" 
                                />
                                <Area 
                                  type="monotone" 
                                  dataKey={dt.chartLeadConfirmed} 
                                  stroke="#10b981" 
                                  strokeWidth={2}
                                  fillOpacity={1} 
                                  fill="url(#colorConfirmed)" 
                                />
                                <Area 
                                  type="monotone" 
                                  dataKey={dt.chartLeadCancelled} 
                                  stroke="#f43f5e" 
                                  strokeWidth={2}
                                  fillOpacity={1} 
                                  fill="url(#colorCancelled)" 
                                />
                              </AreaChart>
                            </ResponsiveContainer>
                          </div>
                        </div>

                        {/* Service Performance Chart */}
                        <div className="space-y-4">
                          <h3 className="text-sm font-bold text-therapy-900 px-1">
                            {dt.chartServiceTitle}
                          </h3>
                          <div className="h-[300px] w-full" dir="ltr">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart
                                data={getServiceData()}
                                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                <XAxis 
                                  dataKey="service" 
                                  tick={{ fontSize: 10, fill: '#64748b', fontWeight: 'bold' }} 
                                  stroke="#e2e8f0"
                                />
                                <YAxis 
                                  yAxisId="left"
                                  orientation="left"
                                  tick={{ fontSize: 10, fill: '#64748b', fontWeight: 'bold' }}
                                  stroke="#e2e8f0"
                                  allowDecimals={false}
                                />
                                <YAxis 
                                  yAxisId="right"
                                  orientation="right"
                                  domain={[0, 100]}
                                  tick={{ fontSize: 10, fill: '#0ea5e9', fontWeight: 'bold' }}
                                  stroke="#e2e8f0"
                                  unit="%"
                                />
                                <Tooltip content={<ServiceTooltip />} />
                                <Legend tick={{ fontSize: 11, fontWeight: 'bold' }} />
                                <Bar 
                                  yAxisId="left"
                                  dataKey={dt.chartLeadTotal} 
                                  fill="#cbd5e1" 
                                  radius={[4, 4, 0, 0]}
                                  maxBarSize={30}
                                />
                                <Bar 
                                  yAxisId="left"
                                  dataKey={dt.chartLeadConfirmed} 
                                  fill="#10b981" 
                                  radius={[4, 4, 0, 0]}
                                  maxBarSize={30}
                                />
                                <Bar 
                                  yAxisId="right"
                                  dataKey={dt.conversionRateLabel} 
                                  fill="#0ea5e9" 
                                  radius={[4, 4, 0, 0]}
                                  maxBarSize={20}
                                />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </section>
            )}

            {/* SEARCH AND FILTERS CONTROLS */}
            <section className="bg-white rounded-3xl p-4 md:p-6 border border-sand-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="relative w-full lg:w-80">
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

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
                <div className="flex bg-sand-100 p-1 rounded-xl gap-1 overflow-x-auto max-w-full flex-1 sm:flex-initial">
                  {[
                    { key: 'All', label: dt.filterAll },
                    { key: 'Pending', label: dt.filterPending },
                    { key: 'Confirmed', label: dt.filterConfirmed },
                    { key: 'Cancelled', label: dt.filterCancelled }
                  ].map(tab => (
                    <button
                      key={tab.key}
                      onClick={() => setStatusFilter(tab.key)}
                      className={`flex-1 sm:flex-initial px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-bold transition-all whitespace-nowrap ${
                        statusFilter === tab.key 
                          ? 'bg-white text-therapy-900 shadow-sm' 
                          : 'text-sand-900/60 hover:text-therapy-900'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="flex bg-sand-100 p-1 rounded-xl gap-1 overflow-x-auto max-w-full flex-1 sm:flex-initial">
                  {[
                    { key: 'all', label: dt.filterDateAll },
                    { key: 'today', label: dt.filterDateToday },
                    { key: 'week', label: dt.filterDateWeek },
                    { key: 'month', label: dt.filterDateMonth }
                  ].map(tab => (
                    <button
                      key={tab.key}
                      onClick={() => setDateFilter(tab.key)}
                      className={`flex-1 sm:flex-initial px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-bold transition-all whitespace-nowrap ${
                        dateFilter === tab.key 
                          ? 'bg-white text-therapy-900 shadow-sm' 
                          : 'text-sand-900/60 hover:text-therapy-900'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* RESERVATIONS TABLE */}
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

                        const isEditingThisRow = editingLeadId === lead.id;

                        if (isEditingThisRow) {
                          return (
                            <tr key={lead.id} className="bg-medical-50/50 transition-colors border-l-4 border-l-medical-500">
                              {/* Editable Name */}
                              <td className="px-6 py-4 text-start font-bold text-therapy-900">
                                <input
                                  type="text"
                                  value={editingName}
                                  onChange={(e) => setEditingName(e.target.value)}
                                  className="w-full px-3 py-1.5 rounded-lg border border-medical-300 focus:ring-2 focus:ring-medical-500 text-sm font-bold bg-white text-sand-900"
                                />
                              </td>
                              
                              {/* WhatsApp Phone */}
                              <td className="px-6 py-4 text-start font-semibold text-sand-900/70">
                                <span className="dir-ltr inline-block text-sm">{lead.whatsapp}</span>
                              </td>

                              {/* Editable Service Select */}
                              <td className="px-6 py-4 text-start">
                                <select
                                  value={editingService}
                                  onChange={(e) => setEditingService(e.target.value)}
                                  className="px-3 py-1.5 rounded-lg border border-medical-300 focus:ring-2 focus:ring-medical-500 text-xs font-bold bg-white text-medical-700"
                                >
                                  {AVAILABLE_SERVICES.map(s => (
                                    <option key={s} value={s}>{s}</option>
                                  ))}
                                </select>
                              </td>

                              {/* Date */}
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

                              {/* Save / Cancel Buttons */}
                              <td className="px-6 py-4 text-center">
                                <div className="flex items-center justify-center gap-1.5">
                                  <button
                                    onClick={() => handleSaveEdit(lead.id)}
                                    title={dt.btnSave}
                                    className="px-3 py-1.5 bg-medical-500 hover:bg-medical-600 text-white rounded-lg font-extrabold text-xs shadow-sm flex items-center gap-1 transition-all"
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                    <span>{dt.btnSave}</span>
                                  </button>
                                  <button
                                    onClick={handleCancelEdit}
                                    title={dt.btnCancelEdit}
                                    className="px-2.5 py-1.5 bg-sand-200 hover:bg-sand-300 text-sand-800 rounded-lg font-bold text-xs flex items-center gap-1 transition-all"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        }

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
                                
                                {/* Edit Button */}
                                {(userProfile?.role === 'admin' || userProfile?.canEdit) && (
                                  <button
                                    onClick={() => handleStartEdit(lead)}
                                    title={dt.btnEdit}
                                    className="p-1.5 bg-therapy-50 hover:bg-therapy-100 border border-therapy-200 text-therapy-700 rounded-lg transition-colors flex items-center justify-center"
                                  >
                                    <Pencil className="w-4 h-4" />
                                  </button>
                                )}

                                {lead.status === 'Pending' ? (
                                  <>
                                    <button
                                      onClick={() => handleUpdateStatus(lead.id, 'Confirmed')}
                                      title={dt.btnConfirm}
                                      className="p-1.5 bg-green-50 hover:bg-green-100 border border-green-200 text-green-600 rounded-lg transition-colors"
                                    >
                                      <CheckCircle2 className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => handleUpdateStatus(lead.id, 'Cancelled')}
                                      title={dt.btnCancel}
                                      className="p-1.5 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 rounded-lg transition-colors"
                                    >
                                      <XCircle className="w-4 h-4" />
                                    </button>
                                  </>
                                ) : (
                                  <button
                                    onClick={() => handleUpdateStatus(lead.id, 'Pending')}
                                    title={dt.btnReset}
                                    className="p-1.5 bg-sand-100 hover:bg-sand-200 border border-sand-200 text-sand-600 rounded-lg transition-colors"
                                  >
                                    <Undo className="w-4 h-4" />
                                  </button>
                                )}

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

                      const isEditingThisCard = editingLeadId === lead.id;

                      if (isEditingThisCard) {
                        return (
                          <div key={lead.id} className="p-4 space-y-3 bg-medical-50/50 border-l-4 border-l-medical-500 text-start">
                            <div className="flex flex-col space-y-1">
                              <label className="text-xs font-bold text-therapy-900">{dt.colName}</label>
                              <input
                                type="text"
                                value={editingName}
                                onChange={(e) => setEditingName(e.target.value)}
                                className="w-full px-3 py-2 rounded-xl border border-medical-300 text-sm font-bold bg-white"
                              />
                            </div>
                            <div className="flex flex-col space-y-1">
                              <label className="text-xs font-bold text-therapy-900">{dt.colService}</label>
                              <select
                                value={editingService}
                                onChange={(e) => setEditingService(e.target.value)}
                                className="w-full px-3 py-2 rounded-xl border border-medical-300 text-xs font-bold bg-white text-medical-700"
                              >
                                {AVAILABLE_SERVICES.map(s => (
                                  <option key={s} value={s}>{s}</option>
                                ))}
                              </select>
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                              <button
                                onClick={handleCancelEdit}
                                className="px-3 py-1.5 bg-sand-200 text-sand-800 text-xs font-bold rounded-xl"
                              >
                                {dt.btnCancelEdit}
                              </button>
                              <button
                                onClick={() => handleSaveEdit(lead.id)}
                                className="px-4 py-1.5 bg-medical-500 text-white text-xs font-extrabold rounded-xl shadow-sm flex items-center gap-1"
                              >
                                <Check className="w-3.5 h-3.5" />
                                <span>{dt.btnSave}</span>
                              </button>
                            </div>
                          </div>
                        );
                      }

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

                          {/* Mobile Actions block */}
                          <div className="flex justify-between items-center pt-2 border-t border-sand-100">
                            <div className="flex gap-1.5">
                              <a
                                href={getWhatsAppLink(lead)}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-xl hover:bg-emerald-100 transition-colors"
                              >
                                <MessageSquare className="w-4 h-4" />
                                <span>WhatsApp</span>
                              </a>
                              {(userProfile?.role === 'admin' || userProfile?.canEdit) && (
                                <button
                                  onClick={() => handleStartEdit(lead)}
                                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-therapy-700 bg-therapy-50 border border-therapy-200 rounded-xl hover:bg-therapy-100 transition-colors"
                                >
                                  <Pencil className="w-3.5 h-3.5" />
                                  <span>{dt.btnEdit}</span>
                                </button>
                              )}
                            </div>

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
          </>
        )}

        {/* TAB 2: ASSISTANTS MANAGEMENT VIEW (ADMIN ONLY) */}
        {activeTab === 'assistants' && userProfile?.role === 'admin' && (
          <div className="space-y-8">
            
            {/* LIST OF ASSISTANTS TABLE */}
            <section className="bg-white rounded-3xl border border-sand-200 shadow-md p-6 text-start space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-sand-200/60 pb-4 gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-medical-100 text-medical-700 p-2.5 rounded-2xl">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-therapy-900">{dt.assistantsTitle}</h2>
                    <p className="text-xs text-sand-900/60 font-medium mt-0.5">
                      {lang === 'ar' ? 'إدارة البريد الإلكتروني، كلمة المرور، والصلاحيات لجميع الحسابات المسجلة' : 'Gestion des identifiants (email/mot de passe), des rôles et des autorisations d\'accès.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button
                    onClick={handleManualSync}
                    disabled={isSyncing}
                    title={lang === 'ar' ? 'مزامنة الحسابات مع قواعد البيانات' : 'Synchroniser les comptes'}
                    className="px-3.5 py-2.5 bg-sand-100 hover:bg-sand-200 text-therapy-900 font-bold rounded-2xl text-xs transition-all flex items-center gap-1.5 border border-sand-200"
                  >
                    <RefreshCw className={`w-4 h-4 text-medical-600 ${isSyncing ? 'animate-spin' : ''}`} />
                    <span>{lang === 'ar' ? 'مزامنة' : 'Synchroniser'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setAssistantError('');
                      setIsAddModalOpen(true);
                    }}
                    className="px-4 py-2.5 bg-medical-500 hover:bg-medical-600 text-white font-extrabold rounded-2xl text-xs shadow-md transition-all flex items-center gap-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>{lang === 'ar' ? 'إضافة مساعد جديد +' : 'Ajouter un Assistant +'}</span>
                  </button>
                </div>
              </div>

            {assistantsList.length === 0 ? (
              <div className="py-12 text-center text-sand-900/50 font-bold">
                <Users className="w-12 h-12 mx-auto text-sand-300 mb-3" />
                <p>{lang === 'ar' ? 'لا يوجد حسابات مساعدين مسجلة بعد' : 'Aucun compte assistant trouvé.'}</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-start border-collapse">
                  <thead>
                    <tr className="bg-sand-100 border-b border-sand-200 text-therapy-900 font-black text-xs uppercase">
                      <th className="px-6 py-4 text-start font-bold">{dt.colEmail}</th>
                      <th className="px-6 py-4 text-start font-bold">{dt.colPassword}</th>
                      <th className="px-6 py-4 text-start font-bold">{dt.colRole}</th>
                      <th className="px-6 py-4 text-start font-bold">{dt.colCanEdit}</th>
                      <th className="px-6 py-4 text-start font-bold">{dt.colMaxDays}</th>
                      <th className="px-6 py-4 text-center font-bold">{dt.colActions}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sand-200/70">
                    {assistantsList.map((assistant) => {
                      const isSelf = assistant.id === user.uid;
                      const isEditing = editingAssistantId === assistant.id;
                      const isPasswordVisible = visiblePasswords[assistant.id];

                      if (isEditing) {
                        return (
                          <tr key={assistant.id} className="bg-medical-50/50 transition-colors border-l-4 border-l-medical-500">
                            {/* Editable Email */}
                            <td className="px-6 py-4 text-start font-bold text-therapy-900">
                              <input
                                type="email"
                                value={editingAssistantEmail}
                                onChange={(e) => setEditingAssistantEmail(e.target.value)}
                                className="w-full px-3 py-1.5 rounded-lg border border-medical-300 focus:ring-2 focus:ring-medical-500 text-xs font-bold bg-white"
                              />
                            </td>

                            {/* Editable Password */}
                            <td className="px-6 py-4 text-start font-bold text-therapy-900">
                              <input
                                type="text"
                                placeholder="Nouveau mot de passe"
                                value={editingAssistantPassword}
                                onChange={(e) => setEditingAssistantPassword(e.target.value)}
                                className="w-full px-3 py-1.5 rounded-lg border border-medical-300 focus:ring-2 focus:ring-medical-500 text-xs font-bold bg-white"
                              />
                            </td>

                            {/* Role */}
                            <td className="px-6 py-4 text-start">
                              <span className="px-2.5 py-1 bg-sand-100 text-sand-800 font-bold text-2xs rounded-full">
                                {assistant.role || 'assistant'}
                              </span>
                            </td>

                            {/* CanEdit */}
                            <td className="px-6 py-4 text-start">
                              <span className="text-xs font-bold text-sand-500">-</span>
                            </td>

                            {/* MaxDays */}
                            <td className="px-6 py-4 text-start">
                              <span className="text-xs font-bold text-sand-500">-</span>
                            </td>

                            {/* Save / Cancel */}
                            <td className="px-6 py-4 text-center">
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  onClick={() => handleSaveEditAssistant(assistant.id)}
                                  className="px-3 py-1.5 bg-medical-500 hover:bg-medical-600 text-white rounded-lg font-extrabold text-xs shadow-sm flex items-center gap-1"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                  <span>{dt.btnSave}</span>
                                </button>
                                <button
                                  onClick={() => setEditingAssistantId(null)}
                                  className="px-2.5 py-1.5 bg-sand-200 hover:bg-sand-300 text-sand-800 rounded-lg font-bold text-xs flex items-center gap-1"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      }

                      return (
                        <tr key={assistant.id} className="hover:bg-sand-50/50 transition-colors">
                          {/* Email */}
                          <td className="px-6 py-4 text-start font-bold text-therapy-900">
                            <span className="dir-ltr inline-block">{assistant.email || "Compte Sans Email"}</span>
                            {isSelf && <span className="ms-2 px-2 py-0.5 bg-medical-50 text-medical-600 text-2xs font-extrabold rounded-full">Vous</span>}
                          </td>

                          {/* Password with reveal toggle */}
                          <td className="px-6 py-4 text-start text-xs font-semibold text-sand-900/70">
                            {assistant.password ? (
                              <div className="flex items-center gap-2">
                                <span className="font-mono dir-ltr">
                                  {isPasswordVisible ? assistant.password : '••••••••'}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => togglePasswordVisibility(assistant.id)}
                                  className="text-sand-400 hover:text-therapy-900"
                                >
                                  {isPasswordVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                </button>
                              </div>
                            ) : (
                              <span className="text-sand-400 italic text-2xs">Non affiché</span>
                            )}
                          </td>

                          {/* Role Selectable by Admin */}
                          <td className="px-6 py-4 text-start">
                            {isSelf ? (
                              <span className="px-2.5 py-1 bg-amber-100 text-amber-900 border border-amber-300 font-black text-2xs rounded-full inline-flex items-center gap-1">
                                <Crown className="w-3 h-3 text-amber-600" />
                                {dt.roleAdmin}
                              </span>
                            ) : (
                              <select
                                value={assistant.role || 'assistant'}
                                onChange={(e) => handleChangeUserRole(assistant.id, e.target.value)}
                                className="px-2.5 py-1 rounded-xl border border-sand-200 text-xs font-bold bg-white focus:ring-2 focus:ring-medical-500 text-therapy-900 shadow-sm"
                              >
                                <option value="assistant">{dt.roleAssistant}</option>
                                <option value="admin">{dt.roleAdmin}</option>
                              </select>
                            )}
                          </td>

                          {/* Toggle Edit Permission */}
                          <td className="px-6 py-4 text-start">
                            {assistant.role === 'admin' ? (
                              <span className="text-xs font-extrabold text-amber-700">Accès Total</span>
                            ) : (
                              <button
                                onClick={() => handleToggleCanEdit(assistant.id, assistant.canEdit !== false)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                                  assistant.canEdit !== false 
                                    ? 'bg-green-50 text-green-700 border-green-300 hover:bg-green-100' 
                                    : 'bg-red-50 text-red-700 border-red-300 hover:bg-red-100'
                                }`}
                              >
                                {assistant.canEdit !== false ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-green-600" />
                                    <span>{dt.permissionAllowed}</span>
                                  </>
                                ) : (
                                  <>
                                    <Lock className="w-3.5 h-3.5 text-red-600" />
                                    <span>{dt.permissionDenied}</span>
                                  </>
                                )}
                              </button>
                            )}
                          </td>

                          {/* Max Days View Select */}
                          <td className="px-6 py-4 text-start">
                            {assistant.role === 'admin' ? (
                              <span className="text-xs font-extrabold text-amber-700">Illimité</span>
                            ) : (
                              <select
                                value={assistant.maxDaysView !== undefined ? assistant.maxDaysView : 7}
                                onChange={(e) => handleChangeMaxDays(assistant.id, e.target.value)}
                                className="px-3 py-1.5 rounded-xl border border-sand-200 text-xs font-bold bg-sand-50 focus:ring-2 focus:ring-medical-500 text-therapy-900"
                              >
                                <option value={7}>{dt.daysOption7}</option>
                                <option value={14}>{dt.daysOption14}</option>
                                <option value={30}>{dt.daysOption30}</option>
                                <option value={90}>{dt.daysOption90}</option>
                                <option value={3650}>{dt.daysOptionAll}</option>
                              </select>
                            )}
                          </td>

                          {/* Actions: Edit / Delete */}
                          <td className="px-6 py-4 text-center">
                            {!isSelf && (
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  onClick={() => handleStartEditAssistant(assistant)}
                                  title={dt.btnEdit}
                                  className="p-1.5 bg-therapy-50 hover:bg-therapy-100 border border-therapy-200 text-therapy-700 rounded-lg transition-colors"
                                >
                                  <Pencil className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteAssistant(assistant)}
                                  title={dt.btnDeleteAccount}
                                  className="p-1.5 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 rounded-lg transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      )}

        {/* ADD ASSISTANT POPUP MODAL */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-therapy-900/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-sand-200 p-6 space-y-6 text-start relative animate-scale-up">
              <div className="flex items-center justify-between border-b border-sand-200 pb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-medical-500 text-white p-2.5 rounded-2xl shadow-sm">
                    <UserPlus className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-therapy-900">{dt.addAssistantTitle}</h3>
                    <p className="text-xs text-sand-900/60 font-medium mt-0.5">{dt.addAssistantDesc}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-2 text-sand-400 hover:text-therapy-900 hover:bg-sand-100 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateAssistant} className="space-y-4">
                {/* Email Input */}
                <div className="flex flex-col space-y-1.5 text-start">
                  <label className="text-xs font-bold text-therapy-900">{dt.newAssistantEmail}</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-sand-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="assistante@cabinet.com"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className="w-full ps-9 pe-3 py-2.5 rounded-xl border border-sand-200 text-xs font-medium focus:ring-2 focus:ring-medical-500 bg-sand-50/50"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="flex flex-col space-y-1.5 text-start">
                  <label className="text-xs font-bold text-therapy-900">{dt.newAssistantPassword}</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-sand-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full ps-9 pe-3 py-2.5 rounded-xl border border-sand-200 text-xs font-medium focus:ring-2 focus:ring-medical-500 bg-sand-50/50"
                    />
                  </div>
                </div>

                {/* Permissions & Max Days */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col space-y-1.5 text-start">
                    <label className="text-xs font-bold text-therapy-900">{dt.colCanEdit}</label>
                    <select
                      value={newCanEdit ? "true" : "false"}
                      onChange={(e) => setNewCanEdit(e.target.value === "true")}
                      className="w-full px-3 py-2.5 rounded-xl border border-sand-200 text-xs font-bold bg-sand-50/50 text-therapy-900"
                    >
                      <option value="true">{dt.permissionAllowed}</option>
                      <option value="false">{dt.permissionDenied}</option>
                    </select>
                  </div>

                  <div className="flex flex-col space-y-1.5 text-start">
                    <label className="text-xs font-bold text-therapy-900">{dt.colMaxDays}</label>
                    <select
                      value={newMaxDaysView}
                      onChange={(e) => setNewMaxDaysView(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-sand-200 text-xs font-bold bg-sand-50/50 text-therapy-900"
                    >
                      <option value="7">{dt.daysOption7}</option>
                      <option value="14">{dt.daysOption14}</option>
                      <option value="30">{dt.daysOption30}</option>
                      <option value="90">{dt.daysOption90}</option>
                      <option value="3650">{dt.daysOptionAll}</option>
                    </select>
                  </div>
                </div>

                {assistantError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-bold text-red-600 text-start flex items-center gap-2">
                    <XCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{assistantError}</span>
                  </div>
                )}

                {/* Submit & Cancel Buttons */}
                <div className="flex items-center justify-end gap-3 pt-3 border-t border-sand-200">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2.5 bg-sand-100 hover:bg-sand-200 text-sand-800 font-bold rounded-xl text-xs transition-colors"
                  >
                    {lang === 'ar' ? 'إلغاء' : 'Annuler'}
                  </button>
                  <button
                    type="submit"
                    disabled={isCreatingAssistant}
                    className="bg-medical-500 hover:bg-medical-600 text-white font-extrabold py-2.5 px-5 rounded-xl shadow-md transition-all text-xs flex items-center justify-center gap-1.5 disabled:bg-medical-300"
                  >
                    {isCreatingAssistant ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{dt.creatingAssistant}</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        <span>{dt.btnCreateAssistant}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
    </main>
  </div>
);
}
