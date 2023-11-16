const { Sequelize, Model, DataTypes } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
   class Nutrition_diary extends Model {
       static associate(models) {
           //1 nutriton_diary có nhiều lunch
              Nutrition_diary.hasMany(models.Lunch, { foreignKey: 'nutrition_diary_id' })

       }
   }
    Nutrition_diary.init({
         id: {
              type: DataTypes.INTEGER,
              primaryKey: true,
              autoIncrement: true
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