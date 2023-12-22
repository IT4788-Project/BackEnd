
const db = require('../models')
const Yup = require('yup');
const Lunch = db.lunch

//addlunch
const addLunch =async (req, res) => {
    try {
        const schema = Yup.object().shape({
            lunch_name: Yup.string().required(),
            lunch_description: Yup.string().required(),
            sumCalories: Yup.number().required(),
            nutritionDiaryId: Yup.number().required(),

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
        let { lunch_name, lunch_description, sumCalories, nutritionDiaryId } = req.body;
        const lunch = await Lunch.create({
            lunch_name,
            lunch_description,
            sumCalories,
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

module.exports={
    addLunch
}