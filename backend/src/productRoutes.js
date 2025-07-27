const express = require('express');
const router = express.Router();
const upload = require('./middleware/imageUpload');
const { uploadProductImage } = require('./productController');

router.post('/upload-image', upload.single('image'), uploadProductImage);

module.exports = router;