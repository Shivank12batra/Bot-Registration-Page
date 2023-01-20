const express = require('express');
const router = express.Router();

const register = require('../controllers/authenticate')

router.route('/').post(register)

module.exports = router;