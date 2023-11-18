// Định nghĩa model Food
module.exports= (sequelize, DataTypes )=> {
    const Food = sequelize.define("food",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            //name la duy nhat
            name: {
                type: DataTypes.STRING,
                unique: true
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
