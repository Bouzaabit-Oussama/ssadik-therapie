import React, { useState } from 'react';
import { Tag, Sparkles, ShieldCheck, Clock, Check, ChevronRight, Droplet, Flame, Zap, Award, MessageSquare } from 'lucide-react';

export default function PricingCatalog({ t, onOpenModal }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const isAr = t.dir === 'rtl';

  const categories = [
    { id: 'all', label: isAr ? 'جميع الخدمات والعروض' : 'Toutes les Offres', icon: Sparkles },
    { id: 'packs', label: isAr ? 'الباقات والعروض المدمجة' : 'Packs Combinés', icon: Award },
    { id: 'massages', label: isAr ? 'أنواع المساج' : 'Massages & Massothérapie', icon: Flame },
    { id: 'sessions', label: isAr ? 'الجلسات العلاجية' : 'Séances Individuelles', icon: ShieldCheck },
    { id: 'cures', label: isAr ? 'العلاجات وحمام الرمل' : 'Cures & Bain de Sable', icon: Clock }
  ];

  // Brand-aligned solid tag style matching Ssadik Thérapie theme (Deep Bronze + Gold Border + Amber Text)
  const unifiedTagColor = 'bg-therapy-900 text-amber-300 border-2 border-amber-400/80 font-black shadow-md opacity-100';

  const items = [
    // --- COMBINED PACKS ---
    {
      id: 'pack-1',
      category: 'packs',
      title: {
        ar: 'مساج + حجامة ظهر',
        fr: 'Massage + Ventouses Dos',
        en: 'Relaxing Massage + Back Cupping'
      },
      desc: {
        ar: 'جلسة تدليك استرخائي للظهر مع حجامة طبية معقمة لتخفيف الآلام وتنشيط الدورة الدموية.',
        fr: 'Séance de massage décontractant du dos associée à une hijama stérile ciblée.'
      },
      price: 250,
      image: '/assets/service_1_massage_hijama_dos.webp',
      badge: { ar: 'الأكثر طلباً', fr: 'Très Populaire' },
      badgeColor: unifiedTagColor,
      popular: true,
      serviceKey: 'Massage + Hijama Dos (250 DH)'
    },
    {
      id: 'pack-2',
      category: 'packs',
      title: {
        ar: 'مساج + حجامة + كيروبراكتيك',
        fr: 'Massage + Ventouses + Chiropraxie',
        en: 'Massage + Cupping + Chiropractic'
      },
      desc: {
        ar: 'ثلاثي علاجي متكامل: مساج استرخائي، حجامة طبية، وتقويم عظمي للعمود الفقري.',
        fr: 'Le trio thérapeutique complet : massage, cupping et ajustement vertébral.'
      },
      price: 400,
      image: '/assets/service_2_massage_hijama_chiro.webp',
      badge: { ar: 'باقة متكاملة', fr: 'Pack Trio' },
      badgeColor: unifiedTagColor,
      popular: true,
      serviceKey: 'Massage + Hijama + Chiropraxie (400 DH)'
    },
    {
      id: 'pack-3',
      category: 'packs',
      title: {
        ar: 'مساج + حجامة كاملة',
        fr: 'Massage + Ventouses Complètes',
        en: 'Massage + Full Body Cupping'
      },
      desc: {
        ar: 'جلسة مساج شامل للجسم مع حجامة كاملة لتفريغ الشحنات وتطهير الدورة الدموية.',
        fr: 'Soin complet du corps alliant massothérapie et cupping thérapeutique intégral.'
      },
      price: 400,
      image: '/assets/service_3_massage_hijama_complete.webp',
      badge: { ar: 'عناية كاملة', fr: 'Soin Complet' },
      badgeColor: unifiedTagColor,
      serviceKey: 'Massage + Hijama Complète (400 DH)'
    },
    {
      id: 'pack-4',
      category: 'packs',
      title: {
        ar: 'مساج + حجامة كاملة + كيروبراكتيك',
        fr: 'Massage + Ventouses Complètes + Chiropraxie',
        en: 'Massage + Full Cupping + Chiropractic'
      },
      desc: {
        ar: 'الباقة الذهبية الملكية الشاملة لراحة وتوازن الجسم والعمود الفقري بنسبة 100%.',
        fr: 'Le pack prestige suprême pour une régénération physique et musculaire globale.'
      },
      price: 500,
      image: '/assets/service_4_pack_vip_gold.webp',
      badge: { ar: 'Pack VIP Premium', fr: 'Pack VIP Gold' },
      badgeColor: 'bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-therapy-950 border-2 border-yellow-200 font-black shadow-xl opacity-100',
      featured: true,
      serviceKey: 'Pack VIP Massage + Hijama Complète + Chiro (500 DH)'
    },

    // --- MASSAGES MENU ---
    {
      id: 'msg-1',
      category: 'massages',
      title: {
        ar: 'مساج استرخائي',
        fr: 'Massage Relaxant',
        en: 'Relaxing Swedish Massage'
      },
      desc: {
        ar: 'تدليك ناعم مهدئ للأعصاب باستخدام زيوت طبيعية عطرة لإزالة الإرهاق.',
        fr: 'Massage doux et apaisant aux huiles essentielles pour éliminer le stress.'
      },
      price: 300,
      image: '/assets/service_5_massage_relaxant.webp',
      badge: { ar: 'استرخاء عميق', fr: 'Relaxation' },
      badgeColor: unifiedTagColor,
      serviceKey: 'Massage Relaxant (300 DH)'
    },
    {
      id: 'msg-2',
      category: 'massages',
      title: {
        ar: 'مساج Tonic',
        fr: 'Massage Tonic',
        en: 'Vitality Tonic Massage'
      },
      desc: {
        ar: 'مساج ديناميكي قوي لتنشيط عضلات الجسم والدورة الدموية وإعادة الحيوية.',
        fr: 'Massage dynamique et tonifiant pour réactiver la circulation et l’énergie.'
      },
      price: 400,
      image: '/assets/service_6_massage_tonic.webp',
      badge: { ar: 'تنشيط و حيوية', fr: 'Tonic & Vitalité' },
      badgeColor: unifiedTagColor,
      serviceKey: 'Massage Tonic (400 DH)'
    },
    {
      id: 'msg-3',
      category: 'massages',
      title: {
        ar: 'مساج بالأحجار الساخنة',
        fr: 'Massage aux Pierres Chaudes',
        en: 'Hot Stone Thermal Therapy'
      },
      desc: {
        ar: 'علاج حراري فريد بأحجار بركانية ساخنة لفك التشنجات العضلية العميقة.',
        fr: 'Soin thermique aux pierres volcaniques chauffées pour dénouer les tensions.'
      },
      price: 300,
      image: '/assets/service_7_massage_pierres_chaudes.webp',
      badge: { ar: 'حرارة علاجية', fr: 'Pierres Chaudes' },
      badgeColor: unifiedTagColor,
      serviceKey: 'Massage aux Pierres Chaudes (300 DH)'
    },
    {
      id: 'msg-4',
      category: 'massages',
      title: {
        ar: 'مساج الوجه و الرأس',
        fr: 'Massage Crânien & Visage',
        en: 'Head & Facial Relaxation Massage'
      },
      desc: {
        ar: 'تدليك مركز لمنطقة الرأس والوجه والرقبة لتخفيف الصداع النصفي والضغط.',
        fr: 'Massage ciblé de la tête, du cou et du visage contre les migraines.'
      },
      price: 300,
      image: '/assets/service_8_massage_cranien.webp',
      badge: { ar: 'تخفيف الصداع', fr: 'Anti-Migraine' },
      badgeColor: unifiedTagColor,
      serviceKey: 'Massage Crânien & Visage (300 DH)'
    },
    {
      id: 'msg-5',
      category: 'massages',
      title: {
        ar: 'ريفلوكسولوجي',
        fr: 'Réflexologie Plantaire',
        en: 'Reflexology Therapy'
      },
      desc: {
        ar: 'ضغط علاجي محدد على نقاط الانعكاس في القدمين لتحفيز أعضاء الجسم.',
        fr: 'Pression thérapeutique sur les zones réflexes des pieds et mains.'
      },
      price: 300,
      image: '/assets/service_9_reflexologie.webp',
      badge: { ar: 'نقاط الضغط', fr: 'Reflexology' },
      badgeColor: unifiedTagColor,
      serviceKey: 'Réflexologie (300 DH)'
    },
    {
      id: 'msg-6',
      category: 'massages',
      title: {
        ar: 'مساج تيلاندي',
        fr: 'Massage Thaïlandais',
        en: 'Traditional Thai Massage'
      },
      desc: {
        ar: 'تدليك تايلاندي تقليدي يعتمد على التمدد والضغط لتحسين مرونة المفاصل.',
        fr: 'Technique ancestrale thaïlandaise de pression et d’étirement corporel.'
      },
      price: 500,
      image: '/assets/service_10_massage_thailandais.webp',
      badge: { ar: 'مرونة وتمدد', fr: 'Etirement & Thaï' },
      badgeColor: unifiedTagColor,
      serviceKey: 'Massage Thaïlandais (500 DH)'
    },
    {
      id: 'msg-7',
      category: 'massages',
      title: {
        ar: 'مساج رياضي',
        fr: 'Massage Sportif',
        en: 'Deep Tissue Sports Massage'
      },
      desc: {
        ar: 'تدليك عميق مخصص للرياضيين لتسريع استشفاء العضلات بعد المجهود البدني.',
        fr: 'Massage en profondeur recommandé avant ou après l’effort physique.'
      },
      price: 500,
      image: '/assets/service_11_massage_sportif.webp',
      badge: { ar: 'تفريغ العضلات', fr: 'Récupération Sport' },
      badgeColor: unifiedTagColor,
      serviceKey: 'Massage Sportif (500 DH)'
    },

    // --- INDIVIDUAL THERAPEUTIC SESSIONS ---
    {
      id: 'sec-1',
      category: 'sessions',
      title: {
        ar: 'حجامة علاجية',
        fr: 'Cupping Thérapeutique',
        en: 'Therapeutic Cupping'
      },
      desc: {
        ar: 'حجامة رطبة أو جافة معقمة 100% لعلاج الآلام الموضوعية وتطهير الدم.',
        fr: 'Hijama médicale stérile avec tasses à usage unique et désinfection totale.'
      },
      price: 200,
      image: '/assets/service_12_cupping_therapeutique.webp',
      badge: { ar: 'تخفيف الآلام', fr: 'Anti-Douleur' },
      badgeColor: unifiedTagColor,
      serviceKey: 'Hijama Thérapeutique (200 DH)'
    },
    {
      id: 'sec-2',
      category: 'sessions',
      title: {
        ar: 'حجامة رياضية للظهر',
        fr: 'Cupping Sportif Dos',
        en: 'Sports Back Cupping'
      },
      desc: {
        ar: 'حجامة مخصصة لمنطقة الظهر والكتفين لإزالة تشنجات الرياضيين.',
        fr: 'Ventouses dynamiques ciblées sur la chaîne musculaire dorsale.'
      },
      price: 250,
      image: '/assets/service_13_cupping_sportif.webp',
      badge: { ar: 'للرياضيين', fr: 'Pour Sportifs' },
      badgeColor: unifiedTagColor,
      serviceKey: 'Hijama Sportive Dos (250 DH)'
    },
    {
      id: 'sec-3',
      category: 'sessions',
      title: {
        ar: 'حجامة كاملة',
        fr: 'Cupping Corps Complet',
        en: 'Full Body Cupping'
      },
      desc: {
        ar: 'جلسة حجامة شاملة تغطي كافة نقاط الظهر والجسم لتحفيز المناعة.',
        fr: 'Séance de ventouses intégrale sur les points réflexes du corps.'
      },
      price: 300,
      image: '/assets/service_14_cupping_complet.webp',
      badge: { ar: 'تطهير الجسم', fr: 'Détox Corps' },
      badgeColor: unifiedTagColor,
      serviceKey: 'Hijama Complète (300 DH)'
    },
    {
      id: 'sec-4',
      category: 'sessions',
      title: {
        ar: 'حصة كيروبراكتيك',
        fr: 'Séance de Chiropraxie',
        en: 'Chiropractic Alignment Session'
      },
      desc: {
        ar: 'تعديل وتقويم يدوي دقيق لفقرات العمود الفقري والمفاصل.',
        fr: 'Ajustement chiropratique précis des sous-luxations vertébrales.'
      },
      price: 300,
      image: '/assets/service_15_seance_chiropraxie.webp',
      badge: { ar: 'محاذاة الفقرات', fr: 'Alignement Vertébral' },
      badgeColor: unifiedTagColor,
      serviceKey: 'Séance Chiropraxie (300 DH)'
    },
    {
      id: 'sec-5',
      category: 'sessions',
      title: {
        ar: 'حصة أوستيوباتي',
        fr: 'Séance d’Ostéopathie',
        en: 'Osteopathy Balance Session'
      },
      desc: {
        ar: 'علاج يدوي مكمل لإعادة التوازن الحركي والهيكلي لأنسجة وجسم المريض.',
        fr: 'Manipulations ostéopathiques douces pour restituer la mobilité.'
      },
      price: 400,
      image: '/assets/service_16_seance_osteopathie.webp',
      badge: { ar: 'إعادة التوازن', fr: 'Rééquilibrage' },
      badgeColor: unifiedTagColor,
      serviceKey: 'Séance Ostéopathie (400 DH)'
    },
    {
      id: 'sec-6',
      category: 'sessions',
      title: {
        ar: 'أبر صينية',
        fr: 'Acupuncture Chinoise',
        en: 'Medical Chinese Acupuncture'
      },
      desc: {
        ar: 'وخز بالإبر الطبية الدقيقة لتسكين الآلام المزمنة وتحفيز الطاقة الداخلية.',
        fr: 'Séance d’acupuncture médicale pour équilibrer le flux énergétique.'
      },
      price: 250,
      image: '/assets/service_17_acupuncture_chinoise.webp',
      badge: { ar: 'الوخز الطبي', fr: 'Acupuncture' },
      badgeColor: unifiedTagColor,
      serviceKey: 'Acupuncture Chinoise (250 DH)'
    },

    // --- CURES & SAND BATH ---
    {
      id: 'cure-1',
      category: 'cures',
      title: {
        ar: 'حمام الرمل مع مساج',
        fr: 'Bain de Sable Thérapique + Massage',
        en: 'Therapeutic Sand Bath + Massage'
      },
      desc: {
        ar: 'جلسة حمام رمل حراري طبيعي ممتاز لعلاج الروماتيزم متبوعة بمساج مهدئ.',
        fr: 'Soin thermal au sable chaud contre les rhumatismes suivi d’un massage.'
      },
      price: 800,
      image: '/assets/service_18_bain_de_sable_massage.webp',
      badge: { ar: 'علاج حراري فريد', fr: 'Soin Sable Thermal' },
      badgeColor: unifiedTagColor,
      popular: true,
      serviceKey: 'Hammam de Sable avec Massage (800 DH)'
    },
    {
      id: 'cure-2',
      category: 'cures',
      title: {
        ar: 'ثلاث حصص يومية',
        fr: 'Cure 3 Jours (3 Séances Quotidiennes)',
        en: '3-Day Intensive Rehab Cure'
      },
      desc: {
        ar: 'برنامج مكثف لمدة 3 أيام متتالية يشمل بروتوكول علاج فيزيائي وحجامة وتدليك.',
        fr: 'Programme thérapeutique intensif sur 3 jours consécutifs.'
      },
      price: 1950,
      image: '/assets/service_19_cure_3_jours.webp',
      badge: { ar: 'برنامج 3 أيام', fr: 'Cure 3 Jours' },
      badgeColor: unifiedTagColor,
      serviceKey: 'Cure 3 Jours (1950 DH)'
    },
    {
      id: 'cure-3',
      category: 'cures',
      title: {
        ar: 'خمس حصص يومية',
        fr: 'Cure 5 Jours (5 Séances Quotidiennes)',
        en: '5-Day Total Wellness Cure'
      },
      desc: {
        ar: 'برنامج العلاج والتعافي الشامل والعميق لمدة 5 أيام لعلاج الحالات المزمنة.',
        fr: 'Cure de régénération totale sur 5 jours pour les cas chroniques.'
      },
      price: 2950,
      image: '/assets/service_20_cure_5_jours.webp',
      badge: { ar: 'برنامج التعافي VIP', fr: 'Cure 5 Jours VIP' },
      badgeColor: unifiedTagColor,
      serviceKey: 'Cure 5 Jours (2950 DH)'
    }
  ];

  const filteredItems = activeCategory === 'all' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  return (
    <section id="pricing" className="relative py-24 bg-gradient-to-b from-sand-50/80 via-therapy-50/40 to-sand-50/80 scroll-mt-20 overflow-hidden">
      {/* Ambient background decoration */}
      <div className="absolute top-1/4 start-0 w-96 h-96 bg-amber-200/30 rounded-full filter blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-1/4 end-0 w-96 h-96 bg-medical-200/30 rounded-full filter blur-3xl opacity-50 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-800 text-xs sm:text-sm font-bold tracking-wide">
            <Sparkles className="w-4 h-4 text-amber-600 animate-pulse" />
            <span>{isAr ? 'أسعار شفافة وباقات حصريـة' : 'Tarifs Transparents & Packs Exclusifs'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-therapy-900 tracking-tight leading-tight">
            {isAr ? 'كتالوج الخدمات والأسعار' : 'Catalogue des Soins & Tarifs'}
          </h2>

          <p className="text-base sm:text-lg text-sand-800/90 font-medium max-w-2xl mx-auto">
            {isAr 
              ? 'اختر الخدمة أو الباقة المناسبة لاحتياجاتك الصحية. جميع الجلسات تتم تحت إشراف أخصائي معتمد ومعدات معقمة 100%.'
              : 'Découvrez nos tarifs clairs et nos formules combinées. Des soins sur mesure dispensés par nos experts à Tanger.'}
          </p>

          <div className="w-20 h-1.5 bg-gradient-to-r from-amber-400 via-medical-500 to-amber-500 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Category Filters Header Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-14">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 shadow-sm border ${
                  isActive
                    ? 'bg-therapy-900 text-amber-300 border-amber-400/60 shadow-lg scale-105 ring-2 ring-amber-400/30'
                    : 'bg-white/80 text-therapy-900/80 border-sand-200/80 hover:bg-white hover:border-amber-300 hover:text-therapy-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-medical-600'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => {
            const title = isAr ? item.title.ar : (item.title.fr || item.title.ar);
            const desc = isAr ? item.desc.ar : (item.desc.fr || item.desc.ar);
            const badge = isAr ? item.badge.ar : (item.badge.fr || item.badge.ar);

            return (
              <div
                key={item.id}
                className="relative bg-marble-prominent rounded-[2rem] p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 group shadow-omnidirectional hover:shadow-omnidirectional-hover border-2 border-amber-500/60 ring-1 ring-amber-300/30"
              >
                {/* Featured / VIP Prestige Header Badge */}
                {item.featured && (
                  <div className="absolute -top-3 inset-x-0 flex justify-center z-20">
                    <span className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-therapy-950 font-black text-[11px] px-4 py-0.5 rounded-full shadow-lg border border-yellow-100 tracking-wider">
                      ★ PRESTIGE VIP ★
                    </span>
                  </div>
                )}

                <div>
                  {/* Card Image Container Wrapper */}
                  <div className="relative w-full h-52 sm:h-56 mb-5 rounded-2xl overflow-visible">
                    {/* Inner 3px Metallic Gold Photo Frame */}
                    <div className="w-full h-full rounded-2xl overflow-hidden border-[3px] border-amber-400/90 shadow-[0_8px_25px_rgba(0,0,0,0.22)] relative">
                      <img
                        src={item.image}
                        alt={title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                      />
                      {/* Soft Ambient Vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10 pointer-events-none"></div>
                    </div>

                    {/* Top Left Metallic Brass Plaque Text Tag (Matches generated card design) */}
                    <div className="absolute top-3 start-3 z-20 p-[2px] rounded-full bg-gradient-to-b from-[#fce8a6] via-[#d4af37] to-[#785307] shadow-[0_6px_16px_rgba(0,0,0,0.35)] group-hover:scale-105 transition-transform duration-300">
                      <div className="bg-gradient-to-b from-[#fce8a6] via-[#c59b27] to-[#7a570c] rounded-full px-3.5 py-1 border border-[#fff4cc] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#301c07] fill-[#301c07]" />
                        <span className="text-[#301c07] font-black text-xs drop-shadow-[0_1px_0.5px_rgba(255,255,255,0.6)]">
                          {badge}
                        </span>
                      </div>
                    </div>
                    
                    {/* Top Right 3D Minted Gold Medallion Price Seal (Matches generated card design) */}
                    <div className="absolute -top-3 -end-3 z-30 w-20 h-20 sm:w-22 sm:h-22 p-[3px] rounded-full bg-gradient-to-b from-[#fce8a6] via-[#d4af37] to-[#785307] shadow-[0_10px_25px_rgba(0,0,0,0.45)] group-hover:scale-105 transition-transform duration-300">
                      <div className="w-full h-full rounded-full bg-[conic-gradient(from_180deg_at_50%_50%,#fef0be_0deg,#c4972e_45deg,#fce8a6_90deg,#8b6508_135deg,#fef0be_180deg,#c4972e_225deg,#fce8a6_270deg,#8b6508_315deg,#fef0be_360deg)] border-2 border-[#785307]/60 flex flex-col items-center justify-center relative overflow-hidden">
                        {/* Concentric Engraved Ring */}
                        <div className="absolute inset-1 rounded-full border border-[#fef3c7]/80 pointer-events-none"></div>
                        <span className="text-base sm:text-lg font-black text-[#3b2005] leading-none drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]">
                          {item.price}
                        </span>
                        <span className="text-[10px] sm:text-xs font-black text-[#4d2907] uppercase mt-0.5">
                          {isAr ? 'درهم' : 'DH'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl sm:text-2xl font-black text-therapy-900 mb-2 leading-tight group-hover:text-amber-600 transition-colors text-start">
                    {title}
                  </h3>

                  <p className="text-xs sm:text-sm text-sand-900/85 leading-relaxed mb-3 font-semibold text-start">
                    {desc}
                  </p>

                  {/* Gold Emblem Divider */}
                  <div className="flex items-center justify-center my-3 opacity-50">
                    <div className="h-px bg-amber-400/50 flex-1"></div>
                    <span className="px-2 text-amber-600 text-xs">⚜️</span>
                    <div className="h-px bg-amber-400/50 flex-1"></div>
                  </div>
                </div>

                {/* Card Footer: Gold CTA Button + Trust Badge matching user reference image */}
                <div className="pt-3 border-t border-amber-300/40 flex items-center justify-between mt-auto gap-2">
                  <div className="flex items-center gap-1 text-xs sm:text-sm text-therapy-900 font-extrabold">
                    <span>{isAr ? 'حجز فوري و معقم' : 'RDV Stérile & Rapide'}</span>
                    <Check className="w-4 h-4 text-amber-600 stroke-[3]" />
                  </div>

                  <button
                    onClick={() => onOpenModal(item.serviceKey)}
                    className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-therapy-950 font-black text-xs sm:text-sm px-4 py-2 rounded-xl shadow-md border border-yellow-200/90 transition-all group/btn hover:scale-105 active:scale-95"
                  >
                    <ChevronRight className="w-4 h-4 rtl:rotate-180 transition-transform group-hover/btn:translate-x-0.5 rtl:group-hover/btn:-translate-x-0.5" />
                    <span>{isAr ? 'حجز العرض' : 'Réserver'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassurance Banner Styled Matching Services Cards */}
        <div className="mt-16 relative bg-marble-prominent rounded-3xl p-6 sm:p-8 md:p-10 border border-amber-400/60 shadow-omnidirectional hover:shadow-omnidirectional-hover transition-all duration-300 group hover:-translate-y-1">
          {/* Subtle Ambient Glow Orbs */}
          <div className="absolute top-0 start-1/4 w-72 h-72 bg-medical-100/40 rounded-full filter blur-3xl opacity-60 pointer-events-none animate-float-slow"></div>
          <div className="absolute bottom-0 end-1/4 w-80 h-80 bg-sand-200/50 rounded-full filter blur-3xl opacity-60 pointer-events-none animate-float-delayed"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
            
            <div className="space-y-3 text-center md:text-start max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50/90 border border-amber-300 text-amber-800 font-extrabold text-xs tracking-wide shadow-2xs">
                <MessageSquare className="w-4 h-4 text-amber-600" />
                <span>{isAr ? 'استشارة طبية مخصصة' : 'Consultation Médicale Sur Mesure'}</span>
              </div>

              <h4 className="text-2xl sm:text-3xl font-extrabold text-therapy-900 leading-tight group-hover:text-amber-600 transition-colors">
                {isAr ? 'هل تحتاج إلى استشارة خاصة أو بروتوكول علاجي مخصص؟' : 'Besoin d’un Protocole Sur Mesure ?'}
              </h4>

              <p className="text-sm sm:text-base text-sand-900/85 font-medium leading-relaxed">
                {isAr
                  ? 'فريقنا الطبي المتخصص بطنجة جاهز لإجابتك وتكثيف الباقة المناسبة وفقاً لحالتك التشخيصية والبدنية.'
                  : 'Nos thérapeutes sont à votre écoute pour adapter nos formules selon votre bilan de santé.'}
              </p>
            </div>

            <button
              onClick={() => onOpenModal('Consultation Sur Mesure')}
              className="relative overflow-hidden group/btn whitespace-nowrap bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-therapy-950 font-black text-sm sm:text-base px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-yellow-200/90 flex items-center gap-3 animate-cta-attention active:scale-95"
            >
              {/* Liquid Gold Shine Reflection Sweep */}
              <span className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-25deg] animate-btn-shine pointer-events-none"></span>

              <span className="relative z-10">{isAr ? 'احجز استشارتك المخصصة مجاناً ✨' : 'Obtenez Votre Bilan Sur Mesure Gratuit ✨'}</span>
              <ChevronRight className="relative z-10 w-5 h-5 rtl:rotate-180 transition-transform group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
