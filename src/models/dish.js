const {Sequelize, Model, DataTypes} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Dish = sequelize.define("dish", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING
    },
    dish_description: {
      type: DataTypes.TEXT
    },
  }, {
    timestamps: false // disable createdAt and updatedAt
  })
  return Dish
}