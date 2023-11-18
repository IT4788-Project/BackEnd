const express = require('express')
const cors = require('cors')


const app = express()
//port
const PORT =8080
// middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())


// routers
const food_router = require('./src/routers/foodRouter.js')
app.use('/api/foods', food_router)

//server
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})