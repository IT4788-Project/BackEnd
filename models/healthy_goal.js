module.exports = (sequelize, DataTypes) => {
    const Healthy_goal = sequelize.define("healthy_goal", {
        healthy_goal_id: {
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

    })
    return Healthy_goal
}