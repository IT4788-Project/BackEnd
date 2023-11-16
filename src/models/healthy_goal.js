const { Sequelize, Model, DataTypes } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Healthy_goal extends Model {
        static associate(models) {
            Healthy_goal.belongsTo(models.user, {
                foreignKey: 'user_id',
                as: 'user'
            })

            Healthy_goal.belongsTo(models.Exercise, {
                foreignKey: 'exercise_id',
                as: 'exercise'
            })

            Healthy_goal.belongsTo(models.Post, {
                foreignKey: 'post_id',
                as: 'post'
            })
            Healthy_goal.belongsTo(models.Image, {
                foreignKey: 'image_id',
                as: 'image'
            })


        }
    }
    Healthy_goal.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        height: {
            type: DataTypes.INTEGER
        },
        weight: {
            type: DataTypes.INTEGER
        },

    },
        {
        sequelize,
        modelName: 'healthy_goal',
        }
    )

    return Healthy_goal
}