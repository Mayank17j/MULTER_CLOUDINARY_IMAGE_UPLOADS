//to create JWT token create, require JSON-web-token
const { jwt } = require("jsonwebtoken");
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

  //token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZXNzb24iOiJjbG91ZGluYXJ5VXBsb2FkIiwiaWF0IjoxNzM3NDM0NTY3fQ.ZoDJ0dd6hQqDcVvaPfBTRjYe4O-Cv827yYlwP_StM-0";
  console.log("LOG.token=", token);
  console.log("LOG.process.env.JWT_SECRET=", process.env.JWT_SECRET);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("LOG.decoded=", decoded);

    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid token, authorization denied." });
  }
};

module.exports = authenticateJWT;
