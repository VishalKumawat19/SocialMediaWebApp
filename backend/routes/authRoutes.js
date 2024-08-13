const { registerUser, loginUser, logoutUser } = require('../controllers/authController')
const express = require("express")
const router = express.Router()

router.route('/login').post(loginUser)
router.route('/register').post(registerUser)
router.route('/logout').get(logoutUser)

module.exports = router