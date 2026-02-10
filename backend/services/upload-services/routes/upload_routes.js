const router = require('express').Router();
const multer = require('../../../config/multer_config');
const auth = require('../../../middleware/auth_middlewares');
const { uploadFiles } = require('../controllers/upload_controller');

router.post(
    '/upload',
    auth,
    multer.fields([
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 },
        { name: 'pdf', maxCount: 1 }
    ]),
    uploadFiles
);

module.exports = router;
