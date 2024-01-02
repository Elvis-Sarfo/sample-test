const openai = require('./openai');
const huggingface = require('./huggingface');
const pdfUtils = require('./pdf_reader');
const webScrapper = require('./web_scrapper');
const googleai = require('./googleai');
const file = require('./file');
const compromise = require('./compromise');


module.exports = {
  openai,
  huggingface,
  pdfUtils,
  webScrapper,
  googleai,
  file,
  compromise
}