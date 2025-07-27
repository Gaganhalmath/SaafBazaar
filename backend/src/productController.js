const cloudinary = require('./utils/cloudinary');

exports.uploadProductImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const result = await cloudinary.uploader.upload_stream(
      { resource_type: 'image' },
      (error, result) => {
        if (error) return res.status(500).json({ error: error.message });
        return res.json({ url: result.secure_url });
      }
    );

    // Pipe the buffer to Cloudinary
    req.file.stream.pipe(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};