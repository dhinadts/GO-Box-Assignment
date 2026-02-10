const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Ensure upload directories exist
const pdfDir = path.join(__dirname, '../uploads/pdfs');
const imageDir = path.join(__dirname, '../uploads/images');

[pdfDir, imageDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, pdfDir);
        } else {
            cb(null, imageDir);
        }
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    // PDF validation
    if (file.fieldname === 'pdf') {
        if (file.mimetype !== 'application/pdf') {
            return cb(new Error('Only PDF files are allowed'), false);
        }
    }

    // Image validation
    if (file.fieldname === 'image') {
        const allowedImages = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!allowedImages.includes(file.mimetype)) {
            return cb(new Error('Only JPG, JPEG, PNG images are allowed'), false);
        }
    }

    cb(null, true);
};

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    fileFilter
});

module.exports = upload;
