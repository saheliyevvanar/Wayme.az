-- Insert Career Directions
INSERT INTO career_directions (direction_id, title, description, icon, color, bg, border, created_at) VALUES
('it', 'İnformasiya Texnologiyaları', 'IT və Proqramlaşdırma', 'Code2', 'text-blue-400', 'bg-blue-400/10', 'border-blue-400/20', NOW()),
('data', 'Məlumat və Analitika', 'Data Science və Analytics', 'BarChart3', 'text-emerald-400', 'bg-emerald-400/10', 'border-emerald-400/20', NOW()),
('marketing', 'Rəqəmsal Marketinq', 'Digital Marketing və SMM', 'Megaphone', 'text-pink-400', 'bg-pink-400/10', 'border-pink-400/20', NOW()),
('design', 'Dizayn və Kreativ', 'UI/UX və Qrafik Dizayn', 'Brush', 'text-amber-400', 'bg-amber-400/10', 'border-amber-400/20', NOW()),
('business', 'Biznes və İdarəetmə', 'İnsan Resursları və Məsləhətçilik', 'Briefcase', 'text-red-400', 'bg-red-400/10', 'border-red-400/20', NOW()),
('sales', 'Satış və Müştəri Münasibətləri', 'B2B və B2C Satış', 'TrendingUp', 'text-green-400', 'bg-green-400/10', 'border-green-400/20', NOW()),
('legal', 'Hüquq və Komplains', 'Hüquq Müşaviri', 'ShieldAlert', 'text-purple-400', 'bg-purple-400/10', 'border-purple-400/20', NOW()),
('education', 'Təhsil və Məhsuliyyət', 'Müəllimlər və Kurslar', 'BookOpen', 'text-orange-400', 'bg-orange-400/10', 'border-orange-400/20', NOW());

-- Insert Sub-Categories for IT
INSERT INTO career_subcategories (direction_id, sub_category_id, title, skills, description, icon, created_at) VALUES
((SELECT id FROM career_directions WHERE direction_id = 'it'), 'frontend', 'Frontend proqramçı', 'HTML, CSS, JavaScript, React', 'İstifadəçinin gördüyü sayt və tətbiq hissəsini hazırlayır.', 'Code2', NOW()),
((SELECT id FROM career_directions WHERE direction_id = 'it'), 'backend', 'Backend proqramçı', 'Node.js, Python, Java, SQL', 'Saytın arxa tərəfində işləyir.', 'Database', NOW()),
((SELECT id FROM career_directions WHERE direction_id = 'it'), 'fullstack', 'Full-stack proqramçı', 'Frontend + Backend', 'Həm frontend, həm backend işlərini görür.', 'Code2', NOW()),
((SELECT id FROM career_directions WHERE direction_id = 'it'), 'mobile', 'Mobil tətbiq proqramçısı', 'Android, iOS, React Native', 'Telefon üçün tətbiqlər hazırlayır.', 'Code2', NOW()),
((SELECT id FROM career_directions WHERE direction_id = 'it'), 'qa', 'Test mühəndisi (QA)', 'Testing, Automation', 'Proqramları yoxlayır ki, səhv işləməsin.', 'ShieldCheck', NOW()),
((SELECT id FROM career_directions WHERE direction_id = 'it'), 'devops', 'DevOps mühəndisi', 'Docker, Kubernetes, AWS', 'Proqramların serverdə problemsiz işləməsinə nəzarət edir.', 'ShieldCheck', NOW()),
((SELECT id FROM career_directions WHERE direction_id = 'it'), 'data-analyst', 'Data analitik', 'SQL, Python, Power BI', 'Məlumatlara baxıb nəticə çıxarır.', 'BarChart3', NOW());

-- Insert Sub-Categories for Data
INSERT INTO career_subcategories (direction_id, sub_category_id, title, skills, description, icon, created_at) VALUES
((SELECT id FROM career_directions WHERE direction_id = 'data'), 'data-analyst-2', 'Data analitik', 'Excel, SQL, Power BI', 'Rəqəmləri analiz edir, cədvəllərlə işləyir.', 'BarChart3', NOW()),
((SELECT id FROM career_directions WHERE direction_id = 'data'), 'business-analyst', 'Biznes analitik', 'Business Analysis, Process', 'Biznes proseslərini analiz edir.', 'BarChart3', NOW()),
((SELECT id FROM career_directions WHERE direction_id = 'data'), 'bi-specialist', 'BI mütəxəssisi', 'Tableau, Power BI', 'Rəhbərlik üçün qrafiklər və hesabatlar hazırlayır.', 'BarChart3', NOW()),
((SELECT id FROM career_directions WHERE direction_id = 'data'), 'data-scientist', 'Data scientist', 'Python, Machine Learning, AI', 'Böyük məlumatlarla işləyir, proqnozlar verir.', 'BarChart3', NOW());

-- Insert Sub-Categories for Marketing
INSERT INTO career_subcategories (direction_id, sub_category_id, title, skills, description, icon, created_at) VALUES
((SELECT id FROM career_directions WHERE direction_id = 'marketing'), 'smm', 'Sosial media meneceri', 'Instagram, TikTok, Facebook', 'Sosial şəbəkə hesablarını idarə edir.', 'Megaphone', NOW()),
((SELECT id FROM career_directions WHERE direction_id = 'marketing'), 'performance', 'Performans marketinq', 'Google Ads, Facebook Ads', 'Reklam kampaniyalarını idarə edir.', 'Megaphone', NOW()),
((SELECT id FROM career_directions WHERE direction_id = 'marketing'), 'seo', 'SEO mütəxəssisi', 'SEO, Google Analytics', 'Saytın axtarış sistemlərində tapılmasını təmin edir.', 'Megaphone', NOW()),
((SELECT id FROM career_directions WHERE direction_id = 'marketing'), 'content', 'Kontent meneceri', 'Content Strategy, Copywriting', 'Məzmun strategiyasını hazırlayır.', 'PenLine', NOW()),
((SELECT id FROM career_directions WHERE direction_id = 'marketing'), 'brand', 'Brend meneceri', 'Brand Strategy, Marketing', 'Brendin imicini formalaşdırır.', 'Briefcase', NOW());

