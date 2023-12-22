// Purpose: nutritionDiary router
const userWeightController = require('../controllers/userWeightController.js')
const authMiddleware = require("../middlerwares/authMiddlerware.js")

// router
const router = require('express').Router()


// use routers
router.put('/:userId' ,authMiddleware.authMiddleware, userWeightController.updateUserWeight)

module.exports = router