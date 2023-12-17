
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const app = express()

// Port
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json())
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(cookieParser());

// Routers
const userRouter = require('./src/routers/userRouter.js');
const foodRouter = require('./src/routers/foodRouter.js')
const authRouter = require('./src/routers/authRouter.js');


// Routes
app.use('/api/users', userRouter);
app.use('/api/foods',foodRouter);
app.use('/api/auths',authRouter);



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
