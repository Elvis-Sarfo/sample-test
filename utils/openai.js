const OpenAI = require('openai');

const promptGPT = async (prompt) => {
  try {
    const openai = new OpenAI({
      apiKey: "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", // This is the default and can be omitted
    }); // Replace with your API key

    const msg = `Write a report on Farmasyst Company Limited using the template like below
    https://www.linkedin.com/advice/0/how-do-you-research-new-venture-capital-opportunity`

    const response = await openai.chat.completions.create({
      messages: [{ "role": "user", "content": msg }],
      model: "gpt-3.5-turbo",
    });

    return response.choices[0].message.content;

  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw error;
  }
}

module.exports = promptGPT