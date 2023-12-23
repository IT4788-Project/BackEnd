const db = require('../models');
const Yup = require('yup');
// create main Model
const PersonalInfo = db.personalInfo;
const Heathy = db.heathy;


const updateUserWeight = async (req, res) => {
    try {
        const { userId } = req.params;
        const schema = Yup.object().shape({
            currentWeight: Yup.number().required(),
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
        const { currentWeight } = req.body;
        const [updateWeight] = await Heathy.update({currentWeight, where: { userId: userId } });
        const [updatedRowsInfo] = await PersonalInfo.update(currentWeight, { where: { userId: userId } });
        if (updatedRowsInfo === 0 && updateWeight === 0){
            return res.status(404).json({
                statusCode: 404,
                message: "Not Found",
                error: 'Personal information not found' });
        }
        res.status(200).json({
            statusCode: 200,
            message: 'OK',
            notification : "Cập nhật thành công"
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            statusCode : 500,
            message: 'Internal Server Error',
            error: e.errors
        });
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
    updateUserWeight,
    followUser,
    unfollowUser,
    getFollows

};
