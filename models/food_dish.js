const { Sequelize, Model, DataTypes } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Food_dish extends Model {
        static associate(models) {
            Food_dish.belongsTo(models.food, { foreignKey: 'food_id' })
            Food_dish.belongsTo(models.dish, { foreignKey: 'dish_id' })
        }
    }
    Food_dish.init({
        food_dish_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        food_id: {
            type: DataTypes.INTEGER
        },
        dish_id: {
            type: DataTypes.INTEGER
        },
        quantity: {
            type: DataTypes.INTEGER
        },
        unit: {
            type: DataTypes.STRING
        },

        },
        {
        sequelize,
        modelName: 'food_dish',
        })
    return Food_dish
}