const {Sequelize, Model, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("post", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      countLike: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      countReport: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      countComment: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      content: {
        type: DataTypes.STRING(512)
      },
      isPublic: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
    },
    {
      timestamps: true
    })

  return Post
}