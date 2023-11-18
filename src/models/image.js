const { Sequelize, Model, DataTypes } = require('sequelize');
module.exports = (sequelize, DataTypes) => {

    const Image = sequelize.define("image",{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        image_name: {
            type: DataTypes.STRING
        },
        image_path: {
            type: DataTypes.STRING
        },

    },{
        timestamps:false
    })
    return Image
}