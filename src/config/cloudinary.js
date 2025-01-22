const { v2 } = require("cloudinary");
const crypto = require("crypto");
const cloudinary = v2;

const cloudinaryConfig = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};

//For cloudinary secure auth
const generateSignature = (paramsToSign) => {
  const { api_secret } = cloudinary.config();
  console.log("LOG.cloudinary.generateSignature.api_secret", api_secret);

  //get all the key from the obj(paramsToSign).sort.map(key convert into string formate i.e key=value).join
  const sortedParams = Object.keys(paramsToSign)
    .sort()
    .map((key) => `${key}=${paramsToSign[key]}`)
    .join("&");
  console.log("LOG.cloudinary.generateSignature.sortedParams", sortedParams);

  //create signature = create new hash using crypto model sha1 algo object.alongwith(api_secret).digest(generate output in hex)
  const signature = crypto
    .createHash("sha1")
    .update(sortedParams + api_secret)
    .digest("hex");
  console.log("LOG.cloudinary.generateSignature.signature", signature);

  return signature;
};

//healper func to upload file in cloudinary
const uploadToCloudinary = async (filePath) => {
  console.log("LOG.cloudinary.uploadToCloudinary.filePath", filePath);

  try {
    cloudinaryConfig();
    console.log("LOG.cloudinary.uploadToCloudinary.cloudinaryConfig() DONE");

    const timestamp = Math.round(new Date().getTime() / 1000);
    console.log("LOG.cloudinary.uploadToCloudinary.timestamp", timestamp);

    const paramsToSign = { timestamp };
    console.log("LOG.cloudinary.uploadToCloudinary.paramsToSign", paramsToSign);

    const signature = generateSignature(paramsToSign);
    console.log("LOG.cloudinary.uploadToCloudinary.generateSignature() DONE");
    console.log("LOG.cloudinary.uploadToCloudinary.signature", signature);

    const result = await cloudinary.uploader.upload(filePath, {
      ...paramsToSign,
      signature,
      api_key: process.env.CLOUDINARY_API_KEY,
    });
    console.log("LOG.cloudinary.uploadToCloudinary.result", result);

    return result;
  } catch (error) {
    console.error("LOG.uploadToCloudinary.500", error);
  }
};

module.exports = { uploadToCloudinary };
