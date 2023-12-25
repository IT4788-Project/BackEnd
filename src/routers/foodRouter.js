// import controllers review, products
const foodController = require('../controllers/foodController.js')

const authMiddleware = require("../middlerwares/authMiddlerware.js")
// router
const router = require('express').Router()

router.post('/', authMiddleware.authMiddleware, foodController.createFood)

// use routers
router.get('/', authMiddleware.authMiddleware, foodController.getAllfood)
router.get('/:id', authMiddleware.authMiddleware, foodController.getOneFood)
module.exports = router