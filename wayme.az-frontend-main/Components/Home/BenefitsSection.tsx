import { CheckCircle2 } from "lucide-react";
import React from "react";

type BenefitsSectionProps = {
    userCount: number;
};

const BenefitsSection = ({ userCount }: BenefitsSectionProps) => {
    const benefits = [
        {
            title: "Obyektiv qiymətləndirmə",
            description: "Psixoloji və peşəkar keyfiyyətlərinizin professional təhlili",
        },
        {
            title: "Şəxsi tövsiyələr",
            description: "Öyrənilməsi lazım olan konkret mövzular və inkişaf etdirilməsi lazım olan bacarıqlar",
        },
        {
            title: "Vizual statistika",
            description: "Nəticələrinizin və tərəqqinizin vizual təqdimatı",
        },
        {
            title: "PDF hesabat",
            description: "Gələcək istifadə üçün nəticələrlə ətraflı sənəd",
        },
    ];

    const stats = [
        {
            label: "İstifadəçi",
            value: `${userCount}`,
        },
        {
            label: "Sual",
            value: "30",
        },
        {
            label: "Dəqiqə",
            value: "10-15",
        },
        {
            label: "Pulsuz",
            value: "100%",
        },
    ];

    return (
        <section id="benefits" className="flex flex-col gap-20">
            <div className="flex flex-col gap-12">
                <h2 className="text-center text-3xl font-black text-gradient tracking-tight">
                    Nə əldə edəcəksiniz
                </h2>

                <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
                    {benefits.map((benefit) => (
                        <div key={benefit.title} className="flex items-start gap-4">
                            <div className="flex shrink-0 items-center justify-center pt-1">
                                <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-xl font-bold text-white">
                                    {benefit.title}
                                </h3>
                                <p className="text-sm text-white/40 leading-relaxed">
                                    {benefit.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {stats.map((item) => (
                    <div
                        key={item.label}
                        className="relative rounded-3xl bg-[#102A4D]/40 p-10 border border-white/10 flex flex-col items-center justify-center text-center group"
                    >
                        {/* Gradient Border Overlay (Simulated) */}
                        <div className="absolute inset-0 rounded-3xl border border-transparent bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" />

                        <p className="text-4xl font-black text-gradient mb-2">
                            {item.value}
                        </p>
                        <p className="text-xs font-bold text-white/40 tracking-widest">
                            {item.label}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BenefitsSection;

