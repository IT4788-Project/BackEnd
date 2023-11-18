// import controllers review, products
const foodController = require('../controllers/foodController.js')



// router
const router = require('express').Router()


// use routers
router.post('/foods' , foodController.addFood)

router.get('/foods', foodController.getAllfood)

router.get('/foods/:id', foodController.getOneFood)

router.put('/foods/:id', foodController.updateFood)

router.delete('/foods/:id', foodController.deleteFood)

module.exports = router