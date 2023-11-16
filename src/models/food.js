const { Sequelize, Model, DataTypes } = require('sequelize');
module.exports= (sequelize, DataTypes )=> {
    const Food = sequelize.define("food",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            food_name: {
                type: DataTypes.STRING
            },
            calories: {
                type: DataTypes.INTEGER
            },

            glucozo: {
                type: DataTypes.INTEGER
            },
            lipit: {
                type: DataTypes.INTEGER
            },
            protein: {
                type: DataTypes.INTEGER
            },
            vitamin: {
                type: DataTypes.INTEGER
            },
            unit: {
                type: DataTypes.STRING
            },

        },{
            timestamps:false
        }
        )
    return Food
}
