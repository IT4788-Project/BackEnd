const db = require('../models');
const Yup = require('yup');
// create main Model
const PersonalInfo = db.personalInfo;
// 1. add personal information
const addPersonalInfo = async (req, res) => {
    try {
        const {fullName, birthDay, height, gender, nutritionalGoal, initialWeight, currentWeight, targetWeight, hip, waist,} = req.body;
        const schema = Yup.object().shape({
            fullName: Yup.string().required(),
            birthDay: Yup.date().required(),
            height: Yup.number().required(),
            gender: Yup.string().required(),
            nutritionalGoal: Yup.string().required(),
            initialWeight: Yup.number().required(),
            currentWeight: Yup.number().required(),
            targetWeight: Yup.number().required(),
            hip: Yup.number().required(),
            waist: Yup.number().required(),
            userId:Yup.number().required(),
        });
        try {
            await schema.validate(req.body);
        } catch (e) {
            return res.status(400).json({
                error: 'Invalid input',
                message: e.message
            });
        }

        const personalInfo = await PersonalInfo.create({
            fullName,
            birthDay,
            height,
            gender,
            nutritionalGoal,
            initialWeight,
            currentWeight,
            targetWeight,
            hip,
            waist,
        });
        return res.status(201).json({
            success: true,
            personalInfo,
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};

// 3. get single personal information
const getOnePersonalInfo = async (req, res) => {
    try {
        let id = req.params.id;
        const personalInfo = await PersonalInfo.findOne({ where: { id: id } });
        res.status(200).json({
            success: true,
            personalInfo,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
};
// 4. update personal information
const updatePersonalInfo = async (req, res) => {
    try {
        let id = req.params.id;
        const [updatedRows] = await PersonalInfo.update(req.body, { where: { id: id } });
        if (updatedRows === 0) {
            return res.status(404).json({ error: 'Personal information not found' });
        }
        res.status(200).json({
            success: true,
            message: 'Personal information updated successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
};

// 5. delete personal information by id
const deletePersonalInfo = async (req, res) => {
    let id = req.params.id;
    const deletedRows = await PersonalInfo.destroy({ where: { id: id } });
    if (deletedRows === 0) {
        return res.status(404).json({ error: 'Personal information not found' });
    }
    res.status(200).json({
        success: true,
        message: 'Personal information deleted successfully',
    });
};

module.exports = {
    addPersonalInfo,
    getAllPersonalInfo,
    getOnePersonalInfo,
    updatePersonalInfo,
    deletePersonalInfo,
};
