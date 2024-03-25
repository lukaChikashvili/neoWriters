const bcrypt = require('bcryptjs');
const { User } = require('../models/userModel');
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














// export functions
module.exports = {
    registerUsers,
    loginUsers
}