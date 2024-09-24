const multer = require("multer");
const path = require("path");

// Define storage settings
const storage = multer.diskStorage({
  destination: "./uploads/", // Upload directory
  filename: function (req, file, cb) {
    // Naming the file with a timestamp to avoid duplicate names
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// File filter function to allow only images
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/; // Allowed file extensions
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true); // File is valid
  } else {
    cb("Error: Images Only!"); // Reject the file if it's not an image
  }
}

// Initialize Multer with storage settings, file size limits, and file filter
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB limit for file size
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb); // Call file filter function
  },
}).single("image"); // Expecting a single file with the field name 'image'

module.exports = upload;
