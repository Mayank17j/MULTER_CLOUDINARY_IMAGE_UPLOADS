const path = require("path");
const fileTypeValidator = (file) => {
  const fileType = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname.toLowerCase()));
  const mimeType = fileType.test(file.mimeType); //mimeType='image/png'
  return extname && mimeType;
};

module.exports = fileTypeValidator;
