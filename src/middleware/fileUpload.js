const path = require("path");
//setting up multer storage and upload
const multer = require("multer");
const fileTypeValidator = require("../../utils/fileTypeValidator.js");
const UNEXPECTED_FILE_TYPE = require("../constants/file.js");

//to upload file from local disk

//storage config.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //req,file,callback
    cb(null, "uploads"); //uploads: temp folder to upload images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

//upload location and file type
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    //check file validity to upload
    const isFileTypeAllowed = fileTypeValidator(file);
    if (isFileTypeAllowed) {
      return cb(null, true);
    } else {
      cb(
        new multer.MulterError(
          UNEXPECTED_FILE_TYPE.code,
          UNEXPECTED_FILE_TYPE.message
        )
      ); //multer error handler
    }
  },
}).array("file", 1); //define no. of file can upload
//name of form field in frontend: file

module.exports = multer;
//export default upload;
