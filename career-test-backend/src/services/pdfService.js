const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const config = require('../config');
const pdfTemplate = require('../templates/pdfTemplate');

/**
 * Generate PDF report from analysis results
 */
const generatePdfReport = async (analysisResult, userInfo, req = null) => {
  let browser = null;
  
  try {
    // Generate unique filename
    const filename = `career-report-${uuidv4()}.pdf`;
    const filepath = path.resolve(config.pdf.storagePath, filename);

    // Ensure storage directory exists
    const storageDir = path.resolve(config.pdf.storagePath);
    if (!fs.existsSync(storageDir)) {
      fs.mkdirSync(storageDir, { recursive: true });
    }

    // Generate HTML content
    const htmlContent = pdfTemplate.generateHtml(analysisResult, userInfo);

    // Launch Puppeteer
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',  // Disable /dev/shm usage (for low memory)
        '--disable-gpu',
        '--single-process'  // Railway memory optimization
      ]
    });

    const page = await browser.newPage();

    // Set content and wait for styles to load
    await page.setContent(htmlContent, {
      waitUntil: 'networkidle0',
    });

    // Generate PDF
    await page.pdf({
      path: filepath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '15mm',
        bottom: '20mm',
        left: '15mm',
      },
    });

    console.log(`✅ PDF saved: ${filepath}`);

    // Build PDF URL dynamically from request or use config
    let pdfBaseUrl = config.pdf.baseUrl;
    if (req && req.get('host')) {
      const protocol = req.protocol || 'https';
      const host = req.get('host');
      pdfBaseUrl = `${protocol}://${host}/pdfs`;
    }

    return {
      filename,
      filepath,
      url: `${pdfBaseUrl}/${filename}`,
    };

  } catch (error) {
    console.error('PDF Generation Error:', error);
    throw new Error(`PDF generation failed: ${error.message}`);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

/**
 * Delete old PDF files (cleanup utility)
 */
const cleanupOldPdfs = async (maxAgeHours = 24) => {
  try {
    const storageDir = path.resolve(config.pdf.storagePath);
    const files = fs.readdirSync(storageDir);
    const now = Date.now();
    const maxAge = maxAgeHours * 60 * 60 * 1000;

    let deletedCount = 0;

    for (const file of files) {
      if (file.endsWith('.pdf')) {
        const filepath = path.join(storageDir, file);
        const stats = fs.statSync(filepath);
        const age = now - stats.mtimeMs;

        if (age > maxAge) {
          fs.unlinkSync(filepath);
          deletedCount++;
        }
      }
    }

    console.log(`🧹 Cleaned up ${deletedCount} old PDF files`);
    return deletedCount;

  } catch (error) {
    console.error('PDF Cleanup Error:', error);
    return 0;
  }
};

module.exports = {
  generatePdfReport,
  cleanupOldPdfs,
};
