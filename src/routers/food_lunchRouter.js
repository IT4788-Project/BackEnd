const authMiddleware = require("../middlerwares/authMiddlerware.js")
const router = require('express').Router()
const food_lunchController = require('../controllers/food_lunchController.js')
// them thực thể liên kết giữa food và lunch
router.post('/:lunchId', authMiddleware.authMiddleware, food_lunchController.addFood_lunch)
// update food cho lunch dung cho trường hơp
router.put('/:lunchId', authMiddleware.authMiddleware, food_lunchController.updateFood_lunch)

module.exports = router