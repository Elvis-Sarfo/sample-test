const pdfParse = require('pdf-parse');
const { fromBuffer } = require("pdf2pic");



/**
 * Extracts text data from a PDF buffer.
 * @param {Buffer} pdfBuffer - The PDF buffer to extract text from.
 * @returns {Promise<string>} - A promise that resolves to the extracted text data.
 * @throws {Error} - If there is an error parsing the PDF.
 */
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

/**
 * Converts a PDF buffer to an image file.
 * @param {Buffer} pdfBuffer - The PDF buffer to convert.
 * @param {string} [filename] - The name of the output image file. Defaults to the current timestamp.
 * @returns {Promise<string>} - The path to the converted image file.
 * @throws {Error} - If there is an error parsing the PDF or converting it to an image.
 */
const convertPDFToImage = async (pdfBuffer, filename = Date.now().toString()) => {
  const options = {
    density: 100,
    saveFilename: filename,
    savePath: "./uploads",
    format: "png"
  };

  try {
    const pdfData = await pdfParse(pdfBuffer);
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