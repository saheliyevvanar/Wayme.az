"use client";

import {
  BarChart3,
  Briefcase,
  Code2,
  Database,
  Megaphone,
  Brush,
  ShieldCheck,
  Users,
  PenLine,
} from "lucide-react";
import React, { useState } from "react";
import ProfessionModal from "./ProfessionModal";

const ProfessionCardsSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfession, setSelectedProfession] = useState<any>(null);

  const professions = [
    {
      title: "İnformasiya Texnologiyaları",
      description: "IT və Proqramlaşdırma",
      icon: Code2,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      border: "border-blue-400/20",
      subCategories: [
        { title: "Frontend proqramçı", skills: "HTML, CSS, JavaScript, React", description: "İstifadəçinin gördüyü sayt və tətbiq hissəsini hazırlayır. Düymələr, rənglər, formalar – hamısı onun işidir.", icon: Code2 },
        { title: "Backend proqramçı", skills: "Node.js, Python, Java, SQL", description: "Saytın arxa tərəfində işləyir. Məlumatların saxlanması, istifadəçi məlumatları, sistemin işləməsi onun işidir.", icon: Database },
        { title: "Full-stack proqramçı", skills: "Frontend + Backend", description: "Həm frontend, həm backend işlərini görür. Yəni saytı başdan sona qədər yığa bilir.", icon: Code2 },
        { title: "Mobil tətbiq proqramçısı", skills: "Android, iOS, React Native", description: "Telefon üçün tətbiqlər hazırlayır (Android / iOS). Instagram, bank tətbiqləri kimi proqramlar.", icon: Code2 },
        { title: "Test mühəndisi (QA)", skills: "Testing, Automation", description: "Proqramları yoxlayır ki, səhv işləməsin. 'Bu düymə niyə işləmir?' deyən adamdır.", icon: ShieldCheck },
        { title: "DevOps mühəndisi", skills: "Docker, Kubernetes, AWS", description: "Proqramların serverdə problemsiz işləməsinə nəzarət edir. Saytın çökməməsi onun məsuliyyətidir.", icon: ShieldCheck },
        { title: "Data analitik", skills: "SQL, Python, Power BI", description: "Məlumatlara baxıb nəticə çıxarır. 'İstifadəçilər nə edir, harada problem var?' suallarına cavab tapır.", icon: BarChart3 },
      ]
    },
    {
      title: "Məlumat və Analitika",
      description: "Data Science və Analytics",
      icon: BarChart3,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
      border: "border-emerald-400/20",
      subCategories: [
        { title: "Data analitik", skills: "Excel, SQL, Power BI", description: "Rəqəmləri analiz edir, cədvəllərlə işləyir. Qərar verməyə kömək edən məlumatlar hazırlayır.", icon: BarChart3 },
        { title: "Biznes analitik", skills: "Business Analysis, Process", description: "Biznes proseslərini analiz edir. 'Bu iş niyə ləng gedir, necə yaxşılaşdıraq?' suallarını araşdırır.", icon: BarChart3 },
        { title: "BI mütəxəssisi", skills: "Tableau, Power BI", description: "Rəhbərlik üçün qrafiklər və hesabatlar hazırlayır. Rəqəmləri vizual şəkildə göstərir.", icon: BarChart3 },
        { title: "Data scientist", skills: "Python, Machine Learning, AI", description: "Böyük məlumatlarla işləyir, proqnozlar verir. 'Gələcəkdə nə olacaq?' sualına cavab axtarır.", icon: BarChart3 },
      ]
    },
    {
      title: "Rəqəmsal Marketinq",
      description: "Digital Marketing və SMM",
      icon: Megaphone,
      color: "text-pink-400",
      bg: "bg-pink-400/10",
      border: "border-pink-400/20",
      subCategories: [
        { title: "Sosial media meneceri", skills: "Instagram, TikTok, Facebook", description: "Instagram, TikTok, Facebook səhifələrini idarə edir. Post paylaşır, mesajlara cavab verir.", icon: Megaphone },
        { title: "Performans marketinq mütəxəssisi", skills: "Google Ads, Facebook Ads", description: "Reklamları idarə edir. 'Reklama pul qoyduq, nəticəsi nə oldu?' buna baxır.", icon: Megaphone },
        { title: "SEO mütəxəssisi", skills: "SEO, Google Analytics", description: "Saytın Google-da yuxarı çıxması üçün çalışır. Axtarışda birinci səhifəyə düşmək onun işidir.", icon: Megaphone },
        { title: "Kontent meneceri", skills: "Content Strategy, Copywriting", description: "Mətn, şəkil, video planlayır və paylaşır. Sayt və sosial şəbəkələr üçün məzmun hazırlayır.", icon: PenLine },
        { title: "Brend meneceri", skills: "Brand Strategy, Marketing", description: "Brendin imicini qoruyur. Şirkət necə görünür, insanlar onu necə tanıyır – buna cavabdehdir.", icon: Briefcase },
      ]
    },
    {
      title: "Dizayn və Kreativ",
      description: "UI/UX və Qrafik Dizayn",
      icon: Brush,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
      border: "border-amber-400/20",
      subCategories: [
        { title: "UI/UX dizayner", skills: "Figma, Sketch, Adobe XD", description: "Sayt və tətbiqin həm gözəl, həm rahat olmasını təmin edir. İstifadəçi harada klikləməlidir – onu düşünür.", icon: Brush },
        { title: "Qrafik dizayner", skills: "Photoshop, Illustrator", description: "Poster, banner, loqo və vizuallar hazırlayır. Görünən dizayn işləri onun sahəsidir.", icon: Brush },
        { title: "Məhsul dizayneri", skills: "Product Design, Prototyping", description: "Məhsulun ümumi görünüşünü və istifadə rahatlığını dizayn edir. Dizayn + istifadəçi təcrübəsi birlikdədir.", icon: Brush },
        { title: "Motion dizayner", skills: "After Effects, Animation", description: "Hərəkətli dizaynlar hazırlayır. Animasiya və video effektlər onun işidir.", icon: Brush },
      ]
    },
    {
      title: "Biznes və İdarəetmə",
      description: "Management və Leadership",
      icon: Briefcase,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
      border: "border-purple-400/20",
      subCategories: [
        { title: "Layihə meneceri", skills: "Agile, Scrum, Jira", description: "Komandanın işini planlayır və izləyir. 'Kim nə vaxt nə etməlidir?' – buna cavab verir.", icon: Briefcase },
        { title: "Məhsul meneceri", skills: "Product Strategy, Roadmap", description: "Məhsulun nə olacağına qərar verir. İstifadəçi nə istəyir, məhsul necə inkişaf etməlidir – bunu düşünür.", icon: Briefcase },
        { title: "Əməliyyatlar meneceri", skills: "Operations, Process Management", description: "Gündəlik işlərin düzgün getməsinə nəzarət edir. Proseslərdə problem olmasın deyə çalışır.", icon: Briefcase },
        { title: "Biznesin inkişafı üzrə mütəxəssis", skills: "Business Development, Sales", description: "Yeni imkanlar tapır. Yeni müştərilər, yeni tərəfdaşlar onun işidir.", icon: Briefcase },
      ]
    },
    {
      title: "Maliyyə və Mühasibatlıq",
      description: "Finance və Accounting",
      icon: BarChart3,
      color: "text-red-400",
      bg: "bg-red-400/10",
      border: "border-red-400/20",
      subCategories: [
        { title: "Mühasib", skills: "Accounting, Excel", description: "Şirkətin pulunun giriş-çıxışını qeyd edir. Maaşlar, xərclər, sənədlər onun nəzarətindədir.", icon: BarChart3 },
        { title: "Maliyyə analitiki", skills: "Financial Analysis, Modeling", description: "Pulun necə idarə olunmasını analiz edir. 'Pul necə artsın?' sualına cavab axtarır.", icon: BarChart3 },
        { title: "Auditor", skills: "Audit, Compliance", description: "Maliyyə sənədlərini yoxlayır. Səhv və ya problem varmı – onu tapır.", icon: BarChart3 },
        { title: "Risk analitiki", skills: "Risk Management, Analysis", description: "Maliyyə risklərini əvvəlcədən görməyə çalışır. Zərər ehtimalını azaldır.", icon: BarChart3 },
      ]
    },
    {
      title: "Satış və Müştəri ilə iş",
      description: "Sales və Customer Success",
      icon: Users,
      color: "text-cyan-400",
      bg: "bg-cyan-400/10",
      border: "border-cyan-400/20",
      subCategories: [
        { title: "Satış meneceri", skills: "Sales, Negotiation", description: "Məhsul və ya xidməti satır. Müştəri tapır və razı salır.", icon: Users },
        { title: "Müştəri meneceri", skills: "Customer Relations, CRM", description: "Müştərilərlə əlaqəni saxlayır. Onların suallarına və problemlərinə baxır.", icon: Users },
        { title: "Müştəri dəstəyi üzrə mütəxəssis", skills: "Customer Support, Help Desk", description: "Müştərilərin problemlərini həll edir. Zənglərə və mesajlara cavab verir.", icon: Users },
        { title: "Müştəri uğuru meneceri", skills: "Customer Success, Retention", description: "Müştərinin məhsuldan razı qalmasını təmin edir. Uzunmüddətli münasibət qurur.", icon: Users },
      ]
    },
    {
      title: "Logistika və Təchizat",
      description: "Supply Chain və Logistics",
      icon: ShieldCheck,
      color: "text-indigo-400",
      bg: "bg-indigo-400/10",
      border: "border-indigo-400/20",
      subCategories: [
        { title: "Logistika mütəxəssisi", skills: "Logistics, Planning", description: "Yüklərin haradan hara gedəcəyini planlayır. Çatdırılmanın vaxtında olmasına baxır.", icon: ShieldCheck },
        { title: "Təchizat zənciri analitiki", skills: "Supply Chain, Analytics", description: "Məhsulun yolunu analiz edir. Harada gecikmə var, harada xərc çoxdur – onu tapır.", icon: ShieldCheck },
        { title: "Əməliyyatlar üzrə koordinator", skills: "Operations, Coordination", description: "Gündəlik daşınma işlərini koordinasiya edir. Sürücü, anbar, sənəd işlərini əlaqələndirir.", icon: ShieldCheck },
        { title: "Satınalma üzrə mütəxəssis", skills: "Procurement, Vendor Management", description: "Şirkət üçün lazım olan malları alır. Qiymət və keyfiyyətə nəzarət edir.", icon: ShieldCheck },
      ]
    },
    {
      title: "İnsan Resursları (HR)",
      description: "Human Resources və Talent",
      icon: Users,
      color: "text-orange-400",
      bg: "bg-orange-400/10",
      border: "border-orange-400/20",
      subCategories: [
        { title: "İnsan resursları üzrə mütəxəssis", skills: "HR, Employee Relations", description: "İşçilərlə bağlı sənədlər və proseslərlə məşğul olur. İşə qəbul, məzuniyyət, qaydalar və s.", icon: Users },
        { title: "İşə qəbul üzrə mütəxəssis (Recruiter)", skills: "Recruitment, Interviewing", description: "Yeni işçilər tapır və müsahibə aparır. Uyğun namizədi seçir.", icon: Users },
        { title: "Talent acquisition mütəxəssisi", skills: "Talent Strategy, Sourcing", description: "Uzunmüddətli istedad tapmağa fokuslanır. Güclü kadrları şirkətə cəlb edir.", icon: Users },
        { title: "HR biznes partnyoru", skills: "HR Strategy, Business Support", description: "Rəhbərliklə HR arasında körpü rolunu oynayır. Komandanın inkişafına kömək edir.", icon: Users },
      ]
    },
  ];

  const handleCardClick = (profession: any) => {
    setSelectedProfession(profession);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Small delay before clearing data to allow closing animation
    setTimeout(() => setSelectedProfession(null), 300);
  };

  return (
    <>
      <div className="rounded-[48px] bg-[#102A4D]/20 border border-white/5 p-10 md:p-14 flex flex-col items-center gap-12">
        <div className="text-center">
          <h2 className="text-3xl md:text-[34px] font-black text-gradient tracking-tight mb-3">
            Mövcud İstiqamətlər
          </h2>
          <p className="text-lg text-white/40 font-medium">
            Ən çox tələb olunan və perspektivli ixtisaslar
          </p>
        </div>

        <div className="grid w-full gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {professions.map((item) => (
            <div
              key={item.title}
              onClick={() => handleCardClick(item)}
              className={`group relative flex items-center gap-5 rounded-[24px] ${item.bg} p-5 transition-all hover:scale-[1.02] cursor-pointer hover:shadow-lg hover:shadow-${item.color}/20`}
            >
              {/* Hover glow */}
              <div className={`absolute -right-4 -top-4 h-16 w-16 rounded-full ${item.bg} blur-2xl transition-opacity opacity-0 group-hover:opacity-100`} />

              <div className="relative flex items-center gap-4">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${item.border} ${item.bg} transition-transform group-hover:scale-110`}>
                  <item.icon className={`h-5 w-5 ${item.color}`} />
                </div>
                <div className="flex flex-col">
                  <p className="text-[15px] font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </p>
                  <p className="text-[12px] text-slate-400 font-medium">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProfessionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        data={selectedProfession}
      />
    </>
  );
};



export default ProfessionCardsSection;

