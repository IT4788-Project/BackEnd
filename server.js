const express = require('express')
const cors = require('cors')

const app = express()

const post =3000
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

const router = require('./routers')
app.use(router)

app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})
