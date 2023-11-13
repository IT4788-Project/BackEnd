module.exports=(sequelize,DataTypes)=>{
const Dish=sequelize.define("dish",{
        dish_id:{
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

    })
    return Dish

}