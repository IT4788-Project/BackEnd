const {Sequelize, Model, DataTypes} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Health = sequelize.define("health", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      currentWeight: {
        type: DataTypes.FLOAT
      },
    }, {
      timestamps: true,
    }
  )
  return Health
}