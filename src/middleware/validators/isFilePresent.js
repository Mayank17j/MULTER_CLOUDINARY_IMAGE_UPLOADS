const isFilePresent = (req, res, next) => {
  console.log("LOG.isFilePresent.START");

  if (!req.files) {
    console.log("LOG.isFilePresent.400");

    return res
      .status(400)
      .json({ description: "File not present in request body" });
  }

  if (Array.isArray(req.files) && req.files.length === 0) {
    return res.status(400).json({ error: { description: "No file upload" } });
  }
  console.log("LOG.isFilePresent.End");

  next();
};

module.exports = { isFilePresent };
