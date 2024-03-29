const db = require('../models');
const {Op} = require('sequelize');
const Yup = require('yup');
const Exercise = db.exercise;
const NutritionDiary = db.nutrition_diary;


// 1. create Dish
const addExercise = async (req, res) => {
  try {
    const nutritionDiaryId = req.params.nutritionDiaryId;
    console.log("nutritionDiaryId : " + nutritionDiaryId)
    const schema = Yup.object().shape({
      exerciseTime: Yup.string().required(),
      exercise_name: Yup.string().required(),
      exercise_description: Yup.string().max(255).required(),
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
    let {exerciseTime, exercise_name, exercise_description} = req.body;
    const checkExercise = await Exercise.findOne({
      where: {
        id: nutritionDiaryId,
        exerciseTime: exerciseTime,

      },
    });
    if (checkExercise) {
      return res.status(400).json({
        statusCode: 400,
        message: "Bad Request",
        error: 'Exercise already exists',
      });
    }
    const exercise = await Exercise.create({
      exerciseTime,
      exercise_name,
      exercise_description,
      nutritionDiaryId
    });
    return res.status(201).json({
      statusCode: 201,
      message: "Created",
      data: exercise,
    });
  } catch (e) {
    console.error('Error:', e);
    return res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error',
      error: e.errors
    });
  }
};
const getAllExerciseNutrition = async (req, res) => {
  try {
    const nutritionDiaryId = req.params.nutritionDiaryId;
    const exercises = await Exercise.findAll({
      where: {
        nutritionDiaryId: nutritionDiaryId,
      }
    });
    if (exercises.length === 0) {
      return res.status(404).json({
        statusCode: 404,
        message: "Not Found",
        error: "Exercise not found"
      });
    }
    return res.status(200).json({
      statusCode: 200,
      message: "OK",
      data: exercises
    });
  } catch (e) {
    console.error('Error:', e);
    return res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error',
      error: e.errors
    });
  }

}
const updateExercise = async (req, res) => {
  try {
    const exerciseId = req.params.exerciseId;
    const nutritionDiaryId = req.params.nutritionDiaryId;
    console.log("exerciseId : " + exerciseId)
    console.log("nutritionDiaryId : " + nutritionDiaryId)
    const [exercise] = await Exercise.update(req.body, {
      where: {
        id: exerciseId,
        nutritionDiaryId: nutritionDiaryId,
      }
    });
    if (exercise === 0) {
      return res.status(404).json({
        statusCode: 404,
        message: "Not Found",
        error: "Exercise not found"
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: "Updated successfully",
    });
  } catch (e) {
    console.error('Error:', e);
    return res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error',
      error: e.errors
    });
  }
};
const deleteExercise = async (req, res) => {
  try {
    const exerciseId = req.params.exerciseId;
    const nutritionDiaryId = req.params.nutritionDiaryId;
    const deletedRows = await Exercise.destroy({
      where: {
        id: exerciseId,
        nutritionDiaryId: nutritionDiaryId,
      }
    });
    if (deletedRows === 0) {
      return res.status(404).json({
        statusCode: 404,
        message: "Not Found",
        error: "Exercise not found"
      });
    }
    return res.status(200).json({
      statusCode: 200,
      message: "Deleted successfully",
    });
  } catch (e) {
    console.error('Error:', e);
    return res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error',
      error: e.errors
    });
  }
}
const getExerciseById = async (req, res) => {
  try {
    const exerciseId = req.params.exerciseId;
    const nutritionDiaryId = req.params.nutritionDiaryId;
    const exercise = await Exercise.findOne({
      where: {
        id: exerciseId,
        nutritionDiaryId: nutritionDiaryId,
      }
    });
    if (!exercise) {
      return res.status(404).json({
        statusCode: 404,
        message: "Not Found",
        error: "Exercise not found"
      });
    }
    return res.status(200).json({
      statusCode: 200,
      message: "OK",
      data: exercise
    });
  } catch (e) {
    console.error('Error:', e);
    return res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error',
      error: e.errors
    });
  }
}

module.exports = {
  addExercise,
  updateExercise,
  getAllExerciseNutrition,
  deleteExercise,
  getExerciseById
};

