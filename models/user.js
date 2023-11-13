module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_name: {
            type: DataTypes.STRING
        },
        user_email: {
            type: DataTypes.STRING
        },
        user_password: {
            type: DataTypes.STRING
        },
    })
    return User
}