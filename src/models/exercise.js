const { Sequelize, Model, DataTypes } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const Exercise = sequelize.define("exercise", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        exercise_name: {
            type: DataTypes.STRING
        },
        exercise_description: {
            type: DataTypes.TEXT
        },
        calories_burned: {
            type: DataTypes.INTEGER
        },
    }, {
        timestamps: false // disable createdAt and updatedAt
    })
    return Exercise
}