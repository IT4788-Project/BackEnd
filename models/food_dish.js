module.exports = (sequelize, DataTypes) => {
    const  Food_dish= sequelize.define("food_dish",{
        food_dish_id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        food_id:{
            type:DataTypes.INTEGER
        },
        dish_id:{
            type:DataTypes.INTEGER
        },
        quantity:{
            type:DataTypes.INTEGER
        },
        unit:{
            type:DataTypes.STRING
        }
    })
}