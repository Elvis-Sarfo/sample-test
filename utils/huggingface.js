const {HfInference} = require('@huggingface/inference');
const hfInference = new HfInference(process.env.HF_ACCESS_TOKEN);

const generateReport = async (msg) => {
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

const readCompanyDataFromPDF = async (document) => {
  try {
    const response = await hfInference.documentQuestionAnswering({
      model: 'impira/layoutlm-document-qa',
      inputs: {
        question: 'What is the organizationa name?',
        image: document,
      }
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw error;
  }
}

module.exports = {
  generateReport,
  readCompanyDataFromPDF
}