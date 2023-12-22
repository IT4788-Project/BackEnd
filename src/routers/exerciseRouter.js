
const authMiddleware = require("../middlerwares/authMiddlerware.js")
const router = require('express').Router()
const exerciseController = require('../controllers/exerciseController.js')

router.post('/',authMiddleware.authMiddleware, exerciseController.addExercise)
router.put('/:nutritionDiaryId/:exerciseId',authMiddleware.authMiddleware, exerciseController.updateExercise);
router.get('/:nutritionDiaryId', authMiddleware.authMiddleware,exerciseController.getAllExerciseNutrition)





module.exports = router