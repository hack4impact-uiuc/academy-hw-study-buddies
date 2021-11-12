const express = require('express');
const router = express.Router();

router.use('/home', require('./home'));
router.use('/session', require('./session'));

module.exports = router;
