// Định nghĩa model Food
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define("tags",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
      },
    }, {
      timestamps: true
    }
  )
  return Tag
}
