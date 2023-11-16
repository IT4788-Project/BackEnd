const { Sequelize, Model, DataTypes } = require('sequelize');
module.exports=(sequelize,DataTypes)=>{
    class Lunch extends Model{
        static associate(models){
            //1 lunch có nhiều nutriton_diary
            Lunch.hasMany(models.Nutrition_diary,{foreignKey:'lunch_id'})

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

    },{
        sequelize,
        modelName:'lunch',
    })
    return Lunch
}