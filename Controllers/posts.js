const Post = require("../models/posts")
 //createpost
const createPost = async (req,res) => {
    const post = req.body
    const newPost = new Post({...post, creator: req.userId, createdAt: new Date().toISOString()})
    try {
        await newPost.save();
        res.status(201).json({newPost})
        
    } catch (error) {
        res.status(404).json({message: error.message})
        
    }
}
const getAllPosts = async (req,res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}
//update post
const updatePost = async (req, res) => {
    const postId = req.params.id;
    const userId = req.user.id; //from jwt middleware
    const {title, content } = req.body;
    try {
        //find the post find
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message : 'post not found'});

        }
        //check if the user owns the post
        if (post.author.toString() !==userId) {
            return res.status(403).json({ message: ' unauthorized to update this post'});
        }
        //update the post
        const updatedPost = await Post.findByIdAndUpdate(id. updates, { new: true});
        return res.status(200).json(updatedPost);
       
    } catch (error) {
        console.error('Error updating post:',error);
         return res.status(500).json({ message:'server error'});
    }
    
}
//delete posts
const deletePost = async(req,res) => {
    try {
        const postId = req.params.id;
        const userId = req.user.id;
        
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json ({message: 'Post not found'});
        //Authorization check - only post owner can delete 
        if (post. author.toString() !==userId) {
            return res.status(403).json({ message: 'You can only delete your own posts'});
        }
        await Post.findByIdAndDelete(postId);
        res.status(200).json({message:'Post deleted successfully'})
    } catch (error) {
        res.status(500).json({message:error.message }); 
    }
}
module.exports = {
    createPost,
    getAllPosts,
    updatePost,
    deletePost
    
}