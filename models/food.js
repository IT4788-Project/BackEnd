module.exports = (sequelize, DataTypes) => {

    const Food = sequelize.define("food", {
        food_id: {
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
            typr:DataTypes.INTEGER
        },
        vitamin:{
            type:DataTypes.INTEGER
        },
        unit:{
            type:DataTypes.STRING
        },

    })

    return Food

}