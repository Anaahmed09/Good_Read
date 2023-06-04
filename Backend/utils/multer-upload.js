const path = require("path");
const multer = require("multer");
const uuidv4 = require("uuid/v4");

// the directory that containes the uploaded the images
const DIR = path.join(__dirname, "../uploads");

// configure multer for uploading images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    let fileName = file.originalname.toLowerCase().split(" ").join("-");
    fileName = uuidv4() + "-" + fileName;
    cb(null, fileName);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

module.exports = upload;
