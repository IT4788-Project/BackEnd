// import controllers review, products
const dishController = require('../controllers/dishController.js')
const authMiddleware = require("../middlerwares/authMiddlerware.js")


// router
const router = require('express').Router()

router.get('/', authMiddleware.authMiddleware, dishController.searchDishByTag)
router.get('/:dishCategoryId', authMiddleware.authMiddleware, dishController.searchDishByDishCategory)

module.exports = router