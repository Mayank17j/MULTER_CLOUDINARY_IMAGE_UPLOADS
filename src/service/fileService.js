const { uploadToCloudinary } = require("../config/cloudinary");
const fs = require("fs");

const cloudinaryUpload = async (file) => {
  try {
    console.log(
      "LOG.fileService.cloudinaryUpload.file.path",
      JSON.stringify(file.path)
    );

    const cloudinaryResponse = await uploadToCloudinary(file.path);
    fs.unlink(file.path, (err) => {
      console.log(
        "LOG.fileService.cloudinaryUpload.file.path",
        JSON.stringify(file.path)
      );

      if (err) {
        console.log("LOG.fileService.cloudinaryUpload.fs.unlink", err);
      }
    });

    console.log(
      "LOG.fileService.cloudinaryUpload.cloudinaryResponse",
      JSON.stringify(cloudinaryResponse)
    );
    return cloudinaryResponse;
  } catch (error) {
    console.log(
      "LOG.fileService.cloudinaryUpload.error",
      JSON.stringify(error)
    );
    console.error(error);
  }
};

module.exports = { cloudinaryUpload };
