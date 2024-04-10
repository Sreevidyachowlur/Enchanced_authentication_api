const multer = require("multer");
const path = require("path");

// Set up multer storage options
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/img/"); // Uploads will be stored in the 'uploads' directory
  },
  filename: function (req, file, cb) {
    // Rename file to prevent conflicts
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

console.log("storage", storage.destination);
// // Error handling middleware for multer
// const multerErrorHandler = function (err, req, res, next) {
//   if (err instanceof multer.MulterError) {
//     // Multer error occurred (e.g., file size exceeds limit)
//     res.status(400).json({ success: false, error: err.message });
//   } else {
//     // Other errors occurred
//     res.status(500).json({ success: false, error: "Internal server error" });
//   }
// };

// // Initialize multer upload middleware with error handling middleware
// let upload = multer({
//   storage: storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // Example: Limit file size to 5MB
//   fileFilter: function (req, file, cb) {
//     // Example: Allow only .jpg, .jpeg, .png files
//     if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//       cb(null, true);
//     } else {
//       cb(new Error("Only JPEG/PNG files are allowed"));
//     }
//   },
//   onError: multerErrorHandler, // Error handling middleware for multer
// });

// Initialize multer upload middleware
upload = multer({ storage: storage });

module.exports = upload;
