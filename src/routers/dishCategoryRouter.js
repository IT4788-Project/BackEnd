// import controllers review, products
const dishCategoryRouter = require('../controllers/dishCategoryController.js')


// router
const router = require('express').Router()

router.get('/', dishCategoryRouter.getAllDishCategory)

module.exports = router