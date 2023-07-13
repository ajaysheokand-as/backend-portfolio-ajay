const express = require('express');
const multer = require('multer');
const router = express.Router();

// Configure the multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './assets/product_imgs'); // Replace with the path where you want to save the images
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = file.originalname.split('.').pop();
    cb(null, uniqueSuffix + '.' + fileExtension);
  }
});

// Create the Multer instance
const upload = multer({ storage: storage });


// Define the file upload route
router.post('/uploadImage', upload.single(`image`), (req, res) => {
  // Access the uploaded file via req.file
  if (req.file) {
    res.status(200).json({ message: 'Image uploaded successfully', file: req.file });
  } else {
    res.status(500).json({ error: 'Error uploading image', });
  }
});

module.exports = router;