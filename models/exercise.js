const { Sequelize, Model, DataTypes } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Exercise extends Model {
        static associate(models) {

        }
    }
    Exercise.init({
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
    },
        {
        sequelize,
        modelName: 'exercise',

    })
    return Exercise
}