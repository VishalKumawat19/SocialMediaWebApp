const Post = require('../models/postModel')
const Profile = require('../models/profileModel')
// const cloudinary = require("../config/cloudinary");
// const fs = require('fs');
// const path = require('path');
const {uploadToCloudinary} = require('../config/upload')
const User = require('../models/authModel');


const noProfileImageURL= "https://res.cloudinary.com/df5qnxlqb/image/upload/fl_preserve_transparency/v1723465359/vwwwsyridynhwf54anco.jpg?_s=public-apps";
const createPost = async(req,res,next) =>{
    try {
        const userId = req.user
        console.log(userId)
        const {caption} = req.body
        // const result = await cloudinary.uploader.upload(req.file.path);

        // fs.unlinkSync(req.file.path);
        const result = await uploadToCloudinary(req.file)
        const imageUrl = result.secure_url
        const profile = await Profile.findOne({userId})
        if(!profile){
        const user = await User.findById(userId)
        const username = user.username
        const profileImage = noProfileImageURL;
        const newPost = new Post({profileImage,imageUrl,caption,userId,username})
        await newPost.save()
        return res.status(201).json({message:"Post created successfully"})
        }
        const user = await User.findById(userId)
        const username = user.username
        const profileImage = profile.profileImage
        const newPost = new Post({profileImage,imageUrl,caption,userId,username})
        await newPost.save()
        res.status(201).json({message:"Post created successfully"})
    } catch (error) {
        next(error)
    }
}


const getUserPosts = async(req,res,next)=>{
    try {
        const userId = req.user
        const posts = await Post.find({userId})
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
        const posts = await Post.find({})
        const allPosts = posts.filter(post=>post.userId!=userId)
        res.status(200).json({posts:allPosts})
    } catch (error) {
        next(error)
    }
}

module.exports = {createPost,getUserPosts,deletePost,getAllPost}