const db = require('../models')
const Yup = require('yup');
const NutritionDiary = db.nutrition_diary
const {Op} = require('sequelize');

//addNutritionDiary nhan vao xác nhận
const addNutritionDiary = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("userId : " + userId)
    const schema = Yup.object().shape({
      time: Yup.date()
        .required('Time is required')
        .test('isValidDateFormat', 'Invalid date format. Use yy-mm-dd', function (value) {
          if (!value) {
            return false;
          }
          const regex = /^\d{2}-\d{2}-\d{2}$/;
          return regex.test(value.toISOString().slice(2, 10));
        }),
    });
    try {
      await schema.validate(req.body, {abortEarly: false});
    } catch (e) {
      console.error(e)
      return res.status(400).json({
        statusCode: 400,
        message: "Bad Request",
        error: e.errors
      })
    }
    const checkNutritionDiary = await NutritionDiary.findOne({
      where: {
        userId: userId,
        time: req.body.time,
      },
    });
    if (checkNutritionDiary) {
      return res.status(400).json({
        statusCode: 400,
        message: "Bad Request",
        error: 'Nutrition Diary already exists',
      });
    }
    let {time} = req.body;
    console.log("time =", time);
    console.log("userId =", userId);
    const nutritionDiary = await NutritionDiary.create({
      time,
      userId
    });
    return res.status(201).json({
      statusCode: 201,
      message: "Created",
      data: nutritionDiary
    })

  } catch (e) {
    console.error('Error:', e);
    return res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error',
      error: e.errors
    });
  }
}
const fineOneNutritionDiary = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("userId : " + userId)
    const schema = Yup.object().shape({
      time: Yup.date().required(),
    });
    try {
      await schema.validate(req.body);
    } catch (e) {
      console.error(e)
      return res.status(400).json({
        statusCode: 400,
        message: "Bad Request",
        error: e.errors
      })
    }
    const {time} = req.body;
    console.log("time =", time);
    console.log("userId =", userId);

    const nutritionDiary = await NutritionDiary.findOne({
      where: {
        userId: userId,
        time: time,
      },
    });
    console.log("nutritionDiary =", nutritionDiary);
    if (!nutritionDiary) {
      return res.status(404).json({
        statusCode: 404,
        message: "Not Found",
        error: 'Nutrition Diary not found',
      });
    }
    return res.status(200).json({
      statusCode: 200,
      message: "OK",
      data: nutritionDiary,
    });
  } catch (e) {
    console.error('Error:', e);
    return res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error',
      error: e.message,
    });
  }
};
const getAllNutritionDiary = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("userId : " + userId)
    const nutritionDiary = await NutritionDiary.findAll({
      where: {
        userId: userId,
      },
    });
    if (nutritionDiary.length === 0) {
      return res.status(404).json({
        statusCode: 404,
        message: "Not Found",
        error: 'Nutrition Diary not found',
      });
    }
    return res.status(200).json({
      statusCode: 200,
      message: "OK",
      data: nutritionDiary,
    });
  } catch (e) {
    console.error('Error:', e);
    return res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error',
      error: e.message,
    });
  }

}

module.exports = {
  addNutritionDiary,
  fineOneNutritionDiary,
  getAllNutritionDiary
}