const { Sequelize, Model, DataTypes } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Image extends Model {
        static associate(models) {


        }
    }
    Image.init({
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
    },
        {
        sequelize,
        modelName: 'image',
    });

}