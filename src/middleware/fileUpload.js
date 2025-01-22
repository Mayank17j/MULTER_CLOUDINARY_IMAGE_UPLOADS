const path = require("path");
//setting up multer for storage and upload
const multer = require("multer");
const { fileTypeValidator } = require("../utils/fileTypeValidator.js");
const { UNEXPECTED_FILE_TYPE } = require("../constants/file.js");

//to upload file from local disk

//storage.destination - Setting upload directory for file.
console.log("\n\nLOG.fileUpload.START");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //req,file,callback
    console.log(
      "\nLOG.fileUpload.storage.destination - Setting upload directory for file."
    );
    console.log(
      "LOG.fileUpload.storage.destination.req",
      JSON.stringify(req.body || {})
    );
    console.log(
      "LOG.fileUpload.storage.destination.file",
      JSON.stringify(file || {})
    );

    cb(null, "uploads"); //uploads: temp folder to upload images
  },
  //storage.filename - Generating file name
  filename: (req, file, cb) => {
    console.log("\nLOG.fileUpload.storage.filename - Generating file name.");
    console.log(
      "LOG.fileUpload.storage.filename.req",
      JSON.stringify(req.body || {})
    );
    console.log(
      "LOG.fileUpload.storage.filename.file",
      JSON.stringify(file || {})
    );
    //TODO: file path
    const generatedFileName = Date.now() + path.extname(file.originalname);
    console.log(
      "LOG.fileUpload.storage.filename.generatedFileName",
      Date.now(),
      path.extname(file.originalname),
      file.originalname
    );

    cb(null, generatedFileName);
  },
});

//upload location and file type
const upload = multer({
  storage: storage,

  //fileUpload.fileFilter - Validating file type.
  fileFilter: (req, file, cb) => {
    //check file validity to upload
    console.log("\nLOG.fileUpload.fileFilter - Validating file type.");
    console.log(
      "LOG.fileUpload.fileFilter.req",
      JSON.stringify(req.body || {})
    );
    console.log("LOG.fileUpload.fileFilter.file", JSON.stringify(file || {}));

    //File type is allowed.
    const isFileTypeAllowed = fileTypeValidator(file);
    console.log(
      "LOG.fileUpload.upload, isFileTypeAllowed",
      JSON.stringify(isFileTypeAllowed)
    );
    if (isFileTypeAllowed) {
      console.log("LOG.fileUpload.fileFilter - File type is allowed.");

      return cb(null, true);
    } else {
      console.log(
        "LOG.fileUpload.fileFilter - File type is NOT allowed. Throwing MulterError."
      );

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

console.log("\nLOG.fileUpload.uploads.storage ", JSON.stringify(storage));
console.log("LOG.fileUpload.upload", JSON.stringify(upload));
console.log("LOG.fileUpload.ENDS");

module.exports = { upload };
