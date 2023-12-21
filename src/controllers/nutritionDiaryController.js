const db = require('../models')
const Yup = require('yup');
const NutritionDiary = db.nutrition_diary
// 1. create Dish
const addNutritionDiary = async (req, res) => {
    try{

        const schema = Yup.object().shape({
            time: Yup.date.required(),
            userId: Yup.number().required(),
        });
        try {
            await schema.validate(req.body, { abortEarly: false });
        } catch (e) {
            console.error(e)
            return res.status(400).json({
                    statusCode: 400,
                    message: "Bad Request",
                    error: e.errors
                })
        }
        let {time, userId} = req.body;
        const nutritionDiary = await NutritionDiary.create({
            time,
            userId
        });
        return res.status(201).json({
            statusCode: 201,
            message: "Created",
            data: nutritionDiary
        })

    }catch (e) {
        console.error('Error:', e);
        return res.status(500).json({
            statusCode:500,
            message: 'Internal Server Error',
            error: e.errors
        });
    }
}
    module.exports = {
        addNutritionDiary
    }