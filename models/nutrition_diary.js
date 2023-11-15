const { Sequelize, Model, DataTypes } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
   class Nutrition_diary extends Model {
       static associate(models) {
              Nutrition_diary.belongsTo(models.user, { foreignKey: 'user_id' })
       }
   }
    Nutrition_diary.init({
         id: {
              type: DataTypes.INTEGER,
              primaryKey: true,
              autoIncrement: true
         },
        user_id: {
                type: DataTypes.INTEGER
        },

         time: {
              type: DataTypes.TIME
         }

    },
    {
        sequelize,
        modelName: 'nutrition_diary',
    })

    return Nutrition_diary

}