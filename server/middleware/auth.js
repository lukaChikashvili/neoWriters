const jwt = require('jsonwebtoken');


const authenticateUser = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 
    if (!token) {
        return res.status(401).json({ message: 'Authorization token is required' });
    }
    try {
        const decoded = jwt.verify(token, 'secret');
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = {authenticateUser};