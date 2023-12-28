// import controllers review, products
const lunchController = require('../controllers/lunchController.js')
const authMiddleware = require("../middlerwares/authMiddlerware.js")

// router
const router = require('express').Router()


// use routers
// thêm dữ liệu vao bảng lunch trước khi thêm vao bảng food_lunch
// bước thứ nhất để thêm dinh dưỡng
router.post('/:nutritionDiaryId', authMiddleware.authMiddleware, lunchController.addLunch)

// thêm dữ liệu vào bảng food_lunch
// bước thứ hai để thêm dinh dưỡng
// lấy dữ liệu từ bảng lunch
router.get('/:nutritionDiaryId', authMiddleware.authMiddleware, lunchController.getAllLunch);

// xoa du lieu cua lunch
router.delete('/:nutritionDiaryId/:lunchId', authMiddleware.authMiddleware, lunchController.deleteLunch);
// update du lieu cua lunch
router.put('/:nutritionDiaryId/:lunchId', authMiddleware.authMiddleware, lunchController.updateLunch);
//lay du toan bo du lieu 1 lunch co ca food
router.get('/:nutritionDiaryId/:lunchId', authMiddleware.authMiddleware, lunchController.getOneFood_lunch);


module.exports = router