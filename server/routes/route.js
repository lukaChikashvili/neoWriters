const express = require('express');
const router = express.Router();
const actions = require('../controllers/actions');

// all routes

router.post('/register', actions.registerUsers);
router.post('/login', actions.loginUsers);



module.exports = router;