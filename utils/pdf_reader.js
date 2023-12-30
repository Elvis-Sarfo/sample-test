const pdfParse = require('pdf-parse');

const extractCompanyData = async (pdfBuffer) => {
  try {
    const pdfData = await pdfParse(pdfBuffer);
    const companyData = pdfData.text;
    return companyData;
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw error;
  }
}

module.exports = extractCompanyData