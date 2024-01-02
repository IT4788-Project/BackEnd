const {Sequelize, Model, DataTypes} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Nutrition_diary = sequelize.define("nutrition_diary", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    time: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

  }, {

    timestamps: false
  })

  return Nutrition_diary

}