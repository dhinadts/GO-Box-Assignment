const router = require('express').Router();
const upload = require('../../../config/multer_config');
const auth = require('../../../middleware/auth_middlewares');
const { uploadFiles } = require('../controllers/upload_controller');

router.post(
  '/upload',
  auth,
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'pdf', maxCount: 1 }
  ]),
  uploadFiles
);

module.exports = router;
