const jwt = require('jsonwebtoken')
require('dotenv').config();
// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const authHeader = req.headers.authorization;
    const word = authHeader.split(" ")
    const token = word[1];
    const isValidToken = jwt.verify(token, process.env.JWT_SECRET);

    if(isValidToken.username){
        next();
    }
    else{
        res.json({
            msg: "You are not authorized"
        })
    }
}

module.exports = adminMiddleware;