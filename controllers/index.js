const pdf = require('pdf-parse');
const nlp = require('compromise');
const {
  openai,
  huggingface,
  pdfUtils,
  webScrapper,
  googleai
} = require('../utils');


const getHomeHandler = (req, res) => {
  res.render('index.ejs', { title: 'Welcome to Socka | View Players' });
}

const postPDFHandler = async (req, res) => {
  try {
    if (!req.file) return next(new Error('Select a file!'))
    const filePath = '/uploads/' + req.file.filename;
    // Get PDF data
    const dataBuffer = req.file.buffer;
    // convert file blob
    const blob = new Blob([dataBuffer], {type: 'application/pdf'});
    const pdfData = await pdfUtils.extractTextData(dataBuffer);
    const pdfImg = await pdfUtils.convertPDFToImage(dataBuffer, req.file.originalname);
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


    const msg = `Generate a report on  using the template in the link below: \n
    https://www.linkedin.com/advice/0/how-do-you-research-new-venture-capital-opportunity. \n
    The company name is ${companyName} \n
    The company phone number is ${companyPhone} \n
    The company email is ${companyEmail} \n
    The company website is ${companyWebsite} \n
    The company people are ${companyPeople} \n
    The company places are ${companyPlaces} \n
    `;

    const docsRead = await huggingface.readCompanyDataFromPDF(blob);

    // const report = await promptGPT(serachTerm);
    // const report = await huggingface(serachTerm);
    const report = await googleai.generateReportFromPaMLAi(msg);

    res.json({result: report})
  } catch (error) {
    res.status(400).json({message: error.message})
  }
}

module.exports= {
  getHomeHandler,
  postPDFHandler
}

