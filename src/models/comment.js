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
            userId: {
            type: DataTypes.INTEGER
        },
            postId: {
            type: DataTypes.INTEGER
        },
    },
        {
            timestamps: false
        }
    )
    return Comment
}