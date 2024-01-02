const {HfInference} = require('@huggingface/inference');
const hfInference = new HfInference(process.env.HF_ACCESS_TOKEN);

/**
 * Generates text using Hugging Face's text generation API.
 * @param {string} msg - The input message for text generation.
 * @returns {Promise<string>} - The generated text.
 * @throws {Error} - If there is an error during text generation.
 */
const generateText = async (msg) => {
  try {
    const response = await hfInference.textGeneration({
      inputs: msg,
      model: "gpt2"
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw error;
  }
}

/**
 * Reads company data from a PDF document using Hugging Face's documentQuestionAnswering API.
 * @param {Buffer} document - The PDF document to extract company data from.
 * @returns {Promise<Object>} - The response object containing the extracted company data.
 * @throws {Error} - If there is an error parsing the PDF document.
 */
const readCompanyDataFromPDF = async (document) => {
  try {
    const response = await hfInference.documentQuestionAnswering({
      model: 'impira/layoutlm-document-qa',
      inputs: {
        question: 'What is the organization in the document?',
        image: document,
      }
    });
    return response;
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw error;
  }
}

/**
 * Reads company data from text using Hugging Face question answering model.
 * @param {string} context - The text context to extract company data from.
 * @returns {Promise<{ companyName: string, companyLocation: string }>} - The extracted company data, including the company name and location.
 * @throws {Error} - If there is an error parsing the PDF or executing the Hugging Face model.
 */
const readCompanyDataFromText = async (context) => {
  try {
    const companyNameRes = await hfInference.questionAnswering({
      model: 'deepset/roberta-base-squad2',
      inputs: {
        question: 'What is the name of the organization the file belongs to?',
        context: context
      }
    });
    const companyLocationRes = await hfInference.questionAnswering({
      model: 'deepset/roberta-base-squad2',
      inputs: {
        question: 'What is the Location of the organization the file belongs to?',
        context: context
      }
    });
    const response = {
      companyName: companyNameRes.answer,
      companyLocation: companyLocationRes.answer
    }
    return response;
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw error;
  }
}


module.exports = {
  generateText,
  readCompanyDataFromPDF,
  readCompanyDataFromText
}