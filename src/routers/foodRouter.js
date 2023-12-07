// import controllers review, products
const foodController = require('../controllers/foodController.js')



// router
const router = require('express').Router()


// use routers
router.post('/' , foodController.addFood)

router.get('/', foodController.getAllfood)

router.get('/:id', foodController.getOneFood)

router.put('/:id', foodController.updateFood)

router.delete('/:id', foodController.deleteFood)

module.exports = router