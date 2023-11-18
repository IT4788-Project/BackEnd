module.exports= (sequelize, DataTypes) => {
    const LikePost = sequelize.define("like_post", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER
        },
        post_id: {
            type: DataTypes.INTEGER
        },
    },
        {
            timestamps: false
        }
    )
    return LikePost
}