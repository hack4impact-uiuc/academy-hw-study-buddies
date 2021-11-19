const express = require('express');
const router = express.Router();

router.use('/home', require('./home'));
router.use('/user', require('./user'));
router.use('/session', require('./session'));

module.exports = router;
