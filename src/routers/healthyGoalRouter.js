// import controllers review, products
const healthyGoalController = require('../controllers/healthyGoalController.js')

const authMiddleware = require("../middlerwares/authMiddlerware.js")
// router
const router = require('express').Router()


// use routers
router.post('/', authMiddleware.authMiddleware, healthyGoalController.addHealthyGoal)
// router.get('/:userId', healthyGoalController.getAllHealthyGoal)
router.get('/:healthyGoalId', authMiddleware.authMiddleware, healthyGoalController.getOneHealthyGoal)


module.exports = router