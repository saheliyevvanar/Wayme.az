-- V4_0__Create_AboutUs_Table.sql
CREATE TABLE IF NOT EXISTS about_us (
    id SERIAL PRIMARY KEY,
    section_type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(1000),
    icon_name VARCHAR(100),
    display_order INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default About Us content in Azerbaijani
INSERT INTO about_us (section_type, title, description, icon_name, display_order) VALUES
-- Mission
('mission', 'Missiyamız', 'Hər kəsə ən uyğun karyera yolunu tapmaqda kömək etmək üçün innovativ və obyektiv qiymətləndirmə sistemi təqdim edirik. Biz inanırıq ki, doğru istiqamətin seçilməsi uğurlu və məmnun edici karyeranın əsasıdır.', 'Target', 1),

-- Vision
('vision', 'Vizyonumuz', 'Azərbaycanda və regionda ən etibarlı karyera yönləndirmə platforması olmaq, hər bir insanın potensialını tam reallaşdırmasına kömək etmək.', 'Lightbulb', 1),

-- Values
('values', 'Obyektivlik', 'Elmi əsaslı yanaşma və qərəzsiz qiymətləndirmə', 'TrendingUp', 1),
('values', 'Əlçatanlıq', 'Hər kəs üçün pulsuz və asan istifadə imkanı', 'Heart', 2),
('values', 'Keyfiyyət', 'Yüksək standartlar və davamlı təkmilləşdirmə', 'Award', 3),

-- Services
('services', 'Psixoloji təhlil', 'Şəxsi keyfiyyətlərinizin və iş stilinizin dərin qiymətləndirilməsi', 'BrainCircuit', 1),
('services', 'Peşəkar yoxlama', 'Mövcud bilik və bacarıqlarınızın obyektiv qiymətləndirilməsi', 'ClipboardCheck', 2),
('services', 'Şəxsi tövsiyyələr', 'Hər istifadəçi üçün unikal tövsiyələr və inkişaf planı', 'TrendingUp', 3),
('services', 'AI dəstəyi', 'Psixoloqlar və karyera məsləhətçilərinin metodologiyası', 'Bot', 4),

-- Contact
('contact', 'Bizimlə əlaqə', 'Suallarınız varsa və ya əməkdaşlıq təklifiniz varsa, bizimlə əlaqə saxlayın', 'Mail', 1);
