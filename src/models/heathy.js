const { Sequelize, Model, DataTypes } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const Healthy = sequelize.define("healthy", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            currentWeight:{
                type: DataTypes.FLOAT
            },
            time:{
                type: DataTypes.DATE
            }
        },{
            timestamps: false
        }

    )
    return Healthy
}