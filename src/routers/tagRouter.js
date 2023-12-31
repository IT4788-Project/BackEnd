const tagController = require('../controllers/tagController.js')
const authMiddleware = require("../middlerwares/authMiddlerware.js")

const router = require('express').Router()
// tao bai viet viet\
router.post('/tagname/', authMiddleware.authMiddleware, tagController.findTagByNames)
router.get('/', authMiddleware.authMiddleware, tagController.getAllTag)

module.exports = router