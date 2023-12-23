// import controllers review, products
const lunchController   = require('../controllers/lunchController.js')


// router
const router = require('express').Router()


// use routers
// thêm dữ liệu vao bảng lunch trước khi thêm vao bảng food_lunch
// bước thứ nhất để thêm dinh dưỡng
router.post('/:nutritionDiaryId' ,  lunchController.addLunch  )

// thêm dữ liệu vào bảng food_lunch
// bước thứ hai để thêm dinh dưỡng
// lấy dữ liệu từ bảng lunch
router.get('/:nutritionDiaryId', lunchController.getAllLunch);



module.exports = router