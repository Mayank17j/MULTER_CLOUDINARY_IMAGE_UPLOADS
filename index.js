const express = require("express");
const fs = require("fs");
const { fileRouter } = require("./src/router/fileRouter.js");
//const fileURLToPath = require("url");
const path = require("path");
const cors = require("cors");
const app = express();

//http://localhost:3000/
//https:.cloudinary.com/console/c-67389e95827e1cd1e446f26c5ddd61/media_library/search?q=&view_mode=mosaic&sortField=createdAt

//extract file path to upload file using fileUrlToPath
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename); //extract dirname of path having file __filename

const uploadDir = path.join(__dirname, "uploads");
console.log("LOG.index.uploadDir.concateWith", __dirname);
console.log("LOG.index.uploadDir", uploadDir);

//make sure uploads dir exist ifnot create
console.log("LOG.index.fs.existsSync(uploadDir)", fs.existsSync(uploadDir));
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir); //if not create
}

app.use(cors());

//to serve static files like images
app.use("/src/uploads", express.static("src/uploads"));

app.use("/files", fileRouter);

app.use("/", (req, res) => {
  res.send("Welcome to file/image upload");
});

const PORT = process.env.PORT || 4040;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
