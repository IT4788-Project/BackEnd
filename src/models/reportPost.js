module.exports= (sequelize, DataTypes) => {
    const ReportPost = sequelize.define("reportPost", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
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
    return ReportPost
}