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
        console.log('yes re-sync done!')
    })


db.lunch = require('./lunch.js')(sequelize, DataTypes)
db.food = require('./food.js')(sequelize, DataTypes)
db.dish = require('./dish.js')(sequelize, DataTypes)
db.image = require('./image.js')(sequelize, DataTypes)
db.food_dish = require('./food_dish.js')(sequelize, DataTypes)
db.nutrition_diary = require('./nutrition_diary.js')(sequelize, DataTypes)
db.exercise = require('./exercise.js')(sequelize, DataTypes)
db.user = require('./user.js')(sequelize, DataTypes)
db.post = require('./post.js')(sequelize, DataTypes)
db.healthy_goal = require('./healthyGoal.js')(sequelize, DataTypes)
db.healthy_index = require('./healthyIndex.js')(sequelize, DataTypes)
db.comment = require('./comment.js')(sequelize, DataTypes)
db.likePost= require('./likePost.js')(sequelize, DataTypes)
//user
db.user.hasMany(db.post, { foreignKey: 'from_user_id', as: 'fromUser' });
db.user.hasMany(db.post, { foreignKey: 'with_user_id', as: 'withUser' });
db.user.hasMany(db.nutrition_diary);
db.user.hasMany(db.healthy_index);
db.user.hasMany(db.healthy_goal);
db.user.hasMany(db.comment);
db.user.hasMany(db.likePost);
//healthy_goal
db.healthy_goal.belongsTo(db.user,{onDelete:'cascade',onUpdate:'cascade'});
db.healthy_goal.hasOne(db.post);
//healthy_index
db.healthy_index.belongsTo(db.user,{onDelete:'cascade',onUpdate:'cascade'});

//post
db.post.belongsTo(db.healthy_goal,{onDelete:'cascade',onUpdate:'cascade'});
db.post.hasMany(db.image)
db.post.hasMany(db.comment)
db.post.hasMany(db.likePost)
db.post.belongsTo(db.user, { foreignKey: 'from_user_id', as: 'fromUser',onUpdate:'cascade',onDelete:'cascade'});
db.post.belongsTo(db.user, { foreignKey: 'with_user_id', as: 'withUser',onUpdate:'cascade',onDelete:'cascade'});


//food
db.food.belongsToMany(db.dish,{through:db.food_dish,onDelete:'cascade',onUpdate:'cascade'})
db.food.hasMany(db.image);
//dish
db.dish.belongsToMany(db.food,{through:db.food_dish,onDelete:'cascade',onUpdate:'cascade'})
db.dish.belongsToMany(db.lunch,{through:'lunch_dish'})
db.dish.hasMany(db.image);
//image
db.image.belongsTo(db.dish,{onDelete:'cascade',onUpdate:'cascade'})
db.image.belongsTo(db.lunch,{onDelete:'cascade',onUpdate:'cascade'})
db.image.belongsTo(db.food,{onDelete:'cascade',onUpdate:'cascade'})
db.image.belongsTo(db.nutrition_diary,{onDelete:'cascade',onUpdate:'cascade'})
db.image.belongsTo(db.post,{onDelete:'cascade',onUpdate:'cascade'})
//lunch
db.lunch.hasMany(db.image);
db.lunch.belongsToMany(db.dish,{through:'lunch_dish',onDelete:'cascade',onUpdate:'cascade'})
db.lunch.belongsToMany(db.nutrition_diary,{through:'lunch_nutrition_diary',onDelete:'cascade',onUpdate:'cascade'})
//nutrition_diary
db.nutrition_diary.belongsToMany(db.exercise,{through:'exercise_nutrition_diary',onDelete:'cascade',onUpdate:'cascade'})
db.nutrition_diary.belongsToMany(db.lunch,{through:'lunch_nutrition_diary',onDelete:'cascade',onUpdate:'cascade'})
db.nutrition_diary.hasMany(db.image);
db.nutrition_diary.belongsTo(db.user,{onDelete:'cascade',onUpdate:'cascade'})
//exercise
db.exercise.belongsToMany(db.nutrition_diary,{through:'exercise_nutrition_diary',onDelete:'cascade',onUpdate:'cascade'})
//comment
db.comment.belongsTo(db.post,{onDelete:'cascade',onUpdate:'cascade'})
db.comment.belongsTo(db.user,{onDelete:'cascade',onUpdate:'cascade'})
//likePost
db.likePost.belongsTo(db.post,{onDelete:'cascade',onUpdate:'cascade'})
db.likePost.belongsTo(db.user,{onDelete:'cascade',onUpdate:'cascade'})
module.exports = db
