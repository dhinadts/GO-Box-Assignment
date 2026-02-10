// services/upload-service/controllers/upload_controller.js
const Upload = require('../models/upload_model');
const fs = require('fs');

exports.uploadFiles = async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const image1 = req.files.image1?.[0];
    const image2 = req.files.image2?.[0];
    const pdf = req.files.pdf?.[0];

    if (!image1 || !image2 || !pdf) {
      return res.status(400).json({
        message: 'image1, image2 and pdf are required'
      });
    }

    const upload = await Upload.create({
      image1: image1.path,
      image2: image2.path,
      pdf: pdf.path,
      userId: req.user.id
    });

    res.status(201).json({
      message: 'Files uploaded successfully',
      data: upload
    });

  } catch (error) {
    // cleanup uploaded files if DB fails
    if (req.files) {
      Object.values(req.files).flat().forEach(file => {
        fs.existsSync(file.path) && fs.unlinkSync(file.path);
      });
    }

    console.error(error);
    res.status(500).json({
      message: 'File upload failed',
      error: error.message
    });
  }
};
