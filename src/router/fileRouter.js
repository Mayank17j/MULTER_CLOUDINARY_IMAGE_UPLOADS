const multer = require("multer");
const Router = require("express");
const { upload } = require("../middleware/fileUpload.js");
const { UNEXPECTED_FILE_TYPE } = require("../constants/file.js");
const { fileController } = require("../controllers/fileController.js");
const { imageResize } = require("../middleware/imageResize.js");
const { isFilePresent } = require("../middleware/validators/isFilePresent.js");
const authenticateJWT = require("../middleware/authentication.js");

const fileRouter = Router();
console.log("LOG.fileRouter.START");

fileRouter.post(
  "/upload",
  authenticateJWT, //upload after authenticaiton
  function (req, res, next) {
    console.log(
      "LOG.fileRouter.function.req.files",
      JSON.stringify(req.files || {})
    );

    upload(req, res, function (err) {
      console.log(
        "LOG.fileRouter.upload.req.files",
        JSON.stringify(req.files || {})
      );

      if (err instanceof multer.MulterError) {
        if (err.code === UNEXPECTED_FILE_TYPE.code) {
          console.log("LOG.fileRouter.function.400");
          return res.status(400).json({ error: { description: err.field } });
        } else {
          console.log("LOG.fileRouter.function.500");
          return res.status(500).json({ error: { description: err.message } });
        }
      }
      next();
    });
    console.log("LOG.fileRouter.End");

    //if above succces move to next func -> fileController

    //next();
  },
  fileController, // Controller for handling the file upload
  imageResize, // Middleware for resizing images
  isFilePresent // Validator middleware
);
console.log("LOG.fileRouter.END");

module.exports = { fileRouter };
