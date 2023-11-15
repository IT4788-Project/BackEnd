const { Sequelize, Model, DataTypes } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Food extends Model{
        static associate(models){
            Food.belongsToMany(models.dish,{through:'food_dish',foreignKey:'food_id'})
            Food.hasMany(models.image,{foreignKey:'image_id',onUpdate: 'RESTRICT',onDelete: 'RESTRICT'})
        }
    }
    Food.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        calories:{
            type:DataTypes.INTEGER
        },

        glucozo:{
            type:DataTypes.INTEGER
        },
        lipit:{
            type:DataTypes.INTEGER
        },
        protein:{
            type:DataTypes.INTEGER
        },
        vitamin:{
            type:DataTypes.INTEGER
        },
        unit:{
            type:DataTypes.STRING
        },
        }
        ,{
        sequelize,
        modelName: 'food',
        }
    )
    return Food

}