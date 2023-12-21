const { Sequelize, Model, DataTypes } = require('sequelize');
module.exports=(sequelize,DataTypes)=>{
    const Food_lunch = sequelize.define("food_lunch",{
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
    return  Food_lunch
}


