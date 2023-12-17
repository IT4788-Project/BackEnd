const db = require('../models');
const {Op} = require('sequelize');
const Yup = require('yup');
const {BadRequestError} = require('../utils/apiError');
const User = db.user;

const signUp = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(8),
        });
        try {
            await schema.validate(req.body);
        } catch (e) {
            return res.status(400).json({error: 'Invalid input', message: e.message});
        }

        // check username and gmail are exist
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [
                    {name: name},
                    {email: email},
                ],
            },
        });
        if (existingUser) {
            console.log("existingUser", existingUser.id);
            return res.status(401).json({
                success: false
                }
            );
        }
        // create new user
        const user = await User.create({
            name,
            email,
            password
        });

        return res.status(201).json({
            success:true,
            user
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({error: 'Internal Server Error'});
    }
};


const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const [updatedRows] = await User.update(req.body, {where: {id: id}});
        if (updatedRows === 0) {
            return res.status(404).json({error: 'User not found'});
        }
        const updatedUser = await User.findByPk(id);
        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({error: 'Internal Server Error'});
    }
};
const getAllUser = async (req, res) => {
    try {
        const users = await User.findAll({});
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
};
module.exports = {
    signUp,
    updateUser,
    getAllUser,
};
