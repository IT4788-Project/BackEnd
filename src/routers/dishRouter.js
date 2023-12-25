// import controllers review, products
const dishController = require('../controllers/dishController.js')


// router
const router = require('express').Router()

router.get('/', dishController.searchDishByTag)
router.get('/:dishCategoryId', dishController.searchDishByDishCategory)

module.exports = router