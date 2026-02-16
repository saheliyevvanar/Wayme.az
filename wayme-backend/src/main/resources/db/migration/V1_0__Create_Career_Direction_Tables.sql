-- V1_0__Create_Career_Direction_Tables.sql
-- This file will be executed automatically by Flyway on application startup

CREATE TABLE IF NOT EXISTS career_directions (
    id BIGSERIAL PRIMARY KEY,
    direction_id VARCHAR(50) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(500),
    icon VARCHAR(100),
    color VARCHAR(100),
    bg VARCHAR(100),
    border VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS career_subcategories (
    id BIGSERIAL PRIMARY KEY,
    direction_id BIGINT NOT NULL,
    sub_category_id VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    skills VARCHAR(255),
    description VARCHAR(500),
    icon VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (direction_id) REFERENCES career_directions(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_career_directions (
    id BIGSERIAL PRIMARY KEY,
    personal_info_id BIGINT NOT NULL,
    career_direction_id BIGINT NOT NULL,
    sub_category_id BIGINT,
    selected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (personal_info_id) REFERENCES personal_info(id) ON DELETE CASCADE,
    FOREIGN KEY (career_direction_id) REFERENCES career_directions(id) ON DELETE CASCADE,
    FOREIGN KEY (sub_category_id) REFERENCES career_subcategories(id) ON DELETE SET NULL
);

-- Insert Career Directions if not exists
INSERT INTO career_directions (direction_id, title, description, icon, color, bg, border, created_at)
SELECT 'it', 'İnformasiya Texnologiyaları', 'IT və Proqramlaşdırma', 'Code2', 'text-blue-400', 'bg-blue-400/10', 'border-blue-400/20', NOW()
WHERE NOT EXISTS (SELECT 1 FROM career_directions WHERE direction_id = 'it');

INSERT INTO career_directions (direction_id, title, description, icon, color, bg, border, created_at)
SELECT 'data', 'Məlumat və Analitika', 'Data Science və Analytics', 'BarChart3', 'text-emerald-400', 'bg-emerald-400/10', 'border-emerald-400/20', NOW()
WHERE NOT EXISTS (SELECT 1 FROM career_directions WHERE direction_id = 'data');

INSERT INTO career_directions (direction_id, title, description, icon, color, bg, border, created_at)
SELECT 'marketing', 'Rəqəmsal Marketinq', 'Digital Marketing və SMM', 'Megaphone', 'text-pink-400', 'bg-pink-400/10', 'border-pink-400/20', NOW()
WHERE NOT EXISTS (SELECT 1 FROM career_directions WHERE direction_id = 'marketing');

INSERT INTO career_directions (direction_id, title, description, icon, color, bg, border, created_at)
SELECT 'design', 'Dizayn və Kreativ', 'UI/UX və Qrafik Dizayn', 'Brush', 'text-amber-400', 'bg-amber-400/10', 'border-amber-400/20', NOW()
WHERE NOT EXISTS (SELECT 1 FROM career_directions WHERE direction_id = 'design');

INSERT INTO career_directions (direction_id, title, description, icon, color, bg, border, created_at)
SELECT 'business', 'Biznes və İdarəetmə', 'İnsan Resursları və Məsləhətçilik', 'Briefcase', 'text-red-400', 'bg-red-400/10', 'border-red-400/20', NOW()
WHERE NOT EXISTS (SELECT 1 FROM career_directions WHERE direction_id = 'business');

INSERT INTO career_directions (direction_id, title, description, icon, color, bg, border, created_at)
SELECT 'sales', 'Satış və Müştəri Münasibətləri', 'B2B və B2C Satış', 'TrendingUp', 'text-green-400', 'bg-green-400/10', 'border-green-400/20', NOW()
WHERE NOT EXISTS (SELECT 1 FROM career_directions WHERE direction_id = 'sales');

INSERT INTO career_directions (direction_id, title, description, icon, color, bg, border, created_at)
SELECT 'legal', 'Hüquq və Komplains', 'Hüquq Müşaviri', 'ShieldAlert', 'text-purple-400', 'bg-purple-400/10', 'border-purple-400/20', NOW()
WHERE NOT EXISTS (SELECT 1 FROM career_directions WHERE direction_id = 'legal');

INSERT INTO career_directions (direction_id, title, description, icon, color, bg, border, created_at)
SELECT 'education', 'Təhsil və Məhsuliyyət', 'Müəllimlər və Kurslar', 'BookOpen', 'text-orange-400', 'bg-orange-400/10', 'border-orange-400/20', NOW()
WHERE NOT EXISTS (SELECT 1 FROM career_directions WHERE direction_id = 'education');

INSERT INTO career_directions (direction_id, title, description, icon, color, bg, border, created_at)
SELECT 'logistics', 'Logistika və Texhizat', 'Supply Chain və Logistics', 'ShieldCheck', 'text-cyan-400', 'bg-cyan-400/10', 'border-cyan-400/20', NOW()
WHERE NOT EXISTS (SELECT 1 FROM career_directions WHERE direction_id = 'logistics');

-- Insert IT Sub-Categories
INSERT INTO career_subcategories (direction_id, sub_category_id, title, skills, description, icon, created_at)
SELECT (SELECT id FROM career_directions WHERE direction_id = 'it'), 'frontend', 'Frontend proqramçı', 'HTML, CSS, JavaScript, React', 'İstifadəçinin gördüyü sayt və tətbiq hissəsini hazırlayır.', 'Code2', NOW()
WHERE NOT EXISTS (SELECT 1 FROM career_subcategories WHERE sub_category_id = 'frontend');

INSERT INTO career_subcategories (direction_id, sub_category_id, title, skills, description, icon, created_at)
SELECT (SELECT id FROM career_directions WHERE direction_id = 'it'), 'backend', 'Backend proqramçı', 'Node.js, Python, Java, SQL', 'Saytın arxa tərəfində işləyir.', 'Database', NOW()
WHERE NOT EXISTS (SELECT 1 FROM career_subcategories WHERE sub_category_id = 'backend');

INSERT INTO career_subcategories (direction_id, sub_category_id, title, skills, description, icon, created_at)
SELECT (SELECT id FROM career_directions WHERE direction_id = 'it'), 'fullstack', 'Full-stack proqramçı', 'Frontend + Backend', 'Həm frontend, həm backend işlərini görür.', 'Code2', NOW()
WHERE NOT EXISTS (SELECT 1 FROM career_subcategories WHERE sub_category_id = 'fullstack');

INSERT INTO career_subcategories (direction_id, sub_category_id, title, skills, description, icon, created_at)
SELECT (SELECT id FROM career_directions WHERE direction_id = 'it'), 'mobile', 'Mobil tətbiq proqramçısı', 'Android, iOS, React Native', 'Telefon üçün tətbiqlər hazırlayır.', 'Code2', NOW()
WHERE NOT EXISTS (SELECT 1 FROM career_subcategories WHERE sub_category_id = 'mobile');

INSERT INTO career_subcategories (direction_id, sub_category_id, title, skills, description, icon, created_at)
SELECT (SELECT id FROM career_directions WHERE direction_id = 'it'), 'qa', 'Test mühəndisi (QA)', 'Testing, Automation', 'Proqramları yoxlayır ki, səhv işləməsin.', 'ShieldCheck', NOW()
WHERE NOT EXISTS (SELECT 1 FROM career_subcategories WHERE sub_category_id = 'qa');

INSERT INTO career_subcategories (direction_id, sub_category_id, title, skills, description, icon, created_at)
SELECT (SELECT id FROM career_directions WHERE direction_id = 'it'), 'devops', 'DevOps mühəndisi', 'Docker, Kubernetes, AWS', 'Proqramların serverdə problemsiz işləməsinə nəzarət edir.', 'ShieldCheck', NOW()
WHERE NOT EXISTS (SELECT 1 FROM career_subcategories WHERE sub_category_id = 'devops');

INSERT INTO career_subcategories (direction_id, sub_category_id, title, skills, description, icon, created_at)
SELECT (SELECT id FROM career_directions WHERE direction_id = 'it'), 'data-analyst', 'Data analitik', 'SQL, Python, Power BI', 'Məlumatlara baxıb nəticə çıxarır.', 'BarChart3', NOW()
WHERE NOT EXISTS (SELECT 1 FROM career_subcategories WHERE sub_category_id = 'data-analyst');

-- Insert Data Sub-Categories
INSERT INTO career_subcategories (direction_id, sub_category_id, title, skills, description, icon, created_at)
SELECT (SELECT id FROM career_directions WHERE direction_id = 'data'), 'data-analyst-2', 'Data analitik', 'Excel, SQL, Power BI', 'Rəqəmləri analiz edir, cədvəllərlə işləyir.', 'BarChart3', NOW()
WHERE NOT EXISTS (SELECT 1 FROM career_subcategories WHERE sub_category_id = 'data-analyst-2');

INSERT INTO career_subcategories (direction_id, sub_category_id, title, skills, description, icon, created_at)
SELECT (SELECT id FROM career_directions WHERE direction_id = 'data'), 'business-analyst', 'Biznes analitik', 'Business Analysis, Process', 'Biznes proseslərini analiz edir.', 'BarChart3', NOW()
WHERE NOT EXISTS (SELECT 1 FROM career_subcategories WHERE sub_category_id = 'business-analyst');

INSERT INTO career_subcategories (direction_id, sub_category_id, title, skills, description, icon, created_at)
SELECT (SELECT id FROM career_directions WHERE direction_id = 'data'), 'bi-specialist', 'BI mütəxəssisi', 'Tableau, Power BI', 'Rəhbərlik üçün qrafiklər və hesabatlar hazırlayır.', 'BarChart3', NOW()
WHERE NOT EXISTS (SELECT 1 FROM career_subcategories WHERE sub_category_id = 'bi-specialist');

INSERT INTO career_subcategories (direction_id, sub_category_id, title, skills, description, icon, created_at)
SELECT (SELECT id FROM career_directions WHERE direction_id = 'data'), 'data-scientist', 'Data scientist', 'Python, Machine Learning, AI', 'Böyük məlumatlarla işləyir, proqnozlar verir.', 'BarChart3', NOW()
WHERE NOT EXISTS (SELECT 1 FROM career_subcategories WHERE sub_category_id = 'data-scientist');

-- Insert Marketing Sub-Categories
INSERT INTO career_subcategories (direction_id, sub_category_id, title, skills, description, icon, created_at)
SELECT (SELECT id FROM career_directions WHERE direction_id = 'marketing'), 'smm', 'Sosial media meneceri', 'Instagram, TikTok, Facebook', 'Sosial şəbəkə hesablarını idarə edir.', 'Megaphone', NOW()
WHERE NOT EXISTS (SELECT 1 FROM career_subcategories WHERE sub_category_id = 'smm');

INSERT INTO career_subcategories (direction_id, sub_category_id, title, skills, description, icon, created_at)
SELECT (SELECT id FROM career_directions WHERE direction_id = 'marketing'), 'performance', 'Performans marketinq', 'Google Ads, Facebook Ads', 'Reklam kampaniyalarını idarə edir.', 'Megaphone', NOW()
WHERE NOT EXISTS (SELECT 1 FROM career_subcategories WHERE sub_category_id = 'performance');

INSERT INTO career_subcategories (direction_id, sub_category_id, title, skills, description, icon, created_at)
SELECT (SELECT id FROM career_directions WHERE direction_id = 'marketing'), 'seo', 'SEO mütəxəssisi', 'SEO, Google Analytics', 'Saytın axtarış sistemlərində tapılmasını təmin edir.', 'Megaphone', NOW()
WHERE NOT EXISTS (SELECT 1 FROM career_subcategories WHERE sub_category_id = 'seo');

INSERT INTO career_subcategories (direction_id, sub_category_id, title, skills, description, icon, created_at)
SELECT (SELECT id FROM career_directions WHERE direction_id = 'marketing'), 'content', 'Kontent meneceri', 'Content Strategy, Copywriting', 'Məzmun strategiyasını hazırlayır.', 'PenLine', NOW()
WHERE NOT EXISTS (SELECT 1 FROM career_subcategories WHERE sub_category_id = 'content');

INSERT INTO career_subcategories (direction_id, sub_category_id, title, skills, description, icon, created_at)
SELECT (SELECT id FROM career_directions WHERE direction_id = 'marketing'), 'brand', 'Brend meneceri', 'Brand Strategy, Marketing', 'Brendin imicini formalaşdırır.', 'Briefcase', NOW()
WHERE NOT EXISTS (SELECT 1 FROM career_subcategories WHERE sub_category_id = 'brand');

-- Insert Design Sub-Categories
INSERT INTO career_subcategories (direction_id, sub_category_id, title, skills, description, icon, created_at)
SELECT (SELECT id FROM career_directions WHERE direction_id = 'design'), 'ui-ux', 'UI/UX dizayner', 'Figma, Sketch, Adobe XD', 'İstifadəçi interfeysi və təcrübəsini dizayn edir.', 'Brush', NOW()
WHERE NOT EXISTS (SELECT 1 FROM career_subcategories WHERE sub_category_id = 'ui-ux');

INSERT INTO career_subcategories (direction_id, sub_category_id, title, skills, description, icon, created_at)
SELECT (SELECT id FROM career_directions WHERE direction_id = 'design'), 'graphic', 'Qrafik dizayner', 'Photoshop, Illustrator', 'Vizuallar və reklam materialları hazırlayır.', 'Brush', NOW()
WHERE NOT EXISTS (SELECT 1 FROM career_subcategories WHERE sub_category_id = 'graphic');

INSERT INTO career_subcategories (direction_id, sub_category_id, title, skills, description, icon, created_at)
SELECT (SELECT id FROM career_directions WHERE direction_id = 'design'), 'product-design', 'Məhsul dizayneri', 'Product Design', 'Məhsulun dizaynını hazırlayır.', 'Brush', NOW()
WHERE NOT EXISTS (SELECT 1 FROM career_subcategories WHERE sub_category_id = 'product-design');

INSERT INTO career_subcategories (direction_id, sub_category_id, title, skills, description, icon, created_at)
SELECT (SELECT id FROM career_directions WHERE direction_id = 'design'), 'motion', 'Motion dizayner', 'After Effects, Animation', 'Animasiyalar və hərəkətli qrafika hazırlayır.', 'Brush', NOW()
WHERE NOT EXISTS (SELECT 1 FROM career_subcategories WHERE sub_category_id = 'motion');

-- Insert Business Sub-Categories
INSERT INTO career_subcategories (direction_id, sub_category_id, title, skills, description, icon, created_at)
SELECT (SELECT id FROM career_directions WHERE direction_id = 'business'), 'project-manager', 'Layihə meneceri', 'Project Management, Agile', 'Layihənin vaxtında və büdcə daxilində başa çatmasını təmin edir.', 'Briefcase', NOW()
WHERE NOT EXISTS (SELECT 1 FROM career_subcategories WHERE sub_category_id = 'project-manager');

INSERT INTO career_subcategories (direction_id, sub_category_id, title, skills, description, icon, created_at)
SELECT (SELECT id FROM career_directions WHERE direction_id = 'business'), 'product-manager', 'Məhsul meneceri', 'Product Strategy, Analytics', 'Məhsulun inkişafı və bazara gəlişini idarə edir.', 'Briefcase', NOW()
WHERE NOT EXISTS (SELECT 1 FROM career_subcategories WHERE sub_category_id = 'product-manager');

INSERT INTO career_subcategories (direction_id, sub_category_id, title, skills, description, icon, created_at)
SELECT (SELECT id FROM career_directions WHERE direction_id = 'business'), 'hr-specialist', 'HR mütəxəssisi', 'HR Management, Recruitment', 'Əməkdaş seçimi və insan resursları idarəsində işləyir.', 'Users', NOW()
WHERE NOT EXISTS (SELECT 1 FROM career_subcategories WHERE sub_category_id = 'hr-specialist');

INSERT INTO career_subcategories (direction_id, sub_category_id, title, skills, description, icon, created_at)
SELECT (SELECT id FROM career_directions WHERE direction_id = 'business'), 'consultant', 'Biznes məsləhətçi', 'Business Consulting, Strategy', 'Şirkətlərə rəhbərlik edir, strategiya hazırlayır.', 'Briefcase', NOW()
WHERE NOT EXISTS (SELECT 1 FROM career_subcategories WHERE sub_category_id = 'consultant');

-- Insert Sales Sub-Categories
INSERT INTO career_subcategories (direction_id, sub_category_id, title, skills, description, icon, created_at)
SELECT (SELECT id FROM career_directions WHERE direction_id = 'sales'), 'sales-rep', 'Satış Nümayəndəsi', 'Sales, Negotiation, CRM', 'Məhsul və xidmətləri satmaq üçün müştərilərə yaxınlaşır.', 'TrendingUp', NOW()
WHERE NOT EXISTS (SELECT 1 FROM career_subcategories WHERE sub_category_id = 'sales-rep');

INSERT INTO career_subcategories (direction_id, sub_category_id, title, skills, description, icon, created_at)
SELECT (SELECT id FROM career_directions WHERE direction_id = 'sales'), 'account-manager', 'Hesab Meneceri', 'Account Management, Client Relations', 'Mövcud müştərilərlə əlaqəni saxlayır və inkişafını təmin edir.', 'Users', NOW()
WHERE NOT EXISTS (SELECT 1 FROM career_subcategories WHERE sub_category_id = 'account-manager');

INSERT INTO career_subcategories (direction_id, sub_category_id, title, skills, description, icon, created_at)
SELECT (SELECT id FROM career_directions WHERE direction_id = 'sales'), 'business-dev', 'Biznes Fəaliyyət Meneceri', 'Business Development, Partnerships', 'Yeni müştəri və tərəfdaş imkanlarını axtarır.', 'TrendingUp', NOW()
WHERE NOT EXISTS (SELECT 1 FROM career_subcategories WHERE sub_category_id = 'business-dev');

-- Insert Legal Sub-Categories
INSERT INTO career_subcategories (direction_id, sub_category_id, title, skills, description, icon, created_at)
SELECT (SELECT id FROM career_directions WHERE direction_id = 'legal'), 'lawyer', 'Hüquq Müşaviri', 'Law, Legal Consulting', 'Hüquq sahəsində müşavirlik verir.', 'ShieldAlert', NOW()
WHERE NOT EXISTS (SELECT 1 FROM career_subcategories WHERE sub_category_id = 'lawyer');

INSERT INTO career_subcategories (direction_id, sub_category_id, title, skills, description, icon, created_at)
SELECT (SELECT id FROM career_directions WHERE direction_id = 'legal'), 'compliance', 'Müqavilə (Compliance) Mütəxəssisi', 'Compliance, Regulations', 'Şirkətin qanunlara uyğunluğunu təmin edir.', 'ShieldAlert', NOW()
WHERE NOT EXISTS (SELECT 1 FROM career_subcategories WHERE sub_category_id = 'compliance');

INSERT INTO career_subcategories (direction_id, sub_category_id, title, skills, description, icon, created_at)
SELECT (SELECT id FROM career_directions WHERE direction_id = 'legal'), 'contract-spec', 'Müqavil Mütəxəssisi', 'Contract Management', 'Müqavilələri hazırlayır və idarə edir.', 'ShieldAlert', NOW()
WHERE NOT EXISTS (SELECT 1 FROM career_subcategories WHERE sub_category_id = 'contract-spec');

-- Insert Education Sub-Categories
INSERT INTO career_subcategories (direction_id, sub_category_id, title, skills, description, icon, created_at)
SELECT (SELECT id FROM career_directions WHERE direction_id = 'education'), 'trainer', 'Trainer/Kurs Tərtibi', 'Training, Content Creation', 'Peşə kursları hazırlayır və tədris edir.', 'BookOpen', NOW()
WHERE NOT EXISTS (SELECT 1 FROM career_subcategories WHERE sub_category_id = 'trainer');

INSERT INTO career_subcategories (direction_id, sub_category_id, title, skills, description, icon, created_at)
SELECT (SELECT id FROM career_directions WHERE direction_id = 'education'), 'instructor', 'Təlim Meneceri', 'Instructional Design, E-learning', 'Əmələ gətirmə proqramlarını dizayn edir.', 'BookOpen', NOW()
WHERE NOT EXISTS (SELECT 1 FROM career_subcategories WHERE sub_category_id = 'instructor');

INSERT INTO career_subcategories (direction_id, sub_category_id, title, skills, description, icon, created_at)
SELECT (SELECT id FROM career_directions WHERE direction_id = 'education'), 'academic', 'Akademik Mentoru', 'Mentoring, Coaching', 'Tələbələri və praktikantları müşavirə edir.', 'Users', NOW()
WHERE NOT EXISTS (SELECT 1 FROM career_subcategories WHERE sub_category_id = 'academic');

-- Insert Logistics Sub-Categories
INSERT INTO career_subcategories (direction_id, sub_category_id, title, skills, description, icon, created_at)
SELECT (SELECT id FROM career_directions WHERE direction_id = 'logistics'), 'logistics-specialist', 'Logistika mütəxəssisi', 'Logistics, Planning', 'Daşımaları planlaşdırır.', 'ShieldCheck', NOW()
WHERE NOT EXISTS (SELECT 1 FROM career_subcategories WHERE sub_category_id = 'logistics-specialist');

INSERT INTO career_subcategories (direction_id, sub_category_id, title, skills, description, icon, created_at)
SELECT (SELECT id FROM career_directions WHERE direction_id = 'logistics'), 'supply-chain', 'Təchizat zənciri', 'Analytics, ERP', 'Təchizat proseslərini optimallaşdırır.', 'ShieldCheck', NOW()
WHERE NOT EXISTS (SELECT 1 FROM career_subcategories WHERE sub_category_id = 'supply-chain');

INSERT INTO career_subcategories (direction_id, sub_category_id, title, skills, description, icon, created_at)
SELECT (SELECT id FROM career_directions WHERE direction_id = 'logistics'), 'coordinator', 'Koordinator', 'Coordination', 'Əməliyyatları koordinasiya edir.', 'ShieldCheck', NOW()
WHERE NOT EXISTS (SELECT 1 FROM career_subcategories WHERE sub_category_id = 'coordinator');

INSERT INTO career_subcategories (direction_id, sub_category_id, title, skills, description, icon, created_at)
SELECT (SELECT id FROM career_directions WHERE direction_id = 'logistics'), 'procurement', 'Satınalma mütəxəssisi', 'Procurement', 'Satınalma proseslərini həyata keçirir.', 'ShieldCheck', NOW()
WHERE NOT EXISTS (SELECT 1 FROM career_subcategories WHERE sub_category_id = 'procurement');
