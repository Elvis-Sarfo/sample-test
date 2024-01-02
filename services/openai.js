const OpenAI = require('openai');

/**
 * Generates a report using OpenAI chat completions.
 * @param {string} input - The user input for generating the report.
 * @returns {Promise<string>} - The generated report.
 * @throws {Error} - If there is an error parsing the PDF.
 */
const generateReport = async (input) => {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPEN_AI_KEY,
    });

    const response = await openai.chat.completions.create({
      messages: [{ "role": "user", "content": input }],
      model: "gpt-3.5-turbo",
    });

    return response.choices[0].message.content;

  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw error;
  }
}

module.exports = {
  generateReport
}