const dbConfig = require('../config/dbConfig.js')
const { Sequelize, DataTypes } = require('sequelize');



const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host:dbConfig.HOST,
        port:dbConfig.port,
        dialect:dbConfig.dialect,
        operatorsAliases:false,
        pool:{
            max:dbConfig.pool.max,
            min:dbConfig.pool.min,
            acquire:dbConfig.pool.acquire,
            idle:dbConfig.pool.idle
        }

    }
)
sequelize.authenticate()
    .then(()=> {
        console.log('Connection has been established successfully.')

    })
    .catch(err=>{
        console.error('Unable to connect to the database:', err)
    })

const db={}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.sequelize.sync({ force: false })
    .then(() => {
        console.log('yes re-sync done!');
    });
db.food = require('./food.js')(sequelize, DataTypes)
db.dish = require('./dish.js')(sequelize, DataTypes)
db.food_dish = require('./food_dish.js')(sequelize, DataTypes)
db.image = require('./image.js')(sequelize, DataTypes)
db.lunch = require('./lunch.js')(sequelize, DataTypes)
db.user = require('./user.js')(sequelize, DataTypes)
db.nutrition_diary = require('./nutrition_diary.js')(sequelize, DataTypes)
db.healthy_index = require('./healthy_index.js')(sequelize, DataTypes)
db.healthy_goal = require('./healthy_goal.js')(sequelize, DataTypes)
db.post = require('./post.js')(sequelize, DataTypes)
db.exercise = require('./exercise.js')(sequelize, DataTypes)

module.exports = db
