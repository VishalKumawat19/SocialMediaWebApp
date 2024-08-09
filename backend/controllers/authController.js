const User = require('../models/authModel')
const generateAccessToken = require('../utils/generateAccessToken')
const generateRefreshToken = require('../utils/generateRefreshToken')


const TOKEN_EXPIRY_TIME = 7 * 24 * 60 * 60 * 1000;

const cookieOptions = {
    httpOnly: true,
    sameSite: "Strict",   
    maxAge: TOKEN_EXPIRY_TIME,
  }

const register = async(req,res,next)=>{
   try {
    const {username,email,password} = req.body
    const userExists = await User.findOne({$or:[{username},{email}]})

    if(userExists){
        res.status(409).json({message:"User already exists"})
    }

    const newUser = new User({username,email,password})
    const savedUser = await newUser.save()
    req.user = savedUser._id
    const accessToken = generateAccessToken(savedUser._id)
    const refreshToken = generateRefreshToken(savedUser._id)

    res.cookie("accessToken",accessToken,cookieOptions)
    res.cookie("refreshToken",refreshToken,cookieOptions)

    res.status(201).json({message:"User registered successfully"})
   } catch (error) {
    next(error)
   }
}