const bcrypt = require('bcryptjs');


// register users

const registerUsers = async (req, res) => {
    const { name, email, password, location, proffesion } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    
    
   return res.json({
        name, email, password:hashedPassword, location, proffesion
    });
    
 

}
















// export functions
module.exports = {
    registerUsers
}