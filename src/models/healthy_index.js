const { Sequelize, Model, DataTypes } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const Healthy_index = sequelize.define("healthy_index", {
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
    },{
        timestamps: false
        }

    )
    return Healthy_index
}