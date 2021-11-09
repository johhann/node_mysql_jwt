const express = require('express')
const router = express.Router()
const posts = require('../controllers/postController')

router.route('/').get(posts.getAllPosts).post(posts.createPost)
router.route('/:id').get(posts.getPost).patch(posts.updatePost).delete(posts.deletePost)

module.exports = router
