const pdfParse = require('pdf-parse');
const { fromBuffer } = require("pdf2pic");



const extractTextData = async (pdfBuffer) => {
  try {
    const pdfData = await pdfParse(pdfBuffer);
    const companyData = pdfData.text;
    return companyData;
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw error;
  }
}

const convertPDFToImage = async (pdfBuffer, filename) => {
  const options = {
    density: 100,
    saveFilename: "untitled",
    savePath: "./uploads",
    format: "png",
    width: 600,
    height: 600
  };

  try {
    const convert = fromBuffer(pdfBuffer, options);
    const pageToConvertAsImage = 1;

    const file = convert(pageToConvertAsImage, { responseType: "image" });
    return file
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw error;
  }
}


module.exports = {
  extractTextData,
  convertPDFToImage
}