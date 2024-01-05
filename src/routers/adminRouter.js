// const {ControlTower} = require("aws-sdk")
const adminsController = require("../controllers/adminController.js")

const router = require('express').Router()


router.post('/register', adminsController.registerAdmins)

router.post('/login', adminsController.loginAdmins)


router.get('/allPost/report', adminsController.verifyToken, adminsController.getAllPostReport)

router.put('/changePassword', adminsController.verifyToken, adminsController.updatePassword)

router.put('/updateUser/:id', adminsController.verifyToken, adminsController.updateUser)

router.get('/allUser', adminsController.verifyToken, adminsController.getAllUsers)

router.post('/allUserByUsername', adminsController.verifyToken, adminsController.getUserByUsername)

router.post('/allUserByEmail', adminsController.verifyToken, adminsController.getUserByEmail)

router.post('/allByEmailUserName', adminsController.verifyToken, adminsController.getUserByEmailAndUsername)

router.delete('/deleteUser/:id', adminsController.verifyTokenSysTem, adminsController.deleteUser)

router.delete('/deletePost/:postId', adminsController.verifyToken, adminsController.deletePost)

router.get('/sort/post/all', adminsController.verifyToken, adminsController.sortPost)


module.exports = router