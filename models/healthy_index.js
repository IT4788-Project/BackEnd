module.exports = (sequelize, DataTypes) => {
    const Healthy_index = sequelize.define("healthy_index", {
        healthy_index_id: {
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
        date: {
            type: DataTypes.DATE
        },
    })
    return Healthy_index
}