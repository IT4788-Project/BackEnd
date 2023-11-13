module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("post", {
        post_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        like: {
            type: DataTypes.INTEGER
        },
        love: {
            type: DataTypes.INTEGER
        },
        tym: {
            type: DataTypes.INTEGER
        },
        comment: {
            type: DataTypes.INTEGER
        },
        post_text: {
            type: DataTypes.STRING
        },
        post_image: {
            type: DataTypes.STRING
        },

    })
    return Post
}