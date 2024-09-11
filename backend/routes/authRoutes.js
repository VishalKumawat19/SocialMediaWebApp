const { registerUser, loginUser, logoutUser, verifyUser } = require('../controllers/authController')
const express = require("express")
const router = express.Router()
const authenticateUser = require('../middlewares/authenticateUser')

router.route('/login').post(loginUser)
router.route('/register').post(registerUser)
router.route('/verify').get(authenticateUser,verifyUser)
router.route('/logout').get(logoutUser)


module.exports = router