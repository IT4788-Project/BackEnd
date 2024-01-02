const imageController = require("../controllers/imageController.js")
const authMiddleware = require("../middlerwares/authMiddlerware.js")
const router = require('express').Router()

router.get('/', authMiddleware.authMiddleware, imageController.getAllImage)


module.exports = router