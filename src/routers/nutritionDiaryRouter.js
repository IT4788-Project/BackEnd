// Purpose: nutritionDiary router
const nutritionDiaryController = require('../controllers/nutritionDiaryController.js')
const authMiddleware = require("../middlerwares/authMiddlerware.js")

// router
const router = require('express').Router()


// use routers
// thêm nhật kí dinh dưỡng cho ngừoi dùng lấy từ body :  time, từ params  : userId
// dau vao la ví dụ:   "time": "2021-05-05"
router.post('/', authMiddleware.authMiddleware, nutritionDiaryController.addNutritionDiary)
// lấy nhật kí dinh dưỡng của người dùng từ params : userId, từ body : time
router.get('/', authMiddleware.authMiddleware, nutritionDiaryController.fineOneNutritionDiary);
// lấy toàn bộ dữ liệu từ bảng nutrition diary


module.exports = router