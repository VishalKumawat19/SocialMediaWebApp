const {createPost,getUserPosts,deletePost,getAllPost} = require('../controllers/postController')
const authenticateUser = require('../middlewares/authenticateUser')
const express = require('express')
const router = express.Router()
const {upload} = require('../config/upload')

router.route('/post').post(authenticateUser,upload.single('postImage'),createPost).get(authenticateUser,getUserPosts)
router.route('/post/:postId').delete(authenticateUser,deletePost)
router.route('/all').get(authenticateUser,getAllPost)

module.exports = router




