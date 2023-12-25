// import controllers review, products
const foodController = require('../controllers/foodController.js')


// router
const router = require('express').Router()

router.post('/', foodController.createFood)

// use routers
router.get('/', foodController.getAllfood)
router.get('/:id', foodController.getOneFood)
module.exports = router