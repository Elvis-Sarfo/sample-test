const openai = require('./openai');
const huggingface = require('./huggingface');
const extractCompanyData = require('./pdf_reader');
const webScrapper = require('./web_scrapper');


module.exports = {
  openai,
  huggingface,
  extractCompanyData,
  webScrapper
}