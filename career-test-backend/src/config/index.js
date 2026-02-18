require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

module.exports = {
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  gemini: {
    apiKey: process.env.GEMINI_API_KEY?.trim(),
  },
  
  pdf: {
    storagePath: process.env.PDF_STORAGE_PATH || './pdfs',
    baseUrl: process.env.PDF_BASE_URL || 'http://localhost:3001/pdfs',
  },
  
  cors: {
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  },
};
