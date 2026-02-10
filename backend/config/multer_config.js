// config/multer.js
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, 'uploads/pdfs');
        } else {
            cb(null, 'uploads/images');
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter(req, file, cb) {
        if (
            file.fieldname === 'pdf' &&
            file.mimetype !== 'application/pdf'
        ) {
            cb(new Error('Only PDF allowed'));
        } else {
            cb(null, true);
        }
    },
});





module.exports = multer({ storage, upload });
