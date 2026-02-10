const router = require('express').Router();
const { login } = require('../controllers/auth_controller');

router.post('/login', login);

module.exports = router;
