const User = require("../models/authModel");
const generateAccessToken = require("../utils/generateAccessToken");
const generateRefreshToken = require("../utils/generateRefreshToken");
const bcrypt = require('bcryptjs')

const TOKEN_EXPIRY_TIME = 7 * 24 * 60 * 60 * 1000;

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // Ensure this is true if using HTTPS
  // sameSite:'None',
  maxAge: TOKEN_EXPIRY_TIME,
};

const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const userExists = await User.findOne({ $or: [{ username }, { email }] });

    if (userExists) {
      res.status(409).json({ message: "User already exists" });
    }

    const newUser = new User({ username, email, password });
    const savedUser = await newUser.save();
    req.user = savedUser._id;
    const accessToken = generateAccessToken(savedUser._id);
    const refreshToken = generateRefreshToken(savedUser._id);

    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(400)
        .json({ message: "Please fill in all  the fields" });
    const userExists = await User.findOne({ username });

    if (!userExists)
      return res.status(401).json({ message: "Invalid credentials" });

    const verifyPassword = await bcrypt.compare(password, userExists.password);
    if (!verifyPassword)
      return res.status(401).json({ message: "Invalid credentials" });
    req.user = userExists._id;
    const accessToken = generateAccessToken(userExists._id);
    const refreshToken = generateRefreshToken(userExists._id);

    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);

    res.status(200).json({ message: "User loggedin successfully" });
  } catch (error) {
    next(error);
  }
};

const logoutUser = (req,res,next) => {
    // const token = req.cookies.token;
    // if(!token) return res.status(401).json({message:"You are not authorized to logout"})
   try {
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    res.status(200).json({message:"User logged out successfully"})
   } catch (error) {
    next(error)
   }
  };

module.exports = { registerUser, loginUser, logoutUser };
