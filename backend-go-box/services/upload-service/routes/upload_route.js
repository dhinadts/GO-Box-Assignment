const router = require('express').Router();
const { createUpload } = require('../controllers/upload_controller');
const auth = require('../../../middleware/auth');

router.post('/upload', auth, createUpload);

module.exports = router;
