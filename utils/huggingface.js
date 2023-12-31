const {HfInference} = require('@huggingface/inference');
const hfInference = new HfInference(process.env.HF_ACCESS_TOKEN);

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

const readCompanyDataFromPDF = async (document) => {
  try {
    const response = await hfInference.documentQuestionAnswering({
      model: 'impira/layoutlm-document-qa',
      inputs: {
        question: 'What is the organization in the document?',
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
    console.log(companyNameRes);
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