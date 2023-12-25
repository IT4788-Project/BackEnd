const userController = require("../controllers/userController.js")
const authMiddleware = require("../middlerwares/authMiddlerware.js")

const router = require('express').Router()
// router.put('/:id', userController.updateUser)
// router.get('/', userController.getAllUser)
router.post('/', userController.signUp)
router.post('/follow/:id', authMiddleware.authMiddleware, userController.followUser)
router.get('/follows', authMiddleware.authMiddleware, userController.getFollows)
router.post('/unfollow/:id', authMiddleware.authMiddleware, userController.unfollowUser)


module.exports = router