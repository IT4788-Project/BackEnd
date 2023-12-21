module.exports= (sequelize, DataTypes) => {
    const LikeDish = sequelize.define("likeDish", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            userId: {
                type: DataTypes.INTEGER
            },
            dishId: {
                type: DataTypes.INTEGER
            },
        },
        {
            timestamps: false
        }
    )
    return LikeDish
}