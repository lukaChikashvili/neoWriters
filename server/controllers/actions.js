const bcrypt = require('bcryptjs');
const { User } = require('../models/userModel');
const { Book } = require('../models/bookModel');
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

   const token = jwt.sign({id: user._id}, 'secret', {expiresIn: '30d'});

   res.json({message: 'loggin succesfull', token, name});

}


// create book
const createBook = async (req, res) => {
   const {title, type, desc, text, url} = req.body;

    if(!req.user) {
      return res.status(404).json({message: "not authorized"});
    }

    const userId = req.user.id;



    const newBook = new Book({title, type, desc, text, url,  author: userId});

    await newBook.save();

    return res.json({message: 'book created', book: newBook});

}

// get all books
const getAllBooks = async (req, res) => {
     
   const books = await Book.find().populate('author', 'name');

   return res.json({books});
}










// export functions
module.exports = {
    registerUsers,
    loginUsers,
    createBook,
    getAllBooks
}