-- Insert Sub-Categories for Design
INSERT INTO career_subcategories (direction_id, sub_category_id, title, skills, description, icon, created_at) VALUES
((SELECT id FROM career_directions WHERE direction_id = 'design'), 'ui-ux', 'UI/UX dizayner', 'Figma, Sketch, Adobe XD', 'İstifadəçi interfeysi və təcrübəsini dizayn edir.', 'Brush', NOW()),
((SELECT id FROM career_directions WHERE direction_id = 'design'), 'graphic', 'Qrafik dizayner', 'Photoshop, Illustrator', 'Vizuallar və reklam materialları hazırlayır.', 'Brush', NOW()),
((SELECT id FROM career_directions WHERE direction_id = 'design'), 'product-design', 'Məhsul dizayneri', 'Product Design', 'Məhsulun dizaynını hazırlayır.', 'Brush', NOW()),
((SELECT id FROM career_directions WHERE direction_id = 'design'), 'motion', 'Motion dizayner', 'After Effects, Animation', 'Animasiyalar və hərəkətli qrafika hazırlayır.', 'Brush', NOW());

-- Insert Sub-Categories for Business
INSERT INTO career_subcategories (direction_id, sub_category_id, title, skills, description, icon, created_at) VALUES
((SELECT id FROM career_directions WHERE direction_id = 'business'), 'project-manager', 'Layihə meneceri', 'Project Management, Agile', 'Layihənin vaxtında və büdcə daxilində başa çatmasını təmin edir.', 'Briefcase', NOW()),
((SELECT id FROM career_directions WHERE direction_id = 'business'), 'product-manager', 'Məhsul meneceri', 'Product Strategy, Analytics', 'Məhsulun inkişafı və bazara gəlişini idarə edir.', 'Briefcase', NOW()),
((SELECT id FROM career_directions WHERE direction_id = 'business'), 'hr-specialist', 'HR mütəxəssisi', 'HR Management, Recruitment', 'Əməkdaş seçimi və insan resursları idarəsində işləyir.', 'Users', NOW()),
((SELECT id FROM career_directions WHERE direction_id = 'business'), 'consultant', 'Biznes məsləhətçi', 'Business Consulting, Strategy', 'Şirkətlərə rəhbərlik edir, strategiya hazırlayır.', 'Briefcase', NOW());

-- Insert Sub-Categories for Sales
INSERT INTO career_subcategories (direction_id, sub_category_id, title, skills, description, icon, created_at) VALUES
((SELECT id FROM career_directions WHERE direction_id = 'sales'), 'sales-rep', 'Satış Nümayəndəsi', 'Sales, Negotiation, CRM', 'Məhsul və xidmətləri satmaq üçün müştərilərə yaxınlaşır.', 'TrendingUp', NOW()),
((SELECT id FROM career_directions WHERE direction_id = 'sales'), 'account-manager', 'Hesab Meneceri', 'Account Management, Client Relations', 'Mövcud müştərilərlə əlaqəni saxlayır və inkişafını təmin edir.', 'Users', NOW()),
((SELECT id FROM career_directions WHERE direction_id = 'sales'), 'business-dev', 'Biznes Fəaliyyət Meneceri', 'Business Development, Partnerships', 'Yeni müştəri və tərəfdaş imkanlarını axtarır.', 'TrendingUp', NOW());

-- Insert Sub-Categories for Legal
INSERT INTO career_subcategories (direction_id, sub_category_id, title, skills, description, icon, created_at) VALUES
((SELECT id FROM career_directions WHERE direction_id = 'legal'), 'lawyer', 'Hüquq Müşaviri', 'Law, Legal Consulting', 'Hüquq sahəsində müşavirlik verir.', 'ShieldAlert', NOW()),
((SELECT id FROM career_directions WHERE direction_id = 'legal'), 'compliance', 'Müqavilə (Compliance) Mütəxəssisi', 'Compliance, Regulations', 'Şirkətin qanunlara uyğunluğunu təmin edir.', 'ShieldAlert', NOW()),
((SELECT id FROM career_directions WHERE direction_id = 'legal'), 'contract-spec', 'Müqavil Mütəxəssisi', 'Contract Management', 'Müqavilələri hazırlayır və idarə edir.', 'ShieldAlert', NOW());

-- Insert Sub-Categories for Education
INSERT INTO career_subcategories (direction_id, sub_category_id, title, skills, description, icon, created_at) VALUES
((SELECT id FROM career_directions WHERE direction_id = 'education'), 'trainer', 'Trainer/Kurs Tərtibi', 'Training, Content Creation', 'Peşə kursları hazırlayır və tədris edir.', 'BookOpen', NOW()),
((SELECT id FROM career_directions WHERE direction_id = 'education'), 'instructor', 'Təlim Meneceri', 'Instructional Design, E-learning', 'Əmələ gətirmə proqramlarını dizayn edir.', 'BookOpen', NOW()),
((SELECT id FROM career_directions WHERE direction_id = 'education'), 'academic', 'Akademik Mentoru', 'Mentoring, Coaching', 'Tələbələri və praktikantları müşavirə edir.', 'Users', NOW());
