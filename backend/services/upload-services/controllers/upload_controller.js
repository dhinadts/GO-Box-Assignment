// services/upload-service/controllers/upload.controller.js
const Upload = require('../models/upload_model');

exports.uploadFiles = async (req, res) => {
  const { image1, image2, pdf } = req.files;

  const upload = await Upload.create({
    image1: image1[0].path,
    image2: image2[0].path,
    pdf: pdf[0].path,
    userId: req.user.id
  });

  res.status(201).json(upload);
};
