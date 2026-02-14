import { Brain, GraduationCap, TrendingUp } from "lucide-react";
import React from "react";

const InsightCardsSection = () => {
  const cards = [
    {
      title: "Psixoloji təhlil",
      text: "Şəxsi keyfiyyətlərin, motivasiyanın və müxtəlif fəaliyyət növlərinə psixoloji hazırlığın qiymətləndirilməsi",
      icon: Brain,
      bg: "bg-[#1E3A8A]", // Dark Blue
      iconBox: "bg-[#3B82F6]" // Blue
    },
    {
      title: "Peşəkar qiymətləndirmə",
      text: "Seçilmiş sahədə hazırkı bilik və bacarıq səviyyəsinin inkişaf nöqtələrini müəyyən etmək üçün təhlili",
      icon: GraduationCap,
      bg: "bg-[#064E3B]", // Dark Green
      iconBox: "bg-[#10B981]" // Emerald
    },
    {
      title: "Şəxsi tövsiyələr",
      text: "Öyrənilməsi lazım olan konkret mövzular və təkmilləşdirilməsi lazım olan sahələrlə ətraflı inkişaf planı",
      icon: TrendingUp,
      bg: "bg-[#4C1D95]", // Dark Purple
      iconBox: "bg-[#8B5CF6]" // Purple
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`rounded-[32px] ${card.bg}/40 border border-white/5 p-8 flex flex-col gap-6 backdrop-blur-sm transition-all hover:bg-opacity-60`}
        >
          <div className="flex items-center gap-5">
            <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${card.iconBox} shadow-lg shadow-black/20`}>
              <card.icon className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white leading-tight">
              {card.title}
            </h3>
          </div>
          <p className="text-sm leading-relaxed text-white/60 font-medium">
            {card.text}
          </p>
        </div>
      ))}
    </div>
  );
};


export default InsightCardsSection;
