const {
  openai,
  huggingface,
  pdfUtils,
  webScrapper,
  googleai,
  file,
  compromise
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
    // Convert PDF to image
    const pdfImg = await pdfUtils.convertPDFToImage(dataBuffer, req.file.originalname);
    // convert image to blob
    const imageBlob = file.imageToBlob(pdfImg.path);

    const pdfData = await pdfUtils.extractTextData(dataBuffer);

    const msg = `Generate a report on  using the template in the link below: \n
    https://www.linkedin.com/advice/0/how-do-you-research-new-venture-capital-opportunity. \n

    `;

    // const getCompanyData = await huggingface.generateText(`Extract company data from the PDF document below: \n
    // ${pdfData} \n`);
    // const _companyData = await compromise.readCompanyDataFromText(pdfData);
    const sdsd = await huggingface.readCompanyDataFromText(pdfData);
    const docsRead = await huggingface.readCompanyDataFromPDF(imageBlob);

    // const report = await promptGPT(serachTerm);
    // const report = await huggingface(serachTerm);
    // const report = await googleai.generateReportFromPaMLAi(msg);
    const report = "This is a test report";

    res.json({result: report})
  } catch (error) {
    res.status(400).json({message: error.message})
  }
}

module.exports= {
  getHomeHandler,
  postPDFHandler
}

