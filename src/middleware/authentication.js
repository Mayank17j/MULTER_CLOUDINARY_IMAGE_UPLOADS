//to create JWT token create, require JSON-web-token
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateJWT = (req, res, next) => {
  //token get in header on frontend
  //split with space and 1st element will be token Ex. "Bearer <token>"
  //arry0 [arr1]
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token)
    return res
      .status(403)
      .json({ message: "No token provides, authorisation denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("LOG. authentication.decoded.SUCCESSFUL=", decoded);

    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid token, authorization denied." });
  }
};

module.exports = authenticateJWT;
