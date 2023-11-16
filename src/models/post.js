const { Sequelize, Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        static associate(models) {
            Post.belongsTo(models.Healthy_goal, {
                foreignKey: 'health_goal_id',
                as: 'health_goal'
            })

        }
    }
    Post.init({
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
            type: DataTypes.STRING
        },
        post_image: {
            type: DataTypes.STRING
        },
        health_goal_id: {
            type: DataTypes.INTEGER
        }
        },
    {
        sequelize,
            modelName: 'post',
    });
    return Post
}