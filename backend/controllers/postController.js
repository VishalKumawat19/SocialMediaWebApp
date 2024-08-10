const Post = require('../models/postModel')
const Profile = require('../models/profileModel')
const cloudinary = require('../config/cloudinary')


const createPost = async(req,res,next) =>{
    try {
        const userId = req.user
        const caption = req.body
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "postImages",
          });
        const imageUrl = result.secure_url
        const profileImage = await Profile.findOne({userId}).profileImage
        const newPost = new Post({imageUrl,userId,caption,profileImage})
        await newPost.save()
        res.status(201).json({message:"Post created successfully"})
    } catch (error) {
        next(error)
    }
}


const getUserPosts = async(req,res,next)=>{
    try {
        const userId = req.user
        const posts = await Profile.findOne({userId})
        res.status(200).json({posts:posts})
    } catch (error) {
        next(error)
    }
}

const deletePost = async(req,res,next)=>{
    try {
        const userId= req.user
        const postId = req.params.postId
        const post = await Post.findById(postId)
        if(post.userId!=userId){
            return res.status(403).json({message:"You are not authorized to delete this post"})
        }
        await Post.findByIdAndDelete(postId)
        res.status(200).json({message:"Post deleted successfully"})
    } catch (error) {
        next(error)
    }
}
const getAllPost = async(req,res,next)=>{
    try {
        const userId = req.user
        const posts = await Profile.find({})
        const allPosts = posts.filter(post=>post.userId!=userId)
        res.status(200).json({posts:allPosts})
    } catch (error) {
        next(error)
    }
}

module.exports = {createPost,getUserPosts,deletePost,getAllPost}