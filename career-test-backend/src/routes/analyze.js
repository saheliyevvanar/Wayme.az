const express = require('express');
const router = express.Router();
const analyzeController = require('../controllers/analyzeController');

// POST /api/analyze - Analyze test answers
router.post('/analyze', analyzeController.analyzeTest);

// GET /api/questions - Get test questions
router.get('/questions', analyzeController.getQuestions);

module.exports = router;
