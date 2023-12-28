const {Sequelize, Model, DataTypes} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Lunch = sequelize.define("lunch", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      timeLunch: {
        type: DataTypes.TIME
      },
      name: {
        type: DataTypes.STRING
      },
      sumCalories: {
        type: DataTypes.INTEGER

      }
    }, {
      timestamps: false
    }
  )
  return Lunch
}