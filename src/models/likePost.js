module.exports= (sequelize, DataTypes) => {
    const LikePost = sequelize.define("like_post", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
            userId: {
            type: DataTypes.INTEGER
        },
            postId: {
            type: DataTypes.INTEGER
        },
    },
        {
            timestamps: false
        }
    )
    return LikePost
}