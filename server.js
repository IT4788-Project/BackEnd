const express = require('express');
const cors = require('cors');
require('dotenv').config();
require("express-async-errors");
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
const personalInfoRouter = require('./src/routers/personalInfoRouter.js');
const nutritionDiaryRouter = require('./src/routers/nutritionDiaryRouter.js');
const exerciseRouter = require('./src/routers/exerciseRouter.js');
const healthyGoalRouter = require('./src/routers/healthyGoalRouter.js');
const lunchRouter = require('./src/routers/lunchRouter.js');
const food_lunchRouter = require('./src/routers/food_lunchRouter.js');
const postRouter = require('./src/routers/postRouter.js');
const dishRouter = require('./src/routers/dishRouter.js');
const dishCategoryRouter = require('./src/routers/dishCategoryRouter.js');
const userWeightRouter = require('./src/routers/userWeightRouter.js');
const tagRouter = require('./src/routers/tagRouter.js');
const adminRouter = require('./src/routers/adminRouter.js');

// Routes
app.use('/api/users', userRouter);
// api/foods
app.use('/api/foods', foodRouter);
// api/auths
app.use('/api/auths', authRouter);
// api/personalInfos
app.use('/api/personalInfos', personalInfoRouter);
// api/nutritionDiaries
app.use('/api/nutritionDiaries', nutritionDiaryRouter);
// api/exercises
app.use('/api/exercises', exerciseRouter);
// api/healthyGoals
app.use('/api/healthyGoals', healthyGoalRouter);
// api/lunch
app.use('/api/lunch', lunchRouter);
// api/food_lunch
app.use('/api/food_lunch', food_lunchRouter);
// api/foods ko can vi da co o tren
app.use('/api/foods/', foodRouter);
// api/posts
app.use('/api/posts', postRouter);
// api/dishes
app.use('/api/dishes', dishRouter);
// api/dishCategories
app.use('/api/dishCategories', dishCategoryRouter);
// api/userWeights
app.use('/api/userWeights', userWeightRouter);
// api/tags
app.use('/api/tags', tagRouter);
// api/admin
app.use('/api/admin', adminRouter)


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
