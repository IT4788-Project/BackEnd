module.exports = (sequelize, DataTypes) => {
    const Exercise = sequelize.define("exercise", {
        exercise_id: {
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
    })
    return Exercise
}