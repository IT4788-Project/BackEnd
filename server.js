
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
const personalInfoRouter  = require('./src/routers/personalInfoRouter.js');
const nutritionDiaryRouter = require('./src/routers/nutritionDiaryRouter.js');
const exerciseRouter = require('./src/routers/exerciseRouter.js');
const healthyGoalRouter = require('./src/routers/healthyGoalRouter.js');
const lunchRouter = require('./src/routers/lunchRouter.js');
const food_lunchRouter = require('./src/routers/food_lunchRouter.js');
const postRouter = require('./src/routers/postRouter.js');


// Routes
app.use('/api/users', userRouter);
app.use('/api/foods',foodRouter);
app.use('/api/auths',authRouter);
app.use('/api/personalInfos',personalInfoRouter);
app.use('/api/nutritionDiaries',nutritionDiaryRouter);
app.use('/api/exercises',exerciseRouter);
app.use('/api/healthyGoals',healthyGoalRouter);
app.use('/api/lunch',lunchRouter);
app.use('/api/food_lunch',food_lunchRouter);
app.use('/api/foods', foodRouter);
app.use('/api/posts', postRouter);
app.use('/api/auths', authRouter);






// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
