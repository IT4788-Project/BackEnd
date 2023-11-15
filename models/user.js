const { Sequelize, Model, DataTypes } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models.nutrition_diary, { foreignKey: 'user_id' ,onUpdate: 'RESTRICT',onDelete: 'RESTRICT'})
            User.hasMany(models.healthy_index, { foreignKey: 'user_id' ,onUpdate: 'RESTRICT',onDelete: 'RESTRICT'})
            User.hasMany(models.healthy_goal, { foreignKey: 'user_id' ,onUpdate: 'RESTRICT',onDelete: 'RESTRICT'})
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