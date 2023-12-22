module.exports = (sequelize, DataTypes) => {
    const UserFollow = sequelize.define("userFollow", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING(100)

            }
        },
        {
            timestamps: false
        })
    return UserFollow
}