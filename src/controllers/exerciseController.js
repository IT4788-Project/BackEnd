const db = require('../models')
const db = require('../models');
const {Op} = require('sequelize');
const Yup = require('yup');
const Exercise = db.exercise;
const Exercise_nutrition = db.exercise_nutrition;


// 1. create Dish
const addExercise = async (req, res) => {
    try{
    if (!req.body) {
        return res.status(400).json({
            statusCode: 400,
            message: "Bad Request: Missing request body"
        });
    }
    const info = {
        time: req.body.time,
        exercise_name: req.body.exercise_name,
        exercise_description: req.body.exercise_description,
        nutritionDiaryId:req.body.nutritionDiaryId
    }
    console.log('info', info)
    const exercise = await Exercise.create(info)
    await Exercise_nutrition.create({
        exerciseId: exercise.id,
        nutritionId: req.body.nutritionId
    })
    return res.status(201).json({
        statusCode: 201,
        message: "Created",
        data: exercise
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
const updateExercise = async (req, res) => {
    try{
        if (!req.body) {
            return res.status(400).json({
                statusCode: 400,
                message: "Bad Request: Missing request body"
            });
        }
        let info1 = {
            exerciseTime: req.body.exerciseTime,
            exercise_name: req.body.exercise_name,
            exercise_description: req.body.exercise_description,
        }
        let info2={
                nutritionDiaryId: req.body.nutritionDiaryId
        }
        console.log('info', info1)
        const exercise = await Exercise.create(info1)

        await


        return res.status(201).json({
            statusCode: 201,
            message: "Created",
            data: exercise
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

module.require={
    addExercise
}