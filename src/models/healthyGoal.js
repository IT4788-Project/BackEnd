const { Sequelize, Model, DataTypes } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const HealthyGoal = sequelize.define("healthyGoal", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        targetName: {
            type: DataTypes.STRING(255)
        },
            currentWeight: {
                type: DataTypes.FLOAT
            },
        targetWeight: {
            type: DataTypes.FLOAT
        },
        sumCalories:{
            type: DataTypes.INTEGER,
        },
        timeStart:{
            type:DataTypes.DATEONLY
        },
        timeEnd:{
            type:DataTypes.DATEONLY
        }
    },
        {
            timestamps: false
        }
    )
    return HealthyGoal
}