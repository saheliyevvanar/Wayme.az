import {
    Code2,
    Database,
    BarChart3,
    Megaphone,
    Brush,
    ShieldCheck,
    Users,
    PenLine,
    Briefcase
} from "lucide-react";

export const professions = [
    {
        id: "it",
        title: "İnformasiya Texnologiyaları",
        description: "IT və Proqramlaşdırma",
        icon: "Code2",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        border: "border-blue-400/20",
        subCategories: [
            { id: "frontend", title: "Frontend proqramçı", skills: "HTML, CSS, JavaScript, React", description: "İstifadəçinin gördüyü sayt və tətbiq hissəsini hazırlayır.", icon: "Code2" },
            { id: "backend", title: "Backend proqramçı", skills: "Node.js, Python, Java, SQL", description: "Saytın arxa tərəfində işləyir.", icon: "Database" },
            { id: "fullstack", title: "Full-stack proqramçı", skills: "Frontend + Backend", description: "Həm frontend, həm backend işlərini görür.", icon: "Code2" },
            { id: "mobile", title: "Mobil tətbiq proqramçısı", skills: "Android, iOS, React Native", description: "Telefon üçün tətbiqlər hazırlayır.", icon: "Code2" },
            { id: "qa", title: "Test mühəndisi (QA)", skills: "Testing, Automation", description: "Proqramları yoxlayır ki, səhv işləməsin.", icon: "ShieldCheck" },
            { id: "devops", title: "DevOps mühəndisi", skills: "Docker, Kubernetes, AWS", description: "Proqramların serverdə problemsiz işləməsinə nəzarət edir.", icon: "ShieldCheck" },
            { id: "data-analyst", title: "Data analitik", skills: "SQL, Python, Power BI", description: "Məlumatlara baxıb nəticə çıxarır.", icon: "BarChart3" },
        ]
    },
    {
        id: "data",
        title: "Məlumat və Analitika",
        description: "Data Science və Analytics",
        icon: "BarChart3",
        color: "text-emerald-400",
        bg: "bg-emerald-400/10",
        border: "border-emerald-400/20",
        subCategories: [
            { id: "data-analyst-2", title: "Data analitik", skills: "Excel, SQL, Power BI", description: "Rəqəmləri analiz edir, cədvəllərlə işləyir.", icon: "BarChart3" },
            { id: "business-analyst", title: "Biznes analitik", skills: "Business Analysis, Process", description: "Biznes proseslərini analiz edir.", icon: "BarChart3" },
            { id: "bi-specialist", title: "BI mütəxəssisi", skills: "Tableau, Power BI", description: "Rəhbərlik üçün qrafiklər və hesabatlar hazırlayır.", icon: "BarChart3" },
            { id: "data-scientist", title: "Data scientist", skills: "Python, Machine Learning, AI", description: "Böyük məlumatlarla işləyir, proqnozlar verir.", icon: "BarChart3" },
        ]
    },
    {
        id: "marketing",
        title: "Rəqəmsal Marketinq",
        description: "Digital Marketing və SMM",
        icon: "Megaphone",
        color: "text-pink-400",
        bg: "bg-pink-400/10",
        border: "border-pink-400/20",
        subCategories: [
            { id: "smm", title: "Sosial media meneceri", skills: "Instagram, TikTok, Facebook", description: "Sosial şəbəkə hesablarını idarə edir.", icon: "Megaphone" },
            { id: "performance", title: "Performans marketinq", skills: "Google Ads, Facebook Ads", description: "Reklam kampaniyalarını idarə edir.", icon: "Megaphone" },
            { id: "seo", title: "SEO mütəxəssisi", skills: "SEO, Google Analytics", description: "Saytın axtarış sistemlərində tapılmasını təmin edir.", icon: "Megaphone" },
            { id: "content", title: "Kontent meneceri", skills: "Content Strategy, Copywriting", description: "Məzmun strategiyasını hazırlayır.", icon: "PenLine" },
            { id: "brand", title: "Brend meneceri", skills: "Brand Strategy, Marketing", description: "Brendin imicini formalaşdırır.", icon: "Briefcase" },
        ]
    },
    {
        id: "design",
        title: "Dizayn və Kreativ",
        description: "UI/UX və Qrafik Dizayn",
        icon: "Brush",
        color: "text-amber-400",
        bg: "bg-amber-400/10",
        border: "border-amber-400/20",
        subCategories: [
            { id: "ui-ux", title: "UI/UX dizayner", skills: "Figma, Sketch, Adobe XD", description: "İstifadəçi interfeysi və təcrübəsini dizayn edir.", icon: "Brush" },
            { id: "graphic", title: "Qrafik dizayner", skills: "Photoshop, Illustrator", description: "Vizuallar və reklam materialları hazırlayır.", icon: "Brush" },
            { id: "product-design", title: "Məhsul dizayneri", skills: "Product Design", description: "Məhsulun dizaynını hazırlayır.", icon: "Brush" },
            { id: "motion", title: "Motion dizayner", skills: "After Effects, Animation", description: "Animasiyalar və hərəkətli qrafika hazırlayır.", icon: "Brush" },
        ]
    },
    {
        id: "business",
        title: "Biznes və İdarəetmə",
        description: "Management və Leadership",
        icon: "Briefcase",
        color: "text-purple-400",
        bg: "bg-purple-400/10",
        border: "border-purple-400/20",
        subCategories: [
            { id: "project-manager", title: "Layihə meneceri", skills: "Agile, Scrum, Jira", description: "Layihələrin vaxtında təhvil verilməsini təmin edir.", icon: "Briefcase" },
            { id: "product-manager", title: "Məhsul meneceri", skills: "Product Strategy", description: "Məhsulun inkişaf yolunu müəyyən edir.", icon: "Briefcase" },
            { id: "operations", title: "Əməliyyatlar meneceri", skills: "Operations", description: "Gündəlik biznes proseslərini idarə edir.", icon: "Briefcase" },
            { id: "business-dev", title: "Biznes inkişafı", skills: "Sales, Strategy", description: "Yeni biznes imkanları yaradır.", icon: "Briefcase" },
        ]
    },
    {
        id: "finance",
        title: "Maliyyə və Mühasibatlıq",
        description: "Finance və Accounting",
        icon: "BarChart3",
        color: "text-red-400",
        bg: "bg-red-400/10",
        border: "border-red-400/20",
        subCategories: [
            { id: "accountant", title: "Mühasib", skills: "Accounting, Excel", description: "Maliyyə uçotunu aparır.", icon: "BarChart3" },
            { id: "financial-analyst", title: "Maliyyə analitiki", skills: "Financial Analysis", description: "Maliyyə göstəricilərini analiz edir.", icon: "BarChart3" },
            { id: "auditor", title: "Auditor", skills: "Audit, Compliance", description: "Daxili və xarici audit aparır.", icon: "BarChart3" },
            { id: "risk", title: "Risk analitiki", skills: "Risk Management", description: "Maliyyə risklərini qiymətləndirir.", icon: "BarChart3" },
        ]
    },
    {
        id: "sales",
        title: "Satış və Müştəri ilə iş",
        description: "Sales və Customer Success",
        icon: "Users",
        color: "text-cyan-400",
        bg: "bg-cyan-400/10",
        border: "border-cyan-400/20",
        subCategories: [
            { id: "sales-manager", title: "Satış meneceri", skills: "Sales, Negotiation", description: "Satış hədəflərini reallaşdırır.", icon: "Users" },
            { id: "account-manager", title: "Müştəri meneceri", skills: "CRM, Communication", description: "Müştilərlə əlaqələri idarə edir.", icon: "Users" },
            { id: "support", title: "Dəstək mütəxəssisi", skills: "Support, Zendesk", description: "Müştəri sorğularını cavablandırır.", icon: "Users" },
            { id: "success", title: "Müştəri uğuru", skills: "Retention, Upsell", description: "Müştəri məmnuniyyətini təmin edir.", icon: "Users" },
        ]
    },
    {
        id: "logistics",
        title: "Logistika və Təchizat",
        description: "Supply Chain və Logistics",
        icon: "ShieldCheck",
        color: "text-indigo-400",
        bg: "bg-indigo-400/10",
        border: "border-indigo-400/20",
        subCategories: [
            { id: "logistics-specialist", title: "Logistika mütəxəssisi", skills: "Logistics, Planning", description: "Daşımaları planlaşdırır.", icon: "ShieldCheck" },
            { id: "supply-chain", title: "Təchizat zənciri", skills: "Analytics, ERP", description: "Təchizat proseslərini optimallaşdırır.", icon: "ShieldCheck" },
            { id: "coordinator", title: "Koordinator", skills: "Coordination", description: "Əməliyyatları koordinasiya edir.", icon: "ShieldCheck" },
            { id: "procurement", title: "Satınalma mütəxəssisi", skills: "Procurement", description: "Satınalma proseslərini həyata keçirir.", icon: "ShieldCheck" },
        ]
    },
    {
        id: "hr",
        title: "İnsan Resursları (HR)",
        description: "Human Resources və Talent",
        icon: "Users",
        color: "text-orange-400",
        bg: "bg-orange-400/10",
        border: "border-orange-400/20",
        subCategories: [
            { id: "hr-specialist", title: "HR mütəxəssis", skills: "HRM, Admin", description: "HR sənədləşməsini aparır.", icon: "Users" },
            { id: "recruiter", title: "Recruiter", skills: "Sourcing, Interview", description: "İşəqəbul prosesini idarə edir.", icon: "Users" },
            { id: "talent", title: "Talent Acquisition", skills: "Strategy, Branding", description: "İstedadların cəlb olunmasını təmin edir.", icon: "Users" },
            { id: "hrbp", title: "HR Biznes Partnyor", skills: "Strategy, Culture", description: "Biznes hədəflərinə uyğun HR strategiyası qurur.", icon: "Users" },
        ]
    },
];
