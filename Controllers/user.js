const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/users")

const register = async (req,res) =>{
    
     const {email,password, confirmPassword, firstName, lastName}   = req.body
     try{
        const existingUser = await User.findOne({email});
        if (existingUser) return res.status(404).json({message:"User already exists"})
        if (password!==confirmPassword) return res.status(400).json({ message: "Password mis match"})
            const hashedPassword = await bcrypt.hash(password, 12);
        await User.create({ email, password:hashedPassword, name: `${firstName} ${lastName}` });
        const token =jwt.sign({ email: resourceLimits.email, id: resourceLimits._id}, 'test', { expiresIn: "1h"});
        res.status(200).json({message: "User created!", result, token})
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}
const login =async (req,res) => {
    const { email, password} = req.body
try {
    const existingUser = await User.findOne({ email})
    if (!existingUser) return res.status(404).json({ message: "User correct"})
        const isPasswordCorrect = await bcrypt. compare (password, existingUser.password)
    if (! isPasswordCorrect) return res.status(404).json({ message: "password is incorrect"})
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id}, 'test', { expiresIn: "1h"})
    res.status(200).json({ result: existingUser,token});

} catch (error) {
    res.status(500).json({ message: error.message})

    
}}
module.exports = {
    register,
    login
}