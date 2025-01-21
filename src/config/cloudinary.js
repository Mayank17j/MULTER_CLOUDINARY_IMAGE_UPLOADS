const v2 = require("cloudinary");
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
  const api_secret = cloudinary.config();
  //get all the key from the obj(paramsToSign).sort.map(key convert into string formate i.e key=value).join
  const sortedParams = Object.keys(paramsToSign)
    .sort()
    .map((key) => `${key}=${paramsToSign[key]}`)
    .join("&");

  //create signature = create new hash using crypto model sha1 algo object.alongwith(api_secret).digest(generate output in hex)
  const signature = crypto
    .createHash("sha1")
    .update(sortedParams + api_secret)
    .digest("hex");

  return signature;
};

//healper func to upload file in cloudinary
const uploadToCloudinary = async (filePath) => {
  try {
    cloudinaryConfig();
    const timestamp = Math.round(new Date().getTime() / 1000);
    const paramsToSign = { timestamp };

    const signature = generateSignature(paramsToSign);
    const result = await cloudinary.uploader.upload(filePath, {
      ...paramsToSign,
      signature,
      api_key: process.env.CLOUDINARY_API_KEY,
    });
    return result;
  } catch (error) {
    console.error(error);
  }
};

module.exports = uploadToCloudinary;
