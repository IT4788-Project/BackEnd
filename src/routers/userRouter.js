const userController = require("../controllers/userController.js")
const authMiddleware = require("../middlerwares/authMiddlerware.js")

const router = require('express').Router()
router.get('/all', userController.getAll)
router.put('/:id', authMiddleware.authMiddleware, userController.updateUser)

//
router.post('/findUser/name', authMiddleware.authMiddleware, userController.getUserByName)
router.get('/about/me', authMiddleware.authMiddleware, userController.getUserDisplayInfo)
router.post('/', userController.signUp)
router.post('/follow/:id', authMiddleware.authMiddleware, userController.followUser)
router.get('/follows', authMiddleware.authMiddleware, userController.getFollows)
router.post('/unfollow/:id', authMiddleware.authMiddleware, userController.unfollowUser)
router.put('/image/update', authMiddleware.authMiddleware, userController.updateImageUser)
router.get('/findUser/:userId', authMiddleware.authMiddleware, userController.getUserById)


module.exports = router