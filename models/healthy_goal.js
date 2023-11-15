const { Sequelize, Model, DataTypes } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Healthy_goal extends Model {
        static associate(models) {
            Healthy_goal.belongsTo(models.user, { foreignKey: 'user_id' })
            Healthy_goal.hasOne(models.post, { foreignKey: 'health_goal_id' })
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
        user_id: {
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