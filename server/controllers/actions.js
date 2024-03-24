const bcrypt = require('bcryptjs');
const { User } = require('../models/userModel');

// register users

const registerUsers = async (req, res) => {
    const { name, email, password, location, proffesion } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const registeredUser = new User({name, email, password: hashedPassword, location, proffesion});

     try {
        await registeredUser.save();
     } catch (error) {
        console.log(error);
     }


    
 

}
















// export functions
module.exports = {
    registerUsers
}