const { Sequelize, Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("post", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        count_like: {
            type: DataTypes.INTEGER
        },
        count_comment: {
            type: DataTypes.INTEGER
        },
        post_text: {
            type: DataTypes.TEXT
        },
    },
        {
            timestamps: false
        })

    return Post
}