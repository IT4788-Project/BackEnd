module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define("image", {
        image_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        image_name: {
            type: DataTypes.STRING
        },
        image_description: {
            type: DataTypes.TEXT
        },

    })
    return Image
}