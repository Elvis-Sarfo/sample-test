const {HfInference} = require('@huggingface/inference');
const hfInference = new HfInference(process.env.HF_ACCESS_TOKEN);

const generateReport = async (companyData, onlineData) => {
  const msg = `Write a report on Farmasyst Company Limited using the template like below
  https://www.linkedin.com/advice/0/how-do-you-research-new-venture-capital-opportunity`;
  // const msg = `Can you please let us know more details about your`;
  try {
    // const response = await hfInference.textGeneration({
    //   inputs: msg,
    //   model: "gpt2"
    // });
    const response = await hfInference.textGeneration({
      inputs: msg,
      model: "bigscience/bloom-560m"
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw error;
  }
}

module.exports = generateReport