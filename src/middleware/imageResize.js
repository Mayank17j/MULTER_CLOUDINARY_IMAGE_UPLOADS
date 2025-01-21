//using sharp before using the Multer

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const deserialize = require("v8");

const imageResize = async (req, res, next) => {
  //original file path, original file path
  try {
    const originalFilePath = req.files[0].path;
    const parsedPath = path.parse(originalFilePath);
    const outputFilePath = path.join(
      parsedPath.dir,
      "resized-" + parsedPath.name + ".jpeg"
    );

    await sharp(originalFilePath)
      .resize({ width: 1500 })
      .jpeg({
        quality: 100,
        mozjpeg: true, //maintain file quality
        chromaSubsampling: "4:4:4", //file compression
        trellisQuantisation: true,
        overshootDeringing: true,
        optimizeScans: true,
        progressive: true, //loading image
      })
      .toFile(outputFilePath); //save resized image as a new file

    req.files[0].path = outputFilePath;
    req.originalFilePath = originalFilePath;
  } catch (error) {
    return res.status(500).json({ error: { description: error.message } });
  }
}; //resized image will saved in upload folder

module.exports = imageResize;
