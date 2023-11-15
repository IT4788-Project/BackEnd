const { Sequelize, Model, DataTypes } = require('sequelize');
module.exports=(sequelize,DataTypes)=>{
    class Lunch extends Model{
        static associate(models){
            Lunch.belongsToMany(models.dish,{through:'dish_lunch',foreignKey:'lunch_id'})
            Lunch.hasMany(models.image,{foreignKey:'image_id',onUpdate: 'RESTRICT',onDelete: 'RESTRICT'})
        }
    }
    Lunch.init({
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        lunch_name:{
            type:DataTypes.STRING
        },
        lunch_description:{
            type:DataTypes.TEXT
        },
        lunch_image_id:{
            type:DataTypes.INTEGER
        }

    },{
        sequelize,
        modelName:'lunch',
    })
    return Lunch
}