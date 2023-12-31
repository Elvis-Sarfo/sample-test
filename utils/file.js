const fs = require('fs');
const imageToBlob = (filePath) => {
  // Read the image file as a Buffer
  const imageBuffer = fs.readFileSync(filePath);
  // Create a Blob from the Buffer
  const blob = new Blob([imageBuffer], { type: 'image/png' }); // You may need to adjust the MIME type based on your image format
  return blob;
}

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