const { GooglePaLM } =  require("langchain/llms/googlepalm")

const generateReportFromPaMLAi = async (msg) => {
  try {
    const model = new GooglePaLM({
      apiKey: process.env.GOOGLE_AI_KEY, // or set it in environment variable as `GOOGLE_PALM_API_KEY`
      // other params
      temperature: 1, // OPTIONAL
      modelName: "models/text-bison-001",
      safetySettings: [
        // OPTIONAL
        {
          category: "HARM_CATEGORY_DANGEROUS",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
      ],
      stopSequences: ["stop"], // OPTIONAL
    });
    const res = await model.call( msg );
    console.log({ res });
    return res;
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw error;
  }
}

module.exports = {
  generateReportFromPaMLAi
}