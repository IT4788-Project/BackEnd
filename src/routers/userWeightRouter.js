// Purpose: nutritionDiary router
const userWeightController = require('../controllers/userWeightController.js')
const authMiddleware = require("../middlerwares/authMiddlerware.js")

// router
const router = require('express').Router()


// use routers
router.put('/', authMiddleware.authMiddleware, userWeightController.updateUserWeight)
router.get('/', authMiddleware.authMiddleware, userWeightController.getUserWeight)

module.exports = router