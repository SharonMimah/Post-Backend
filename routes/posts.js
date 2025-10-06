const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");

const { createPost, updatePost, deletePost } = require("../Controllers/posts");
router.post("/", createPost);

router.put('/posts/:id', auth, updatePost);
 
router.delete('/posts/:id', auth, deletePost);

router.get("/", (req, res) => {
    res.send("Welcome to posts api")
});
module.exports = router;
