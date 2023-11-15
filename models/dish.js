const { Sequelize, Model, DataTypes } = require('sequelize');
module.exports=(sequelize,DataTypes)=>{
    class Dish extends Model{
        static associate(models){
            Dish.belongsToMany(models.lunch,{through:'dish_lunch',foreignKey:'dish_id'})
            Dish.belongsToMany(models.food,{through:'food_dish',foreignKey:'dish_id'})
            Dish.hasMany(models.image,{foreignKey:'image_id',onUpdate: 'RESTRICT',onDelete: 'RESTRICT'})

        }
    }
    Dish.init({
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        dish_name:{
            type:DataTypes.STRING
        },
        dish_description:{
            type:DataTypes.TEXT
        },
        image_id:{
            type:DataTypes.INTEGER
        }


    },{
        sequelize,
        modelName:'dish',
    })
    return Dish

}