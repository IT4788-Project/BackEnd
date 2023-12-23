const db = require('../models');
const {Op} = require('sequelize');
const Yup = require('yup');
const User = db.user;
const ValidationError = require("../utils/apiError")

const signUp = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required().test(
                'is-gmail',
                'Email must be a Gmail address',
                (value) => {
                    if (value) {
                        return value.endsWith('@gmail.com');
                    }
                    return false;
                }
            ),
            password: Yup.string().required().min(8),
        });
        try {
            await schema.validate(req.body, {abortEarly: false});
        } catch (e) {
            console.error(e)
            return res.status(400).json({
                    statusCode: 400,
                    message: "Bad Request",
                    error: e.errors
                }
            );
        }
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [
                    {email: email},
                ],
            },
        });
        if (existingUser) {
            console.log("existingUser", existingUser.id);
            return res.status(400).json({
                statusCode: 400,
                message: "Bad Request",
                error: "User already exits"
            });
        }
        // create new user
        const user = await User.create({
            name,
            email,
            password
        });
        return res.status(201).json({
            statusCode: 201,
            message: "Created",
            data: user
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

const followUser = async (req, res) => {
    const [followedUser, currentUser] = await Promise.all([
        User.findByPk(req.params.id),
        User.findByPk(req.user.id)
    ]);

    if (!followedUser)
        return res.status(400).json({error: 'User Invalid'});

    if (currentUser.followings.includes(followedUser.id))
        return res.status(400).json({error: 'User has been followed'});

    await Promise.all([
        User.update({
            followings: [...currentUser.followings, followedUser.id]
        }, {
            where: {
                id: currentUser.id
            }
        }),
        User.update({
            followers: Array.from(new Set([...followedUser.followers, currentUser.id]))
        }, {
            where: {
                id: followedUser.id
            }
        })
    ])

    return res.status(200).json({
        statusCode: "ok"
    })
}

const unfollowUser = async (req, res) => {
    const [followedUser, currentUser] = await Promise.all([
        User.findByPk(req.params.id),
        User.findByPk(req.user.id)
    ]);

    if (!followedUser)
        return res.status(400).json({error: 'User Invalid'});

    if (!currentUser.followings.includes(followedUser.id))
        return res.status(200).json({
            statusCode: "ok"
        })

    await Promise.all([
        User.update({
            followings: [...currentUser.followings].filter(item => item !== followedUser.id)
        }, {
            where: {
                id: currentUser.id
            }
        }),
        User.update({
            followers: [...followedUser.followers].filter(item => item !== currentUser.id)
        }, {
            where: {
                id: followedUser.id
            }
        })
    ])

    return res.status(200).json({
        statusCode: "ok"
    })
}

const getFollows = async (req, res) => {
    const {followers, followings} = await User.findByPk(req.user.id);
    return res.status(200).json({
        followers, followings
    });
}

module.exports = {
    signUp,
    updateUser,
    getAllUser,
    followUser,
    unfollowUser,
    getFollows
};