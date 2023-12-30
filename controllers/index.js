const pdf = require('pdf-parse');
const nlp = require('compromise');
const {
  openai,
  huggingface,
  extractCompanyData,
  webScrapper
} = require('../utils');


const getHomeHandler = (req, res) => {
  res.render('index.ejs', { title: 'Welcome to Socka | View Players' });
}

const postPDFHandler = async (req, res) => {
  try {
    // Get PDF data
    const dataBuffer = req.file.buffer;
    const pdfData = await extractCompanyData(dataBuffer);
    const templateURL = 'https://www.linkedin.com/advice/0/how-do-you-research-new-venture-capital-opportunity';

    const companyInfo = nlp(pdfData);
    console.log(companyInfo);
    const companyName = companyInfo.organizations().out('text');
    const companyPhone = companyInfo.phoneNumbers().out('text');
    const companyEmail = companyInfo.emails().out('text');
    const companyWebsite = companyInfo.urls().out('text');
    const companyPeople = companyInfo.people().out('text');
    const companyPlaces = companyInfo.places().out('text');
    const companyTopics = companyInfo.topics().out('text');

    const serachTerm = `${companyTopics}`;

    // const report = await promptGPT(serachTerm);
    const report = await huggingface(serachTerm);

    res.json({data: report})
  } catch (error) {
    res.status(400).json({message: error.message})
  }
}

module.exports= {
  getHomeHandler,
  postPDFHandler
}

