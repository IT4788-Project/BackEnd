// import controllers review, products
const healthyGoalController = require('../controllers/healthyGoalController.js')


// router
const router = require('express').Router()


// use routers
router.post('/' , healthyGoalController.addHealthyGoal)
// router.get('/:userId', healthyGoalController.getAllHealthyGoal)
router.get('/:userId/:healthyGoalId', healthyGoalController.getOneHealthyGoal)


module.exports = router