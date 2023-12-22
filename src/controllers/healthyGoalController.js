const db = require('../models');
const Yup = require('yup');
const {Op} = require('sequelize');
// create main Model
const  HealthyGoal    = db.healthyGoal;
const Lunch = db.lunch;
const Nutrition = db.nutrition_diary;
// 1. add personal information
const addHealthyGoal = async (req, res) => {
    try {
        const {targetName, currentWeight, targetWeight, sumCalories, timeStart, timeEnd,userId} = req.body;
        const schema = Yup.object().shape({
            targetName: Yup.string().required(),
            currentWeight: Yup.number().required(),
            targetWeight: Yup.number().required(),
            sumCalories: Yup.number().required(),
            timeStart: Yup.date().required(),
            timeEnd: Yup.date().required(),
            userId:Yup.number().required(),
        });
        try {
            await schema.validate(req.body);
        } catch (e) {
            return res.status(400).json({
                statusCode: 400,
                message:"Bad Request",
                error:e.errors
            });
        }
        const healthyGoal = await HealthyGoal.create({
            targetName,
            currentWeight,
            targetWeight,
            sumCalories,
            timeStart,
            timeEnd,
            userId
        });
        console.log("userId : "+userId)
        console.log("currentWeight : " +currentWeight)

        return res.status(201).json({
            statusCode: 200,
            message:"Created",
            data : healthyGoal,
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            statusCode:500,
            message: 'Internal Server Error',
            error: e.errors
        });
    }
};
const getAllHealthyGoal = async (req, res) => {
    try {
        const { userId } = req.params;
        const healthyGoal = await HealthyGoal.findAll({
            where: {
                userId: userId,
            }
        });
        if (healthyGoal.length === 0) {
            return res.status(404).json({
                statusCode: 404,
                message: "Not Found",
                error: 'Healthy Goal not found' });
        }
        res.status(200).json({
            statusCode: 200,
            message: 'OK',
            data: healthyGoal,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            statusCode : 500,
            message: 'Internal Server Error',
            error: e.errors
        });
    }
}
const getOneHealthyGoal = async (req, res) => {
    try {
        const{currentTime} = req.body;
        const schema = Yup.object().shape({
            currentTime: Yup.date().required(),
        });
        try {
            await schema.validate(req.body);
        } catch (e) {
            return res.status(400).json({
                statusCode: 400,
                message:"Bad Request",
                error:e.errors
            });
        }
        let  userId  = req.params.userId
        let  healthyGoalId  = req.params.healthyGoalId
        console.log("userId : "+req.params.userId)
        console.log("healthyGoalId : "+req.params.healthyGoalId)
        const healthyGoal = await HealthyGoal.findOne({
            where: {
                id: healthyGoalId,
                userId: userId,
            }
        });
        if (healthyGoal.length === 0) {
            return res.status(404).json({
                statusCode: 404,
                message: "Not Found",
                error: 'Healthy Goal not found' });
        }
        let sumCurrentCalo =await calculateTotalCalo(healthyGoal.timeStart, currentTime)
        res.status(200).json({
            statusCode: 200,
            message: 'OK',
            data: healthyGoal,sumCurrentCalo
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            statusCode : 500,
            message: 'Internal Server Error',
            error: e.errors
        });
    }

}


module.exports = {
    addHealthyGoal,
    getAllHealthyGoal,
    getOneHealthyGoal
}

async function calculateTotalCalo(startDate, endDate) {
    try {
        const nutritions = await Nutrition.findAll({
            where: {
                time: {
                    [Op.between]: [startDate, endDate]
                }
            },
            include: [{
                model: Lunch,
                attributes: ['sumCalories']
            }]
        });
        let sumCalo = 0;
        nutritions.forEach(nutrition => {
            if (nutrition.lunches && nutrition.lunches.length > 0) {
                nutrition.lunches.forEach(lunch => {
                    if (lunch.sumCalories) {
                        sumCalo += lunch.sumCalories;
                    }
                });
            }
        });
        console.log("sumCalo>>>>="+sumCalo);
        return sumCalo;
    } catch (error) {
        console.log("check>>>>="+error);
        throw error;
    }
}
