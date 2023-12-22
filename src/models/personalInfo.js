const { Sequelize, Model, DataTypes } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const PersonalInfo = sequelize.define("personalInfo", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fullName: {
            type:DataTypes.STRING(100)
        },
        birthDay:{
            type: DataTypes.DATEONLY
        },
        height: {
            type: DataTypes.INTEGER
        },
            gender:{
                type:DataTypes.STRING(20)

            },

            nutritionalGoal:{
            type: DataTypes.STRING(255)

        },
            initialWeight: {
                type: DataTypes.FLOAT
            },

        currentWeight:{
            type: DataTypes.FLOAT
        }, targetWeight:{

        type: DataTypes.FLOAT
    },
        hip:{
            type: DataTypes.INTEGER
        },
            waist:{
                type: DataTypes.INTEGER
            }

    },{
        timestamps: false
        }

    )
    return PersonalInfo
}