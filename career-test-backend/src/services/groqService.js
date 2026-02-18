const Groq = require('groq-sdk');
const config = require('../config');

let groq = null;

const getGroqClient = () => {
  if (!groq) {
    const apiKey = config.groq.apiKey;
    if (!apiKey) {
      throw new Error('GROQ_API_KEY environment variable is not set');
    }
    groq = new Groq({ apiKey });
  }
  return groq;
};

/**
 * Build the AI prompt for career analysis
 */
const buildAnalysisPrompt = (answers, userInfo, selectedCareerField) => {
  const formattedAnswers = answers.map((a, i) => 
    `S${i + 1}: ${a.question}\nCavab: ${a.answer}`
  ).join('\n\n');

  const selectedFieldNote = selectedCareerField
    ? `\n\nVACİB: İstifadəçi "${selectedCareerField}" kimi fəsil seçmişdir. 
       Lütfən bu seçimin cavablarına uyğun olup olmadığını analiz edin. 
       Başqa bir fəsil daha uyğundursa, onu izah edin.`
    : '';

  return `Siz 20+ il təcrübə olan ekspert karyera məsləhətçisi və psixoloqu. 
Aşağıdakı karyera testi cavablarını analiz edin və ətraflı karyera qiymətləndirməsi verin.

İSTİFADƏÇİ MƏLUMATI:
- Ad-Soyad: ${userInfo.name}
- Yaş: ${userInfo.age || 'Göstərilməyib'}
- Təhsil: ${userInfo.education || 'Göstərilməyib'}
- Cari Sahə: ${userInfo.currentField || 'Göstərilməyib'}
${selectedFieldNote}

TEST CAVABLARI:
${formattedAnswers}

Bu cavablara əsasən aşağıdakı JSON formatında ətraflı analiz verin:

{
  "primaryCareerField": {
    "name": "Ən uyğun karyera sahəsinin adı",
    "description": "Bu sahənin nəyə uyğun olduğunun qısa izahı",
    "matchPercentage": 95
  },
  "topCareerFields": [
    {
      "rank": 1,
      "name": "Karyera Sahəsi Adı",
      "matchPercentage": 95,
      "reason": "Bu sahənin nəyə uyğun olduğu"
    },
    {
      "rank": 2,
      "name": "İkinci Karyera Sahəsi",
      "matchPercentage": 85,
      "reason": "Bu sahənin nəyə uyğun olduğu"
    },
    {
      "rank": 3,
      "name": "Üçüncü Karyera Sahəsi",
      "matchPercentage": 78,
      "reason": "Bu sahənin nəyə uyğun olduğu"
    }
  ],
  "strengths": [
    "Güc 1",
    "Güc 2",
    "Güc 3",
    "Güc 4"
  ],
  "areasToImprove": [
    "İnkişaf sahəsi 1",
    "İnkişaf sahəsi 2",
    "İnkişaf sahəsi 3"
  ],
  "recommendedSkills": [
    {
      "skill": "Bacarıq Adı",
      "importance": "Yüksək",
      "description": "İzahat"
    }
  ],
  "jobRoles": [
    "Vəzifə 1",
    "Vəzifə 2",
    "Vəzifə 3"
  ],
  "sixMonthRoadmap": "6 ayın ərzində ediləcək praktik məsləhətlər",
  "motivationalMessage": "Motivational mesaj"
}

VACIB: Yalnız JSON cavab verin, heç bir əlavə mətin olmadan.`;
};

/**
 * Analyze career test using Groq API
 */
const analyzeCareerTest = async (answers, userInfo, selectedCareerField) => {
  try {
    console.log('📝 Analyzing test for:', userInfo.name);
    console.log('📊 Total answers:', answers.length);
    console.log('🎯 Selected career field:', selectedCareerField || 'None');

    const prompt = buildAnalysisPrompt(answers, userInfo, selectedCareerField);

    const message = await getGroqClient().chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.1-70b-versatile",
      temperature: 0.7,
      max_tokens: 2048,
    });

    const text = message.choices[0]?.message?.content;
    console.log('✅ Groq response received');

    // Parse JSON response
    let analysisData;
    try {
      analysisData = JSON.parse(text);
    } catch (e) {
      console.log('⚠️ JSON parse error, attempting regex extraction...');
      // Try to extract JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysisData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Could not extract JSON from response');
      }
    }

    return {
      success: true,
      data: analysisData
    };

  } catch (error) {
    console.error('❌ Analysis error:', error.message);
    throw new Error(`AI Analysis failed: ${error.message}`);
  }
};

/**
 * Get prompt template (for reference)
 */
const getPromptTemplate = () => {
  return buildAnalysisPrompt(
    [{ question: 'Sample question', answer: 'Sample answer' }],
    { name: 'Sample User', age: 25, education: 'University', currentField: 'Tech' }
  );
};

module.exports = {
  analyzeCareerTest,
  getPromptTemplate,
  buildAnalysisPrompt
};
