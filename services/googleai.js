const { GooglePaLM } = require("langchain/llms/googlepalm");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY);

/**
 * Generates a report using the GooglePaLM AI model.
 * @param {string} prompt - The prompt for generating the report.
 * @returns {Promise<any>} - The generated report.
 * @throws {Error} - If there is an error parsing the PDF.
 */
const generateReportFromPaMLAi = async (prompt) => {
  try {
    const model = new GooglePaLM({
      apiKey: process.env.GOOGLE_AI_KEY,
      temperature: 1,
      modelName: "models/text-bison-001",
      safetySettings: [
        {
          category: "HARM_CATEGORY_DANGEROUS",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
      ],
      stopSequences: ["stop"],
    });
    const res = await model.call(prompt);
    console.log({ res });
    return res;
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw error;
  }
}

/**
 * Generates a report using the Gemini AI model.
 * 
 * @param {string} prompt - The input prompt for generating the report.
 * @returns {Promise<string>} The generated report as a string.
 * @throws {Error} If there is an error parsing the PDF.
 */
const generateReportFromGemini = async (prompt) => {
  try {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw error;
  }
}

/**
 * Retrieves company information from an image file.
 * @param {File} imgFile - The image file containing the company information.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the company information.
 * @throws {Error} - If there is an error parsing the image file.
 */
const getCompanyInfo = async (imgFile) => {
  try {
    // For text-and-image input (multimodal), use the gemini-pro-vision model
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    const imagePart = fileToGenerativePart(imgFile.path, "image/png");

    const prompt = `Get the company information from the image. 
    Get the name of the company from the image. 
    Get the location of the company from the image. 
    Get the industry of the company from the image. 
    Get the website of the company from the image. 
    Get the description of the company from the image including the name, location, industry, website, and any other information.
    Structure the information into a JSON string with the following format:
    '{"name": <name>,"location": <location>,"industry": <industry>,"website": <website>,"description": <description>}'
    Dont append or prepend any other string.

    The following are examples you should follow
    Wrong Answer:
    \`\`\`json {
    name: "Google",
    location: "Mountain View, CA",
    industry: "Technology",
    website: "https://www.google.com/",
    description: "Google LLC is an American multinational technology company that specializes in Internet-related services and products, which include online advertising technologies, a search engine, cloud computing, software, and hardware."
    }\`\`\`'

    Wrong Answer:
    {name: "Google",location: "Mountain View, CA",industry: "Technology",website: "https://www.google.com/",description: "Google LLC is an American multinational technology company that specializes in Internet-related services and products, which include online advertising technologies, a search engine, cloud computing, software, and hardware."}

    Correct Answer:
    {"name": "Google","location": "Mountain View, CA","industry": "Technology","website": "https://www.google.com/","description": "Google LLC is an American multinational technology company that specializes in Internet-related services and products, which include online advertising technologies, a search engine, cloud computing, software, and hardware."}

    `

    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    let text = response.text();
    text = text.replaceAll('```', '');
    text = text.replace('json', '');
    return JSON.parse(text);
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw error;
  }
}

// Converts local file information to a GoogleGenerativeAI.Part object.
function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType
    },
  };
}


module.exports = {
  generateReportFromPaMLAi,
  generateReportFromGemini,
  getCompanyInfo
}