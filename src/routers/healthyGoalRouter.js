// import controllers review, products
const healthyGoalController = require('../controllers/healthyGoalController.js')

const authMiddleware = require("../middlerwares/authMiddlerware.js")
// router
const router = require('express').Router()


// use routers
router.post('/', authMiddleware.authMiddleware, healthyGoalController.addHealthyGoal)
router.get('/', authMiddleware.authMiddleware, healthyGoalController.getAllHealthyGoal)
router.delete('/:healthyGoalId', authMiddleware.authMiddleware, healthyGoalController.deleteHealthyGoal)
router.put('/:healthyGoalId', authMiddleware.authMiddleware, healthyGoalController.updateHealthyGoal)
router.get('/:healthyGoalId', authMiddleware.authMiddleware, healthyGoalController.getOneHealthyGoal)


module.exports = router