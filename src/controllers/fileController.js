//config for cloudinary

const { cloudinaryUpload } = require("../service/fileService.js");

const fileController = async (req, res) => {
  console.log("LOG.fileController.START");

  try {
    if (!req.files) {
      console.log(
        "LOG.400.fileController.File not present in the request body of fileController."
      );
      return res.status(400).json({
        error: {
          description:
            "File not present in the request body of fileController.",
        },
      });
    }

    console.log("LOG.fileController.req.files.", req.files);
    console.log("LOG.fileController.req.files.length", req.files.length);
    console.log(
      "LOG.fileController.Array.isArray(req.files)",
      Array.isArray(req.files),
      "\n"
    );

    if (Array.isArray(req.files) && req.files.length === 0) {
      console.log("LOG.400.fileController.No file uploaded in fileController.");

      return res
        .status(400)
        .json({ error: { description: "No file uploaded in fileController" } });
    }

    const file = req.files[0];
    console.log("LOG.fileController.req.files[0].", JSON.stringify(file));

    const response = await cloudinaryUpload(file);
    console.log("LOG.fileController.response", JSON.stringify(response));

    res.status(200).json({
      message: "File uploaded successfully. fileController",
      uploadResult: response,
    });
  } catch (error) {
    console.log("LOG.500.fileController", error.message);
    res.status(500).json({ message: error.message });
  }
  console.log("LOG.fileController.End");
};

module.exports = { fileController };
