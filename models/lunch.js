module.exports=(sequelize,DataTypes)=>{
    const Lunch=sequelize.define("lunch",{
        lunch_id:{
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

    })
    return Lunch
}