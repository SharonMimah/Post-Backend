const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL;
const connectDB = async()=>{
    try {
      await mongoose.connect(process.env.MONGO_URL);  
      console.log(" Your connection to mongodb is successful");
    } catch (error) {
        console.log(error)
        
    }
}
module.exports = connectDB;