const express = require('express');
const router = express.Router();
const actions = require('../controllers/actions');
const {authenticateUser} = require('../middleware/auth');
const multer = require('multer');


 // create storage
 const storage = multer.diskStorage({
    destination: (req, file, cb) => {
       cb(null, 'uploads');
    },
 
    filename: (req, file, cb) => {
       cb(null, file.originalname);
    }
  });
 
  const upload = multer({storage: storage});
 
  


// all routes

router.post('/register', actions.registerUsers);
router.post('/login', actions.loginUsers);
router.post('/create', authenticateUser, actions.createBook );
router.get('/books', actions.getAllBooks);
router.get('/books/:id',actions.getOneBook);
router.delete('/books/del/:id', actions.removeBook);
router.put('/books/:id/update',  authenticateUser, actions.updateBook);
router.post('/books/:id/comment', authenticateUser, actions.createComment);
router.get('/books/:id/comment/all', authenticateUser, actions.getAllComment);
router.get('/users', authenticateUser, actions.getUserInfo);
router.post('/users/profileImage', upload.single('testImage'), authenticateUser,  actions.uploadImage);
router.get('/users/:id/profileImage', authenticateUser, actions.getImage);
router.put('/users/:id', actions.updateProfileInfo);
router.delete('/books/:id/comment/del', actions.deleteComment);
router.put('/books/:id/comment/update', actions.updateComment);

module.exports = router;