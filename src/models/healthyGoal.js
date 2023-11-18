const { Sequelize, Model, DataTypes } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const Healthy_goal = sequelize.define("healthy_goal", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        height: {
            type: DataTypes.INTEGER
        },
        weight: {
            type: DataTypes.INTEGER
        },
        date:{
            type:DataTypes.DATE
        }

    },
        {
            timestamps: false
        }
    )
    return Healthy_goal
}