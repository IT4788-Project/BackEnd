const authMiddleware = require("../middlerwares/authMiddlerware.js")
const router = require('express').Router()
const exerciseController = require('../controllers/exerciseController.js')

// tạo exercise cho nutrition diary
router.post('/:nutritionDiaryId', authMiddleware.authMiddleware, exerciseController.addExercise)
// update exercise cho nutrition diary
router.put('/:nutritionDiaryId/:exerciseId', authMiddleware.authMiddleware, exerciseController.updateExercise);
// lấy toàn bộ dữ liệu từ bảng exercise cua nutrition
router.get('/:nutritionDiaryId', authMiddleware.authMiddleware, exerciseController.getAllExerciseNutrition)
// xóa dữ liệu từ bảng exercise
router.delete('/:nutritionDiaryId/:exerciseId', authMiddleware.authMiddleware, exerciseController.deleteExercise)
// lấy dữ liệu từ bảng exercise
router.get('/:nutritionDiaryId/:exerciseId', authMiddleware.authMiddleware, exerciseController.getExerciseById)


module.exports = router