const jwt = require("jsonwebtoken");

const User = require('../models/users');

const auth = async (req,res,next) => {

    try {
        const token = req.headers.authorization.split("")[1];
       // const isCustomAuth = token.length < 500;
        let decodedData;
        if (token) {
            decodedData = jwt.verify(token, 'test');
            req.userId = decodedData.id;
        }
           next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
}
module.exports = auth;