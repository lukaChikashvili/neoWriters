const bcrypt = require('bcryptjs');
const { User } = require('../models/userModel');
const { Book } = require('../models/bookModel');
const { Comment } = require('../models/commentModel');
const { Image } = require('../models/ImageModel');
const fs  = require('fs');
const jwt = require('jsonwebtoken');


// register users

const registerUsers = async (req, res) => {
    const { name, surname,  email, password, location, proffesion } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const registeredUser = new User({name, surname,  email, password: hashedPassword, location, proffesion});

     try {
        await registeredUser.save();

  
     } catch (error) {
        console.log(error);
     }



}

// login users
const loginUsers = async (req, res) => {
   const { name, password} = req.body;

   const user = await User.findOne({name});

   if(!user) {
    return res.status(404).json({message: 'invalid credentials'});

   }

   const validPassword = await bcrypt.compare(password, user.password);

   if(!validPassword) {
    return res.status(404).json({message: "invalid password"});
   }

   const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '30d'});

   res.json({message: 'loggin succesfull', token, name});

 

}


// create book
const createBook = async (req, res) => {
   const {title, type, desc, text, url, price} = req.body;

    if(!req.user) {
      return res.status(404).json({message: "not authorized"});
    }

    const userId = req.user.id;
    const defaultUrl = 'https://islandpress.org/files/default_book_cover_2015.jpg';
    const imageUrl = url || defaultUrl;


    const newBook = new Book({title, type, desc, text, url:imageUrl, price,  author: userId});

    await newBook.save();

    return res.json({message: 'book created', book: newBook});

}

// get all books
const getAllBooks = async (req, res) => {
     
   const books = await Book.find().populate('author', 'name');

   return res.json({books});
}


// get one book
const getOneBook = async (req,res) => {
  const { id } = req.params;

  const oneBook = await Book.findById(id).populate('author', 'name');

  return res.json({oneBook});
}

// delete book
const removeBook = async (req, res) => {
   const { id } = req.params;

   const removedBookId = await Book.findByIdAndDelete(id);

   if(!removedBookId) {
      return res.status(404).json({message: "can't delete", removedBookId});
   }
}

// update book
const updateBook = async (req, res) => {
   try {
      const { id } = req.params;
      const { title, type, desc, text, url, price } = req.body;

      const updatedBook = await Book.findByIdAndUpdate(id, { title, type, desc, text, url, price });

      if (!updatedBook) {
         return res.status(404).json({ message: "Book not found" });
      }

      return res.json({ message: "Book updated", updatedBook });
   } catch (error) {
      // Handle errors
      console.error("Error updating book:", error);
      return res.status(500).json({ message: "Internal server error" });
   }
}


// create comment
const createComment = async (req, res) => {
   try {
      if (!req.user) {
         return res.status(401).json({ message: 'Unauthorized: Token not provided' });
       }
   
       const { text } = req.body;
  
       if (!text) {
        return res.status(400).json({ message: 'Text field is required' });
      }
       const { id } = req.params;
       const userId = req.user.id;

       const newComment = new Comment({text, author: userId, book: id });
   
       await newComment.save();
       res.json({message: 'comment created', comment: newComment });
   } catch (error) {
      console.log(error);
   }
}

// get all comments
const getAllComment = async (req, res) => {
   const { id } = req.params;

   const getComment = await Comment.find({ book: id }).populate('author', 'name');

   const commentsWithUserNames = getComment.map(comment => ({
      _id: comment._id,
      text: comment.text,
      createdAt: comment.createdAt,
      user: comment.author?.name 
  }));

    return res.status(200).json({ getComment: commentsWithUserNames });
}


// delete comment
const deleteComment = async (req, res) => {
   const { id } = req.params;

   try {
       const commentId = await Comment.findByIdAndDelete(id);

       if (!commentId) {
           return res.status(404).json({ message: "comment not found" });
       }

       return res.status(200).json({ message: "comment deleted" });
   } catch (error) {
       console.log(error);
       return res.status(500).json({ message: "Internal server error" });
   }
}






// get user info
const getUserInfo = async (req, res) => {
   try {
    
      const userId = req.user.id;

      
      const user = await User.findById(userId);

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.json({ user });
  } catch (error) {
      console.error("Error fetching user info:", error);
      res.status(500).json({ message: "Internal server error" });
  }
}

// upload images
const uploadImage = async (req, res) => {
 
   const userId = req.user.id;

   const saveImage = new Image({
     
      img: {
         data: fs.readFileSync('uploads/' + req.file.filename),
         contentType: "image/png"
      },

      uploadedBy: userId

   });

   await saveImage.save();
   res.json({message: 'image is saved'});
}


// get image
const getImage = async (req, res) => {
   const userId = req.user.id;
   try {
      const allImages = await Image.find({uploadedBy: userId});
      const imagesBase64URL = allImages.map(image => ({
         
         dataURL: `data:${image.img.contentType};base64,${image.img.data.toString('base64')}`,
         contentType: image.img.contentType
      }));

      res.json(imagesBase64URL);
   } catch (error) {
      console.error("Error fetching images:", error);
      res.status(500).json({ message: 'Internal server error' });
   }
}

// update profile info
const updateProfileInfo = async (req, res) => {
   const { id } = req.params;
   const { name, surname,  email, location, proffesion } = req.body;

   const newInfo = await User.findByIdAndUpdate(id, { name, surname,  email, location, proffesion })

   if(!newInfo) {
      return res.status(404).json({message: "not updated"});
   }

   return res.status(200).json({message: 'profile info updated', newInfo});
   
}

// reset password
const resetPassword = async (req, res) => {
   const userId = req.user.id;
   const {password} = req.body;

   const findUser =  await User.findByIdAndUpdate(userId, { password });

   if(!findUser) {
      return res.status(404).json({message: "user not found"});

   }

  return res.json({findUser});

}
// export functions
module.exports = {
    registerUsers,
    loginUsers,
    createBook,
    getAllBooks,
    getOneBook,
    removeBook,
    updateBook,
    createComment,
    getAllComment,
    getUserInfo,
    uploadImage,
    getImage,
    updateProfileInfo,
    resetPassword,
    deleteComment
}