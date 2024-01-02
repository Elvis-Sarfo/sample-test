const nlp = require('compromise');

/**
 * Reads company data from a PDF text with compromise nlp API.
 * @param {string} pdfData - The PDF text data.
 * @returns {string} - The formatted company information.
 * @throws {Error} - If there is an error parsing the PDF.
 */
const readCompanyDataFromText = async (pdfData) => {
  try {
    const companyInfo = nlp(pdfData);
    const companyName = companyInfo.organizations().out('text');
    const companyPhone = companyInfo.phoneNumbers().out('text');
    const companyEmail = companyInfo.emails().out('text');
    const companyWebsite = companyInfo.urls().out('text');
    const companyPeople = companyInfo.people().out('text');
    const companyPlaces = companyInfo.places().out('text');
    const companyTopics = companyInfo.topics().out('text');

    return `Company Name: ${companyName} \n
    Company Email: ${companyEmail} \n
    Company Website: ${companyWebsite} \n
    Company Places: ${companyPlaces} \n
    `;
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw error;
  }
}

module.exports = {
  readCompanyDataFromText
}