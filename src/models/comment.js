module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("comment", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        comment: {
            type: DataTypes.STRING
        },
        date: {
            type: DataTypes.DATE
        },
        user_id: {
            type: DataTypes.INTEGER
        },
        post_id: {
            type: DataTypes.INTEGER
        },
    },
        {
            timestamps: false
        }
    )
    return Comment
}