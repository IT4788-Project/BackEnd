const { Sequelize, Model, DataTypes } = require('sequelize');
module.exports=(sequelize,DataTypes)=>{
    const Lunch=sequelize.define("lunch",{
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
        timestamps:false
        }
    )
    return Lunch
}