const express = require('express');
const router = express.Router();
const actions = require('../controllers/actions');
const {authenticateUser} = require('../middleware/auth');


// all routes

router.post('/register', actions.registerUsers);
router.post('/login', actions.loginUsers);
router.post('/create', authenticateUser, actions.createBook );
router.get('/books', actions.getAllBooks);

module.exports = router;