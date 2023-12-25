// import controllers review, products
const dishCategoryRouter = require('../controllers/dishCategoryController.js')
const authMiddleware = require("../middlerwares/authMiddlerware.js")


// router
const router = require('express').Router()

router.get('/', authMiddleware.authMiddleware, dishCategoryRouter.getAllDishCategory)

module.exports = router