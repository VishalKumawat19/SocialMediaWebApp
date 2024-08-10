const {
  createProfile,
  editProfile,
  getUserProfile,
} = require("../controllers/profileController");
const authenticateUser = require("../middlewares/authenticateUser");
const upload = require("../config/multer");
const express = require("express");
const router = express.Router();

router
  .route("/")
  .post(authenticateUser, upload.single("profileImage"), createProfile)
  .get(authenticateUser, getUserProfile)
  .put(authenticateUser, upload.single("profileImage"), editProfile);

module.exports = router;
