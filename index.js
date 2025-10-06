const express = require ("express");
const connectDB = require('./db');

const cors = require('cors');
require('dotenv').config();
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");
const app = express();

app.use(express.json());

// middleware for cors
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

app.use(cors(corsOptions))

app.get('/', (req, res) => {
    res.send( 'Welcome to my posts api')
})
app.use('/posts', postRoutes);
app.use('/user', userRoutes);

const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})
connectDB();