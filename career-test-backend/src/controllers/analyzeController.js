const openaiService = require('../services/openaiService');
const pdfService = require('../services/pdfService');
const questions = require('../data/questions');

/**
 * Analyze test answers and generate PDF report
 */
const analyzeTest = async (req, res, next) => {
  try {
    const { answers, userInfo, selectedCareerField } = req.body;

    // Validate request
    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({
        success: false,
        error: { message: 'Answers are required and must be a non-empty array' },
      });
    }

    if (!userInfo || !userInfo.name) {
      return res.status(400).json({
        success: false,
        error: { message: 'User info with name is required' },
      });
    }

    console.log(`📝 Analyzing test for: ${userInfo.name}`);
    console.log(`📊 Total answers: ${answers.length}`);
    console.log(`🎯 Selected career field: ${selectedCareerField || 'None'}`);

    // Step 1: Send answers to OpenAI for analysis
    const analysisResult = await openaiService.analyzeCareerTest(
      answers,
      userInfo,
      selectedCareerField
    );

    console.log('✅ AI Analysis complete');

    // Step 2: Generate PDF report
    const pdfResult = await pdfService.generatePdfReport(analysisResult, userInfo);

    console.log(`📄 PDF generated: ${pdfResult.filename}`);

    // Step 3: Return JSON response with analysis and PDF URL
    res.json({
      success: true,
      data: {
        analysis: analysisResult,
        pdfUrl: pdfResult.url,
        pdfFilename: pdfResult.filename,
        generatedAt: new Date().toISOString(),
      },
    });

  } catch (error) {
    console.error('❌ Analysis error:', error);
    next(error);
  }
};

/**
 * Get test questions
 */
const getQuestions = async (req, res, next) => {
  try {
    res.json({
      success: true,
      data: {
        questions,
        totalQuestions: questions.length,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  analyzeTest,
  getQuestions,
};
