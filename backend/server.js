const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

/* Storage configuration */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

/* Serve uploaded images */

app.use("/uploads", express.static("uploads"));

/* Upload route */
app.get("/", (req, res) => {
  res.send("Image Upload Server Running");
});
app.post("/upload", upload.single("image"), (req, res) => {
  res.send("Image Uploaded Successfully");
});

/* Start server */

app.listen(5000, () => {
  console.log("Server running on port 5000");
});