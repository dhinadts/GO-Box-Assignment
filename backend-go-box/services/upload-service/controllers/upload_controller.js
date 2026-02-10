// services/upload-service/controllers/upload.controller.js
const Upload = require('../models/upload_model');
const fs = require('fs');

exports.createUpload = async (req, res) => {
    try {
        if (!req.files) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        const image1 = req.files.image1?.[0];
        const image2 = req.files.image2?.[0];
        const pdf = req.files.pdf?.[0];

        // required file validation
        if (!image1 || !image2 || !pdf) {
            return res.status(400).json({
                message: 'image1, image2 and pdf are required'
            });
        }

        // extra safety (multer already checks this, but good practice)
        if (pdf.size > 10 * 1024 * 1024) {
            return res.status(400).json({ message: 'PDF must be <= 10MB' });
        }

        if (
            image1.size > 10 * 1024 * 1024 ||
            image2.size > 10 * 1024 * 1024
        ) {
            return res.status(400).json({ message: 'Images must be <= 10MB' });
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

    } catch (err) {
        // cleanup uploaded files if DB fails
        if (req.files) {
            Object.values(req.files)
                .flat()
                .forEach(file => {
                    if (fs.existsSync(file.path)) {
                        fs.unlinkSync(file.path);
                    }
                });
        }

        console.error(err);
        res.status(500).json({ message: 'Upload failed' });
    }
};
