const { Sequelize, Model, DataTypes } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const Dish = sequelize.define("dish",{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        dish_name: {
            type: DataTypes.STRING
        },
        dish_description: {
            type: DataTypes.TEXT
        },
        image_id: {
            type: DataTypes.INTEGER
        }
        }, {
            timestamps: false // disable createdAt and updatedAt

    })

    return Dish
}