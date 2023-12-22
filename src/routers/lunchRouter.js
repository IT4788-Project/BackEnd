// import controllers review, products
const lunchController   = require('../controllers/lunchController.js')


// router
const router = require('express').Router()


// use routers
router.post('/' ,  lunchController.addLunch  )



module.exports = router