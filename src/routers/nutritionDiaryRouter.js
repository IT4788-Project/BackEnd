// Purpose: nutritionDiary router
const nutritionDiaryController = require('../controllers/nutritionDiaryController.js')
const authMiddleware = require("../middlerwares/authMiddlerware.js")

// router
const router = require('express').Router()


// use routers
// thêm nhật kí dinh dưỡng cho ngừoi dùng lấy từ body :  time, từ params  : userId
router.post('/:userId' ,nutritionDiaryController.addNutritionDiary)
// lấy nhật kí dinh dưỡng của người dùng từ params : userId, từ body : time
router.get('/:userId', nutritionDiaryController.fineOneNutritionDiary);


module.exports = router