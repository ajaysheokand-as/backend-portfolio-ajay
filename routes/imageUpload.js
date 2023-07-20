const express = require('express');
const multer = require('multer');
const router = express.Router();
const fs = require('fs');
const path = require('path');


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

// Delete Image
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

// Fetch image
router.get('/getImage/:imageName', (req, res) => {
  const  { imageName }  = req.params;
  // console.log("req.params=>, imagePath __dirname", imageName, __dirname);
  const imagePath = path.join(__dirname, '../assets/product_imgs/', imageName);
  
  console.log("req.params=> 59, imagePath", req.params, imagePath);
  // Read the image file
  fs.readFile(imagePath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(404).send('Image not found');
    }

    // Set the appropriate headers
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Content-Length', data.length);

    // Send the image data to the frontend
    console.log("This is data", data);
    res.send(data);
  });
});

module.exports = router;