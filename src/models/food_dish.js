const { Sequelize, Model, DataTypes } = require('sequelize');
module.exports=(sequelize,DataTypes)=>{
    const Food_dish = sequelize.define("food_dish",{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        quantity: {
            type: DataTypes.INTEGER
        },
        unit: {
            type: DataTypes.STRING
        },

    },{
        timestamps:false
        }
    )
    return  Food_dish

}


