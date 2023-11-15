const { Sequelize, Model, DataTypes } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Healthy_index extends Model {
        static associate(models) {
            Healthy_index.belongsTo(models.user, { foreignKey: 'user_id' })

        }
    }
    Healthy_index.init({
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
        date: {
            type: DataTypes.DATE
        },
        bmi: {
            type: DataTypes.INTEGER
        },
        bmr: {
            type: DataTypes.INTEGER
        },
        user_id: {
            type: DataTypes.INTEGER
        },

    },

        {
        sequelize,
        modelName: 'healthy_index',

    })
    return Healthy_index
}