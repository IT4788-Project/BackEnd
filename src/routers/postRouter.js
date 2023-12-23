const postController = require('../controllers/postController')
const authMiddleware = require("../middlerwares/authMiddlerware.js")

const router = require('express').Router()

router.post('/', authMiddleware.authMiddleware, postController.createPost)

router.get('/:postId', authMiddleware.authMiddleware, postController.getDetailPost)

router.get('/', authMiddleware.authMiddleware, postController.getNewPosts)

router.post('/reaction/:postId', authMiddleware.authMiddleware, postController.reactionPost)

router.post('/comment/:postId', authMiddleware.authMiddleware, postController.commentPost)

module.exports = router