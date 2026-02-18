const OpenAI = require('openai');
const config = require('../config');

const openai = new OpenAI({
  apiKey: config.openai.apiKey,
});

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
    "Güc 1 qısa izahatla",
    "Güc 2 qısa izahatla",
    "Güc 3 qısa izahatla",
    "Güc 4 qısa izahatla"
  ],
  "areasToImprove": [
    "İnkişaf edəcək sahə 1 konstruktiv məsləhətlə",
    "İnkişaf edəcək sahə 2 konstruktiv məsləhətlə",
    "İnkişaf edəcək sahə 3 konstruktiv məsləhətlə"
  ],
  "recommendedSkills": [
    {
      "skill": "Bacarıq Adı",
      "importance": "Yüksək/Orta/Aşağı",
      "description": "Bu bacarığın nə qədər vacib olduğu və necə inkişaf etdiriləcəyi"
    }
  ],
  "suggestedJobRoles": [
    {
      "title": "İş Vəzifəsi",
      "description": "Vəzifənin qısa izahı",
      "salaryRange": "Təxmini maaş aralığı (AZN)",
      "demandLevel": "Yüksək/Orta/Aşağı"
    }
  ],
  "sixMonthRoadmap": {
    "month1": {
      "title": "Təməl",
      "tasks": ["Tapşırıq 1", "Tapşırıq 2", "Tapşırıq 3"]
    },
    "month2": {
      "title": "Bacarıq Inkişafı",
      "tasks": ["Tapşırıq 1", "Tapşırıq 2", "Tapşırıq 3"]
    },
    "month3": {
      "title": "Praktika",
      "tasks": ["Tapşırıq 1", "Tapşırıq 2", "Tapşırıq 3"]
    },
    "month4": {
      "title": "Portfolio Yaratma",
      "tasks": ["Tapşırıq 1", "Tapşırıq 2", "Tapşırıq 3"]
    },
    "month5": {
      "title": "Şəbəkə Yaratma",
      "tasks": ["Tapşırıq 1", "Tapşırıq 2", "Tapşırıq 3"]
    },
    "month6": {
      "title": "İş Axtarışı",
      "tasks": ["Tapşırıq 1", "Tapşırıq 2", "Tapşırıq 3"]
    }
  },
  "motivationalMessage": "İstifadəçinin profilinə əsasən şəxsil edilmiş motivasiya mesajı",
  "selectedFieldComparison": null
}

${selectedCareerField ? `
"selectedFieldComparison" üçün, istifadəçi "${selectedCareerField}" seçdiyindən:
{
  "selectedField": "${selectedCareerField}",
  "isGoodFit": true/false,
  "fitPercentage": XX,
  "comparison": "Seçilmiş sahə ilə AI-nin tövsiyə etdiyi sahə arasındakı ətraflı müqayisə",
  "recommendation": "Sizin peşəkar tövsiyəniz"
}
` : '"selectedFieldComparison" null olsun.'}

VACIB: 
- Yalnız etibarlı JSON qaytarın
- Cavablara əsasən şəxsil edin
- Faydalı məsləhət verin
- Motivasiya olun ama realistik olun
- Faizlərin hamısı 90%+ olmasın`;
};

/**
 * Analyze career test answers using OpenAI
 */
const analyzeCareerTest = async (answers, userInfo, selectedCareerField) => {
  try {
    const prompt = buildAnalysisPrompt(answers, userInfo, selectedCareerField);

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an expert career counselor. You analyze career test results and provide detailed, personalized career guidance. Always respond with valid JSON only.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const responseText = completion.choices[0].message.content;
    
    // Try to parse JSON - handle cases where AI adds extra text
    let analysisResult;
    try {
      analysisResult = JSON.parse(responseText);
    } catch (e) {
      // Try to extract JSON from response if it contains extra text
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysisResult = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Could not parse AI response as JSON');
      }
    }

    return {
      ...analysisResult,
      analyzedAt: new Date().toISOString(),
      userInfo: {
        name: userInfo.name,
        age: userInfo.age,
        education: userInfo.education,
      },
    };

  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    if (error.code === 'invalid_api_key') {
      throw new Error('Invalid OpenAI API key. Please check your configuration.');
    }
    
    if (error.code === 'insufficient_quota') {
      throw new Error('OpenAI API quota exceeded. Please check your billing.');
    }

    throw new Error(`AI Analysis failed: ${error.message}`);
  }
};

/**
 * Get the prompt template (for documentation)
 */
const getPromptTemplate = () => {
  return buildAnalysisPrompt(
    [{ question: '[Question]', answer: '[Answer]' }],
    { name: '[User Name]', age: '[Age]', education: '[Education]' },
    null
  );
};

module.exports = {
  analyzeCareerTest,
  getPromptTemplate,
  buildAnalysisPrompt,
};
