const { google } = require('google-gax/build/protos/operations');
const {
  openai,
  huggingface,
  pdfUtils,
  webScrapper,
  googleai,
  file,
  compromise
} = require('../services');

const { generateCompanyReport, readAndGenerateCompanyReport } = require('../utils');

/**
 * Handles GET request to home page
 * Renders home page
 * @param {*} req 
 * @param {*} res 
 */
const getHomeHandler = (req, res) => {
  res.render('index.ejs', { title: 'Sample Test: Company Report Generator' });
}

/**
 * Handles POST request to generate company report
 * Get company info from the request body
 * Generate company report from OpenAI and Gemini
 * Respond with json report data
 * @param {*} req 
 * @param {*} res 
 */
const companyReportHandler = async (req, res) => {
  try {
    // Get company info from request body
    const _companyInfo = req.body;

    // Generate report from OpenAI and Gemini
    const [gptReport, geminiReport] = await Promise.all([
      generateCompanyReport({
        companyInfo: _companyInfo,
        reportService: openai.generateReport
      }),
      generateCompanyReport({
        companyInfo: _companyInfo,
        reportService: googleai.generateReportFromGemini
      }),
    ]);

    // Respond with report
    res.json({ result: { gptReport, geminiReport } });
  } catch (error) {
    res.status(500).json({ result: error.message });
  }
}

/**
 * Handles POST request to generate company report
 * Get company file from the request
 * Extract company info from the image file by the grmini API
 * @param {*} req 
 * @param {*} res 
 */
const pdfAPIHandler = async (req, res) => {
  try {
    if (!req.file) new Error('Select a file!')

    // Get PDF file buffer
    const dataBuffer = req.file.buffer;

    // Convert PDF to image
    const pdfImg = await pdfUtils.convertPDFToImage(dataBuffer, req.file.originalname);

    let company;

    try {
      // Extract text data from PDF
      company = await googleai.getCompanyInfo(pdfImg)
    } catch (error) {
      const pdfData = await pdfUtils.extractTextData(dataBuffer);
      try {
        company = await huggingface.readCompanyDataFromText(pdfData);
      } catch (error) {
        company = await compromise.readCompanyDataFromText(pdfData)
      }
    }

    // Respond with report
    res.json({ result: company })
  } catch (error) {
    res.status(500).json({ result: error.message })
  }
}

/**
 * Handles the API request for processing a PDF file using OpenAI.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the processing is complete.
 * @throws {Error} - If no file is selected.
 */
const openaiAPIHandler = async (req, res) => {
  try {
    if (!req.file) new Error('Select a file!')

    // Get PDF data
    const dataBuffer = req.file.buffer;

    // Extract text data from PDF
    const GPTReport = await readAndGenerateCompanyReport({
      pdf: dataBuffer,
      reportService: openai.generateReport,
      pdfDataExtractor: pdfUtils.extractTextData,
      contentReader: huggingface.readCompanyDataFromText
    });

    // Respond with report
    res.json({ result: GPTReport })
  } catch (error) {
    res.status(500).json({ result: error.message });
  }
}

/**
 * Handles the Gemini API request.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
const geminiAPIHandler = async (req, res) => {
  try {
    if (!req.file) new Error('Select a file!')

    // Get PDF data
    const dataBuffer = req.file.buffer;

    // Extract text data from PDF
    const GeminiReport = await readAndGenerateCompanyReport({
      pdf: dataBuffer,
      reportService: googleai.generateReportFromGemini,
      pdfDataExtractor: pdfUtils.extractTextData,
      contentReader: huggingface.readCompanyDataFromText
    });

    // Respond with report
    res.json({ result: GeminiReport });
  } catch (error) {
    res.status(500).json({ result: error.message });
  }
}

module.exports = {
  getHomeHandler,
  openaiAPIHandler,
  geminiAPIHandler,
  pdfAPIHandler,
  companyReportHandler
}

