/**
 * Career Test Questions - WAYME
 * 30 Azerbaijani questions covering interests, personality, skills, and work style
 */

const questions = [
  {
    id: 1,
    category: 'interests',
    question: 'Boş vaxtınızda ən çox nə etməyi sevirsiniz?',
    options: [
      { value: '1a', text: 'Komputerlə proqramlar yazmaq və ya öyrənmək' },
      { value: '1b', text: 'Yaradıcı işlərlə məşğul olmaq (dizayn, çəkilişlər)' },
      { value: '1c', text: 'İnsanlarla ünsiyyət qurmaq və şəbəkə yaratmaq' },
      { value: '1d', text: 'Kitab oxumaq və yeni bilik əldə etmək' },
    ],
  },
  {
    id: 2,
    category: 'interests',
    question: 'Hansı tip problemləri həll etməyi daha çox sevirsiniz?',
    options: [
      { value: '2a', text: 'Texniki və məntiqi problemlər' },
      { value: '2b', text: 'Vizual və estetik problemlər' },
      { value: '2c', text: 'İnsanlar arasında münasibətlərlə bağlı problemlər' },
      { value: '2d', text: 'Maliyyə və rəqəmlərlə bağlı problemlər' },
    ],
  },
  {
    id: 3,
    category: 'interests',
    question: 'Layihədə hansı rolu daha çox sevərdiniz?',
    options: [
      { value: '3a', text: 'Texniki həlləri inkişaf etdirmək' },
      { value: '3b', text: 'Layihəni planlaşdırmaq və koordinasiya etmək' },
      { value: '3c', text: 'Dizayn və vizual hissəni yaratmaq' },
      { value: '3d', text: 'Məhsulu bazara çıxarmaq və tanıtmaq' },
    ],
  },
  {
    id: 4,
    category: 'interests',
    question: 'İdeal iş mühitiniz necə olmalıdır?',
    options: [
      { value: '4a', text: 'Sakit və fokuslanmağa imkan verən' },
      { value: '4b', text: 'Dinamik və yaradıcı' },
      { value: '4c', text: 'Komanda işinə əsaslanan' },
      { value: '4d', text: 'Müstəqil və çevik' },
    ],
  },
  {
    id: 5,
    category: 'skills',
    question: 'Hansı alətlərlə işləməyi daha maraqlı hesab edirsiniz?',
    options: [
      { value: '5a', text: 'Kod editorları və development tools' },
      { value: '5b', text: 'Dizayn proqramları (Figma, Photoshop)' },
      { value: '5c', text: 'Analitika və data alətləri' },
      { value: '5d', text: 'Sosial media platformaları' },
    ],
  },
  {
    id: 6,
    category: 'personality',
    question: 'İş yerində münaqişə baş verdikdə necə reaksiya verirsiniz?',
    options: [
      { value: '6a', text: 'Məntiqi arqumentlərlə həll yolunu tapmağa çalışıram' },
      { value: '6b', text: 'Tərəfləri dinləyib ortaq məxrəcə gəlməyə çalışıram' },
      { value: '6c', text: 'Vəziyyəti analiz edib sonra qərar verirəm' },
      { value: '6d', text: 'Gərginliyi azaltmaq üçün zarafat və ya yumor istifadə edirəm' },
    ],
  },
  {
    id: 7,
    category: 'personality',
    question: 'Yeni bir tapşırıq aldıqda ilk işiniz nə olur?',
    options: [
      { value: '7a', text: 'Dərhal araşdırmaya və planlamağa başlayıram' },
      { value: '7b', text: 'Tapşırığın vizual və yaradıcı tərəflərini düşünürəm' },
      { value: '7c', text: 'Komanda yoldaşlarımla müzakirə edirəm' },
      { value: '7d', text: 'Tapşırığın biznesə və nəticəyə təsirini analiz edirəm' },
    ],
  },
  {
    id: 8,
    category: 'interests',
    question: 'Hansı növ məlumatları oxumaq sizə daha maraqlıdır?',
    options: [
      { value: '8a', text: 'Texnologiya xəbərləri və proqramlaşdırma məqalələri' },
      { value: '8b', text: 'Dizayn trendləri və incəsənət blogları' },
      { value: '8c', text: 'Psixologiya və liderlik kitabları' },
      { value: '8d', text: 'Biznes strategiyaları və startap hekayələri' },
    ],
  },
  {
    id: 9,
    category: 'workStyle',
    question: 'Qrup işində adətən hansı rolu üzərinizə götürürsünüz?',
    options: [
      { value: '9a', text: 'İcraçı - işin texniki hissəsini həll edən' },
      { value: '9b', text: 'İdeya generatoru - yeni fikirlər verən' },
      { value: '9c', text: 'Moderator - hər kəsin fikrini dinləyən' },
      { value: '9d', text: 'Təşkilatçı - prosesi idarə edən' },
    ],
  },
  {
    id: 10,
    category: 'personality',
    question: 'Uğur sizin üçün nə deməkdir?',
    options: [
      { value: '10a', text: 'Mürəkkəb bir sistemi qurmaq və ya təmir etmək' },
      { value: '10b', text: 'Gözəl və yaddaqalan bir əsər yaratmak' },
      { value: '10c', text: 'İnsanlara kömək etmək və təsir buraxmaq' },
      { value: '10d', text: 'Maddi gəlir və karyera yüksəlişi' },
    ],
  },
  {
    id: 11,
    category: 'workStyle',
    question: 'Hansı mühitdə işləmək sizin üçün daha rahatdır?',
    options: [
      { value: '11a', text: 'Sakit ofis və ya ev mühiti' },
      { value: '11b', text: 'Yaradıcı studiya və ya açıq məkan' },
      { value: '11c', text: 'İnsanların çox olduğu dinamik ofis' },
      { value: '11d', text: 'Müxtəlif yerlərdə (səfərlər, görüşlər)' },
    ],
  },
  {
    id: 12,
    category: 'workStyle',
    question: 'Bir layihənin uğurlu olması üçün ən vacib amil nədir?',
    options: [
      { value: '12a', text: 'Texniki mükəmməllik və səhvsiz işləməsi' },
      { value: '12b', text: 'Göz oxşayan dizayn və istifadəçi təcrübəsi' },
      { value: '12c', text: 'Komanda ruhu və düzgün kommunikasiya' },
      { value: '12d', text: 'Düzgün strategiya və bazar analizi' },
    ],
  },
  {
    id: 13,
    category: 'personality',
    question: 'Stressli vəziyyətlərdə özünüzü necə aparırsınız?',
    options: [
      { value: '13a', text: 'Soyuqqanlılıqla problemi həll etməyə çalışıram' },
      { value: '13b', text: 'Bir az narahat oluram, amma yaradıcı həll axtarıram' },
      { value: '13c', text: 'Dəstək üçün başqalarına müraciət edirəm' },
      { value: '13d', text: 'Planı yenidən nəzərdən keçirib hərəkətə keçirəm' },
    ],
  },
  {
    id: 14,
    category: 'skills',
    question: 'Öyrənmə tərzinizi necə təsvir edərdiniz?',
    options: [
      { value: '14a', text: 'Təcrübə edərək və səhvlərdən öyrənərək' },
      { value: '14b', text: 'Vizual materiallar və nümunələrlə' },
      { value: '14c', text: 'Müzakirə və qrup işləri vasitəsilə' },
      { value: '14d', text: 'Nəzəriyyəni oxuyub analiz edərək' },
    ],
  },
  {
    id: 15,
    category: 'interests',
    question: 'Həftəsonlarını necə keçirməyi sevirsiniz?',
    options: [
      { value: '15a', text: 'Video oyunlar oynayaraq və ya texnologiya ilə məşğul olaraq' },
      { value: '15b', text: 'Sərgi, muzey və ya kinoya gedərək' },
      { value: '15c', text: 'Dostlarla görüşərək və ya sosial tədbirlərdə' },
      { value: '15d', text: 'Gələcək planlar quraraq' },
    ],
  },
  {
    id: 16,
    category: 'personality',
    question: 'Sizə ən çox hansı tərif xoş gəlir?',
    options: [
      { value: '16a', text: 'Sən çox ağıllı və məntiqlisən' },
      { value: '16b', text: 'Sənin çox yaxşı zövqün var' },
      { value: '16c', text: 'Səninlə ünsiyyət qurmaq çox rahatdır' },
      { value: '16d', text: 'Sən işini necə idarə edəcəyini bilirsən' },
    ],
  },
  {
    id: 17,
    category: 'skills',
    question: 'Hansı proqram təminatı sizə daha maraqlı gəlir?',
    options: [
      { value: '17a', text: 'VS Code, IntelliJ IDEA (Kodlama)' },
      { value: '17b', text: 'Adobe Creative Cloud, Figma (Dizayn)' },
      { value: '17c', text: 'Zoom, Slack, Trello (Kommunikasiya)' },
      { value: '17d', text: 'Excel, Tableau, Power BI (Analitika)' },
    ],
  },
  {
    id: 18,
    category: 'interests',
    question: 'Gələcəkdə hansı sahədə ekspert olmaq istərdiniz?',
    options: [
      { value: '18a', text: 'Süni intellekt və maşın öyrənməsi' },
      { value: '18b', text: 'Brendinq və rəqəmsal incəsənət' },
      { value: '18c', text: 'İnsan resursları və psixologiya' },
      { value: '18d', text: 'Biznesin idarə edilməsi və maliyyə' },
    ],
  },
  {
    id: 19,
    category: 'personality',
    question: 'Bir məhsul alarkən ilk nəyə diqqət edirsiniz?',
    options: [
      { value: '19a', text: 'Texniki parametrlərinə və funksionallığına' },
      { value: '19b', text: 'Dizaynına və qablaşdırmasına' },
      { value: '19c', text: 'İstifadəçi rəylərinə və brendin reputasiyasına' },
      { value: '19d', text: 'Qiymətinə və dəyərinə' },
    ],
  },
  {
    id: 20,
    category: 'interests',
    question: 'Hansı növ filmləri daha çox sevirsiniz?',
    options: [
      { value: '20a', text: 'Elmi-fantastika və detektiv' },
      { value: '20b', text: 'Vizual olaraq zəngin və bədii filmlər' },
      { value: '20c', text: 'Dram və real həyat hekayələri' },
      { value: '20d', text: 'Sənədli və bioqrafik filmlər' },
    ],
  },
  {
    id: 21,
    category: 'workStyle',
    question: 'İş yerində ən çox nədən yorulursunuz?',
    options: [
      { value: '21a', text: 'Köhnəlmiş və yavaş texnologiyalardan' },
      { value: '21b', text: 'Yaradıcılığın məhdudlaşdırılmasından' },
      { value: '21c', text: 'Gərgin və qeyri-səmimi kollektivdən' },
      { value: '21d', text: 'Qeyri-müəyyənlikdən və plansızlıqdan' },
    ],
  },
  {
    id: 22,
    category: 'personality',
    question: 'Problemlərə yanaşma tərziniz necədir?',
    options: [
      { value: '22a', text: 'Sistemli və addım-addım' },
      { value: '22b', text: 'İntuitiv və vizual' },
      { value: '22c', text: 'Empatik və insan yönümlü' },
      { value: '22d', text: 'Praqmatik və nəticə yönümlü' },
    ],
  },
  {
    id: 23,
    category: 'personality',
    question: 'Özünüzü daha çox nə kimi hiss edirsiniz?',
    options: [
      { value: '23a', text: 'Mühəndis və ya alim' },
      { value: '23b', text: 'Rəssam və ya yaradıcı' },
      { value: '23c', text: 'Məsləhətçi və ya mentor' },
      { value: '23d', text: 'Lider və ya sahibkar' },
    ],
  },
  {
    id: 24,
    category: 'skills',
    question: 'Hansı bacarığınızı inkişaf etdirmək istərdiniz?',
    options: [
      { value: '24a', text: 'Kodlaşdırma və texniki biliklər' },
      { value: '24b', text: 'Dizayn və bədii zövq' },
      { value: '24c', text: 'Ünsiyyət və nitq qabiliyyəti' },
      { value: '24d', text: 'İdarəetmə və maliyyə savadlılığı' },
    ],
  },
  {
    id: 25,
    category: 'interests',
    question: 'Sizcə gələcəyin ən vacib ixtisası hansıdır?',
    options: [
      { value: '25a', text: 'Kibertəhlükəsizlik və AI mütəxəssisi' },
      { value: '25b', text: 'Virtual reallıq dizayneri' },
      { value: '25c', text: 'Psixoloq və insan resursları meneceri' },
      { value: '25d', text: 'Böyük data analitiki' },
    ],
  },
  {
    id: 26,
    category: 'interests',
    question: 'İşdən kənarda hansı fəaliyyətləri sevirsiniz?',
    options: [
      { value: '26a', text: 'Texnologiya və gadget-lər haqqında oxumaq' },
      { value: '26b', text: 'Muzey, sərgi və film tamaşası' },
      { value: '26c', text: 'Networking və sosial tədbirlər' },
      { value: '26d', text: 'İdman və sağlam həyat tərzi' },
    ],
  },
  {
    id: 27,
    category: 'workStyle',
    question: 'Yeni layihəyə necə başlayırsınız?',
    options: [
      { value: '27a', text: 'Texniki tələbləri və arxitekturanı müəyyənləşdirirəm' },
      { value: '27b', text: 'Vizual konsept və mood board yaradıram' },
      { value: '27c', text: 'Bazar araşdırması və rəqib analizi aparıram' },
      { value: '27d', text: 'Büdcə və resursları planlaşdırıram' },
    ],
  },
  {
    id: 28,
    category: 'personality',
    question: 'Hansı tip feedback sizi daha çox motivasiya edir?',
    options: [
      { value: '28a', text: 'Texniki keyfiyyət və performans haqqında' },
      { value: '28b', text: 'Dizayn və estetika haqqında' },
      { value: '28c', text: 'Komanda işi və əməkdaşlıq haqqında' },
      { value: '28d', text: 'Nəticələr və KPI haqqında' },
    ],
  },
  {
    id: 29,
    category: 'workStyle',
    question: 'İşdə ən böyük çətinlik nədir sizin üçün?',
    options: [
      { value: '29a', text: 'Texniki bug-lar və sistemin sınması' },
      { value: '29b', text: 'Kreativ blok və ilham çatışmazlığı' },
      { value: '29c', text: 'Konfliktlər və ünsiyyət problemləri' },
      { value: '29d', text: 'Deadline və vaxt idarəetməsi' },
    ],
  },
  {
    id: 30,
    category: 'personality',
    question: 'Uzunmüddətli karyera hədəfiniz nədir?',
    options: [
      { value: '30a', text: 'Senior/Lead Developer və ya CTO' },
      { value: '30b', text: 'Creative Director və ya Design Lead' },
      { value: '30c', text: 'HR Director və ya People Officer' },
      { value: '30d', text: 'CEO və ya öz biznesimin sahibi' },
    ],
  },
];

module.exports = questions;
