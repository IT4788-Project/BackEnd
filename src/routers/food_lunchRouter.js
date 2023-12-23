
const authMiddleware = require("../middlerwares/authMiddlerware.js")
const router = require('express').Router()
const food_lunchController = require('../controllers/food_lunchController.js')
// them thực thể liên kết giữa food và lunch
router.post('/:lunchId', food_lunchController.addFood_lunch)
// lay ra toan bộ thông tin của bữa ăn gôm cac mon ăn và số lượng
router.get('/:lunchId', food_lunchController.getAllFoodOfLunch)
// update food cho lunch dung cho trường hơp
router.put('/:lunchId', food_lunchController.updateFood_lunch)

module.exports = router