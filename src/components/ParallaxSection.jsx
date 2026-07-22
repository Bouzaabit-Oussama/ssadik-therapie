import React from 'react';
import { Users, ShieldCheck, Award, CheckCircle2 } from 'lucide-react';

export default function ParallaxSection({ t }) {
  const stats = [
    {
      id: 'patients',
      number: '5 000+',
      label: t?.parallax?.stat1 || (t?.langName === 'Français' ? 'مرضى تم علاجهم بنجاح' : 'Patients Soignés'),
      icon: Users,
    },
    {
      id: 'hygiene',
      number: '100%',
      label: t?.parallax?.stat2 || (t?.langName === 'Français' ? 'معدات معقمة وحديثة' : 'Matériel Stérile'),
      icon: ShieldCheck,
    },
    {
      id: 'specialties',
      number: '4',
      label: t?.parallax?.stat3 || (t?.langName === 'Français' ? 'تخصصات دقيقة وتكاملية' : 'Spécialités Soins'),
      icon: Award,
    },
    {
      id: 'satisfaction',
      number: '98%',
      label: t?.parallax?.stat4 || (t?.langName === 'Français' ? 'نسبة رضا واستحسان المرضى' : 'Satisfaction Client'),
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="w-full bg-gradient-to-r from-therapy-950 via-therapy-900 to-therapy-950 border-y border-therapy-800/80 py-6 my-6 shadow-lg relative overflow-hidden">
      {/* Soft Ambient Glow Effect */}
      <div className="absolute top-0 start-1/4 w-96 h-full bg-medical-500/10 blur-2xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 items-center">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="flex items-center justify-center gap-3 py-2 px-3 rounded-xl bg-gradient-to-r from-white/10 via-white/5 to-white/10 border border-white/15 backdrop-blur-sm hover:from-white/15 hover:to-white/10 transition-all shadow-sm"
              >
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-medical-500/30 to-medical-600/20 border border-medical-400/40 text-medical-300 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-start">
                  <span className="font-sans font-black text-lg md:text-xl text-white leading-none">
                    {stat.number}
                  </span>
                  <span className="text-[11px] md:text-xs font-semibold text-sand-200/90 leading-tight mt-0.5">
                    {stat.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
