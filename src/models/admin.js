module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define("admin", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userName: {
            type: DataTypes.STRING(200),
        },
        passWord: {
            type: DataTypes.STRING(50),
        },
        email: {
            type: DataTypes.STRING(50),
        },
        fullName: {
            type: DataTypes.STRING(50),
        }
    }, {
        timestamps: true
    });

    return Admin;
};
