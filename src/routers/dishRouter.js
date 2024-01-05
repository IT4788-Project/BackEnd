// import controllers review, products
const dishController = require('../controllers/dishController.js')
const authMiddleware = require("../middlerwares/authMiddlerware.js")


// router
const router = require('express').Router()

router.get('/tag/:tagId', authMiddleware.authMiddleware, dishController.searchDishByTag)

router.get('/dishCategory/:dishCategoryId', authMiddleware.authMiddleware, dishController.searchDishByDishCategory)

router.get('/:dishId', authMiddleware.authMiddleware, dishController.getOneDish)

router.get('/', authMiddleware.authMiddleware, dishController.getRandomDish)


module.exports = router