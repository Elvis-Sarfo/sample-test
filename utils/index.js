const openai = require('./openai');
const huggingface = require('./huggingface');
const pdfReader = require('./pdf_reader');
const webScrapper = require('./web_scrapper');
const googleai = require('./googleai');


module.exports = {
  openai,
  huggingface,
  pdfReader,
  webScrapper,
  googleai
}