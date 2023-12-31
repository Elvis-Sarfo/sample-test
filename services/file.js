const fs = require('fs');

/**
 * Converts an image file to a Blob object.
 * @param {string} filePath - The path to the image file.
 * @returns {Blob} The Blob object representing the image file.
 */
const imageToBlob = (filePath) => {
  // Read the image file as a Buffer
  const imageBuffer = fs.readFileSync(filePath);
  // Create a Blob from the Buffer
  const blob = new Blob([imageBuffer], { type: 'image/png' }); // You may need to adjust the MIME type based on your image format
  return blob;
}

/**
 * Converts a Blob object to a base64 string.
 * @param {Blob} blob - The Blob object to convert.
 * @returns {Promise<string>} - A Promise that resolves with the base64 string.
 */
const blobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  })
}

/**
 * Converts a Blob object to a buffer.
 * @param {Blob} blob - The Blob object to convert.
 * @returns {Promise<ArrayBuffer>} - A promise that resolves with the converted buffer.
 */
const blobToBuffer = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsArrayBuffer(blob);
  })
}

module.exports = {
  imageToBlob,
  blobToBase64,
  blobToBuffer
}