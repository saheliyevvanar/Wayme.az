const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const config = require('./config');
const analyzeRouter = require('./routes/analyze');

const app = express();

// Ensure PDF storage directory exists
const pdfStoragePath = path.resolve(config.pdf.storagePath);
if (!fs.existsSync(pdfStoragePath)) {
  fs.mkdirSync(pdfStoragePath, { recursive: true });
}

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
  credentials: false,
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Handle OPTIONS requests explicitly
app.options('*', cors());

// Serve static PDF files
app.use('/pdfs', express.static(pdfStoragePath));

// Routes
app.use('/api', analyzeRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(statusCode).json({
    success: false,
    error: {
      message,
      ...(config.nodeEnv === 'development' && { stack: err.stack }),
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: { message: 'Route not found' },
  });
});

// Start server
const PORT = process.env.PORT || 3002;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Career Test Backend running on port ${PORT}`);
  console.log(`📁 PDF storage: ${pdfStoragePath}`);
  console.log(`🌐 Environment: ${config.nodeEnv}`);
});

module.exports = app;
