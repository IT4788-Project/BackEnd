const { Sequelize, Model, DataTypes } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models.Dish, {
                foreignKey: 'user_id',
                as: 'dishes'
            })
            User.hasMany(models.Healthy_index, {
                foreignKey: 'user_id',
                as: 'healthy_indexes'
            })
            User.hasMany(models.Healthy_goal, {
                foreignKey: 'user_id',
                as: 'healthy_goals'
            })
            User.hasMany(models.Image, {
                foreignKey: 'user_id',
                as: 'images'
            })

        }
    }
    User.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_name: {
            type: DataTypes.STRING
        },
        user_email: {
            type: DataTypes.STRING
        },
        user_password: {
            type: DataTypes.STRING
        },
        user_phone: {
            type: DataTypes.STRING
        },
    },
        {
        sequelize,
        modelName: 'user',
    });
    return User;
}