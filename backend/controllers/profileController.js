const Profile = require("../models/profileModel");
const cloudinary = require("../config/cloudinary");

const createProfile = async (req, res, next) => {
  try {
    const userId = req.user;
    const { fullname, gender, bio } = req.body;
    const profileExists = await Profile.findOne({ userId });

    if (profileExists) {
      return res
        .status(409)
        .json({ message: "Profile already created for this user" });
    }

    

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "profileImages",
    });

    const profileImage = result.secure_url;

    const newProfile = new Profile({
      userId,
      fullname,
      gender,
      bio,
      profileImage,
    });

    await profileImage.save();
    res.status(201).json({
      message: "Profile created successfully",
    });
  } catch (error) {
    next(error);
  }
};

const editProfile = async (req, res, next) => {
  try {
    const userId = req.user;
    const { fullname, gender, bio } = req.body;
    const profileExists = await Profile.findOne({ userId });
    if (!profileExists) {
      return res.status(404).json({
        message: "Profile does not exist",
      });
    }
    const profileId = profileExists._id;
    if (req.file.path) {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "profileImages",
          });
      const profileImage = result.secure_url;
      await Profile.findByIdAndUpdate(
        profileId,
        { fullname, bio, gender, profileImage },
        { runValidators: true }
      );
      return res.status(200).json({ message: "Profile updated successfully" });
    } else {
      await Profile.findByIdAndUpdate(
        profileId,
        { fullname, bio, gender },
        { runValidators: true }
      );
      return res.status(200).json({ message: "Profile updated successfully" });
    }
  } catch (error) {
    next(error);
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    const userId = req.user;
    const getUserProfile = await Profile.findOne({ userId });
    res.status(200).json({ profile: getUserProfile });
  } catch (error) {
    next(error);
  }
};

module.exports = { createProfile, editProfile, getUserProfile };
