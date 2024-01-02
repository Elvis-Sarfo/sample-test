/**
 * Express router module.
 * @module routes/index
 */

var express = require('express');
const { getHomeHandler, openaiAPIHandler, geminiAPIHandler, pdfAPIHandler, companyReportHandler } = require('../controllers');
var router = express.Router();
const Multer = require('multer')

/**
 * Multer is required to process file uploads and make them available via req.files.
 * @const {object}
 */
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: { fieldSize: 5 * 1024 * 1024 }
})

/**
 * Route for the home page.
 */
router.get('/', getHomeHandler);

/**
 * Route for generating company reports.
 * @bodyparam {Object} companyInfo - The company information to generate the report for.
 */
router.post('/report', companyReportHandler);

/**
 * Route for processing PDF files and extract company info.
 * @bodyparam {File} file - The PDF file to process.
 */
router.post('/pdf', multer.single('file'), pdfAPIHandler);

/**
 * Route for processing files and generate report with openai gpt.
 * @bodyparam {File} file - The file to process.
 */
router.post('/openai', multer.single('file'), openaiAPIHandler);

/**
 * Route for processing files and generate report with gemini model.
 * @bodyparam {File} file - The file to process.
 */
router.post('/gemini', multer.single('file'), geminiAPIHandler);

module.exports = router;
