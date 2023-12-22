// Purpose: nutritionDiary router
const nutritionDiaryController = require('../controllers/nutritionDiaryController.js')
const authMiddleware = require("../middlerwares/authMiddlerware.js")

// router
const router = require('express').Router()


// use routers
router.post('/' ,nutritionDiaryController.addNutritionDiary)
router.get('/:userId', authMiddleware.authMiddleware,nutritionDiaryController.fineOneNutritionDiary);


module.exports = router