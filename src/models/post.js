const { Sequelize, Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("post", {
        id: {
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
            type: DataTypes.TEXT
        },
    },

        {
            timestamps: false
        })

    return Post
}