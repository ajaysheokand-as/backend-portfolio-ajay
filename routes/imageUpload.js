const express = require('express');
const multer = require('multer');
const router = express.Router();
const fs = require('fs');

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

router.delete('/uploadImage/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  console.log("This is imageName=>33 ", imageName)
  const imagePath = './assets/product_imgs/' + imageName; // Specify the path of the image to be deleted
  console.log("This is imagePath=>", imagePath);
  // Perform the deletion here
  // For example:
  fs.unlink(imagePath, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred while deleting the image.');
    }

    res.send('Image deleted successfully.');
  });
});

module.exports = router;