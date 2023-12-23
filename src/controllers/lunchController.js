
const db = require('../models')
const Yup = require('yup');
const Lunch = db.lunch

//addlunch
const addLunch =async (req, res) => {
    try {
        let   nutritionDiaryId = req.params.nutritionDiaryId
        const schema = Yup.object().shape({
            lunch_name: Yup.string().required(),
            lunch_description: Yup.string().required(),

        });
        try {
            await  schema.validateSync(req.body, { abortEarly: false });
        } catch (e) {
            console.error(e)
            return res.status(400).json({
                statusCode: 400,
                message: "Bad Request",
                error: e.errors
            })
        }
        let { lunch_name, lunch_description  } = req.body;
        const lunch = await Lunch.create({
            lunch_name,
            lunch_description,
            nutritionDiaryId
        });
        return res.status(201).json({
            statusCode: 201,
            message: "Created",
            lunch
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
const getAllLunch = async (req, res) => {
    try {
        let nutritionDiaryId = req.params.nutritionDiaryId
        const lunchs = await Lunch.findAll({
            where: {
                nutritionDiaryId: nutritionDiaryId,
            },
        })
        res.status(200).json({
            statusCode: 200,
            message: "OK",
            data: lunchs
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
const getAllFood_lunch = async (req, res) => {
    try {
        const food_lunch = await food_lunch.findAll({
            where: {
                lunchId: req.params.lunchId,
            },
            include: [
                {
                    model: db.food,
                    as: 'food',
                    attributes: ['id', 'name', 'calories', 'unit'],
                },
                {
                    model: db.lunch,
                    as: 'lunch',
                    attributes: ['id', 'lunch_name', 'lunch_description', 'sumCalories', 'nutritionDiaryId'],
                },
            ],
        })
        res.status(200).json({
            statusCode: 200,
            message: "OK",
            data: food_lunch
        })
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}
module.exports={
    addLunch,
    getAllLunch,
    getAllFood_lunch
}