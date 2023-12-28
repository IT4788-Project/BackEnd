const dbConfig = require('../config/dbConfig.js')
const {Sequelize, DataTypes} = require('sequelize');

const food_tags_default = require('./master-data/food-tags.js');
const food_default = require('./master-data/food.js');
const dish_default = require('./master-data/dish.js');
const dish_food_default = require('./master-data/dish_foods.js');
const dish_category_default = require('./master-data/dishCategory.js');
const image_default = require('./master-data/image.js');

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: false,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  }
)
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')

  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })
const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.lunch = require('./lunch.js')(sequelize, DataTypes)
db.food = require('./food.js')(sequelize, DataTypes)
db.dish = require('./dish.js')(sequelize, DataTypes)
db.image = require('./image.js')(sequelize, DataTypes)
db.food_dish = require('./food_dish.js')(sequelize, DataTypes)
db.nutrition_diary = require('./nutrition_diary.js')(sequelize, DataTypes)
db.exercise = require('./exercise.js')(sequelize, DataTypes)
db.user = require('./user.js')(sequelize, DataTypes)
db.post = require('./post.js')(sequelize, DataTypes)
db.healthyGoal = require('./healthyGoal.js')(sequelize, DataTypes)
db.personalInfo = require('./personalInfo.js')(sequelize, DataTypes)
db.comment = require('./comment.js')(sequelize, DataTypes)
db.likePost = require('./likePost.js')(sequelize, DataTypes)
db.dishCategory = require('./dishCategory.js')(sequelize, DataTypes)
db.admin = require('./admin.js')(sequelize, DataTypes)
db.role = require('./roleAdmin.js')(sequelize, DataTypes)
db.food_lunch = require('./food_lunch.js')(sequelize, DataTypes)
db.foodCategory = require('./foodCategory.js')(sequelize, DataTypes)
db.likeDish = require('./likeDish.js')(sequelize, DataTypes)
db.reportPost = require('./reportPost.js')(sequelize, DataTypes)
db.health = require('./health')(sequelize, DataTypes)
db.userFollow = require('./userFollow.js')(sequelize, DataTypes)
db.tag = require('./tag.js')(sequelize, DataTypes)

db.sequelize.sync({force: process.env.SYNC_INSERT_DATA === 'true' || false})
  .then(async () => {
      console.log('yes re-sync done!');
      const insertData = process.env.SYNC_INSERT_DATA === 'true' || false;
      if (Boolean(insertData)) {
        console.log('yes insert master data done!');
        await db.tag.bulkCreate(food_tags_default);
        await db.dish.bulkCreate(dish_default);
        await Promise.all(food_default.map(async (food) => {
          const newFood = await db.food.create({
            name: food.name,
            calories: food.calories,
            glucozo: food.glucozo,
            lipit: food.lipit,
            protein: food.protein,
            vitamin: food.vitamin,
            unit: food.unit,
          });
          const tags = await db.tag.findAll({where: {id: food.tags}});
          tags.forEach(async tag => {
            await newFood.addTag(tag);
          })
        }))
        await Promise.all(dish_category_default.map(async (dishCategory) => {
          const newDish = await db.dishCategory.create({
            name: dishCategory.name,
          })
          const dishes = await db.dish.findAll({where: {id: dishCategory.dishes}});
          dishes.forEach(async dish => {
            await newDish.addDish(dish)
          });
        }))
        await db.food_dish.bulkCreate(dish_food_default)
          .catch(error => {
              console.error('Error syncing the database:', error);
            }
          )
        await db.image.bulkCreate(image_default)
          .catch(error => {
              console.error('Error syncing the database:', error);
            }
          )

      }
    }
  )

// db.sequelize.sync({alter: true})
//   .then(() => {
//     console.log('yes re-sync done!')
//   })

//food_tags


//admin
db.admin.belongsTo(db.role, {foreignKey: 'roleId', onDelete: 'cascade', onUpdate: 'cascade'});
//roleAdmin
db.role.hasMany(db.admin, {foreignKey: 'roleId', onDelete: 'cascade', onUpdate: 'cascade'});
//user

db.user.hasMany(db.post, {foreignKey: 'from_user_id', onUpdate: 'cascade', onDelete: 'cascade'});
db.user.hasMany(db.post, {foreignKey: 'with_user_id', onUpdate: 'cascade', onDelete: 'cascade'});
db.user.hasMany(db.nutrition_diary, {foreignKey: 'userId', onDelete: 'cascade', onUpdate: 'cascade'});
db.user.hasOne(db.personalInfo, {foreignKey: 'userId', onDelete: 'cascade', onUpdate: 'cascade'});
db.user.hasMany(db.healthyGoal, {foreignKey: 'userId', onDelete: 'cascade', onUpdate: 'cascade'});
db.user.hasMany(db.reportPost, {foreignKey: 'userId', onDelete: 'cascade', onUpdate: 'cascade'})
db.user.hasMany(db.comment, {foreignKey: 'userId', onDelete: 'cascade', onUpdate: 'cascade'})
db.user.hasMany(db.likePost, {foreignKey: 'userId', onDelete: 'cascade', onUpdate: 'cascade'});
db.user.hasMany(db.likeDish, {foreignKey: 'userId', onDelete: 'cascade', onUpdate: 'cascade'})
db.user.hasMany(db.image, {foreignKey: 'userId', onDelete: 'cascade', onUpdate: 'cascade'})
db.user.hasMany(db.health, {foreignKey: 'userId', onDelete: 'cascade', onUpdate: 'cascade'})
db.user.hasMany(db.userFollow, {foreignKey: 'userId', onDelete: 'cascade', onUpdate: 'cascade'})
db.userFollow.belongsTo(db.user, {foreignKey: 'userId', onDelete: 'cascade', onUpdate: 'cascade'});
//healthy
db.health.belongsTo(db.user, {foreignKey: 'userId', onDelete: 'cascade', onUpdate: 'cascade'});
//healthy_goal
db.healthyGoal.belongsTo(db.user, {foreignKey: 'userId', onDelete: 'cascade', onUpdate: 'cascade'});
//personalInfo
db.personalInfo.belongsTo(db.user, {foreignKey: 'userId', onDelete: 'cascade', onUpdate: 'cascade'});
//post


db.post.belongsTo(db.user, {foreignKey: 'author', onUpdate: 'cascade', onDelete: 'cascade'});
db.post.hasMany(db.reportPost, {foreignKey: 'postId', onDelete: 'cascade', onUpdate: 'cascade'})
db.post.hasMany(db.comment, {foreignKey: 'postId', onDelete: 'cascade', onUpdate: 'cascade'})
db.post.hasMany(db.likePost, {foreignKey: 'postId', onDelete: 'cascade', onUpdate: 'cascade'})
db.post.hasMany(db.image, {foreignKey: 'postId', onDelete: 'cascade', onUpdate: 'cascade'})
//food
db.food.belongsToMany(db.dish, {through: db.food_dish, onDelete: 'cascade', onUpdate: 'cascade'})
db.food.belongsToMany(db.lunch, {through: db.food_lunch, onDelete: 'cascade', onUpdate: 'cascade'})
db.food.belongsToMany(db.foodCategory, {through: 'food_category', onDelete: 'cascade', onUpdate: 'cascade'})
db.food.belongsToMany(db.tag, {through: 'foods_tags', onDelete: 'cascade', onUpdate: 'cascade'})

db.tag.belongsToMany(db.food, {through: 'foods_tags', onDelete: 'cascade', onUpdate: 'cascade'})

//
db.foodCategory.belongsToMany(db.food, {through: 'food_category', onDelete: 'cascade', onUpdate: 'cascade'})
//dish
db.dish.belongsToMany(db.dishCategory, {through: 'dish_category', onDelete: 'cascade', onUpdate: 'cascade'})
db.dish.belongsToMany(db.food, {through: db.food_dish, onDelete: 'cascade', onUpdate: 'cascade'})
db.dish.hasMany(db.image, {foreignKey: 'dishId', onDelete: 'cascade', onUpdate: 'cascade'});
db.dish.hasMany(db.likeDish, {foreignKey: 'dishId', onDelete: 'cascade', onUpdate: 'cascade'});
// like dish
db.likeDish.belongsTo(db.dish, {foreignKey: 'dishId', onDelete: 'cascade', onUpdate: 'cascade'})
db.likeDish.belongsTo(db.user, {foreignKey: 'userId', onDelete: 'cascade', onUpdate: 'cascade'})
//dishCategory
db.dishCategory.belongsToMany(db.dish, {through: 'dish_category', onDelete: 'cascade', onUpdate: 'cascade'})
//image
db.image.belongsTo(db.dish, {foreignKey: 'dishId', onDelete: 'cascade', onUpdate: 'cascade'})
db.image.belongsTo(db.user, {foreignKey: 'userId', onDelete: 'cascade', onUpdate: 'cascade'})
db.image.belongsTo(db.post, {foreignKey: 'postId', onDelete: 'cascade', onUpdate: 'cascade'})
//lunch

db.lunch.belongsToMany(db.food, {through: db.food_lunch, onDelete: 'cascade', onUpdate: 'cascade'})
db.lunch.belongsTo(db.nutrition_diary, {foreignKey: 'nutritionDiaryId', onDelete: 'cascade', onUpdate: 'cascade'})
//nutrition_diary
db.nutrition_diary.hasMany(db.exercise, {foreignKey: 'nutritionDiaryId', onDelete: 'cascade', onUpdate: 'cascade'})
db.nutrition_diary.hasMany(db.lunch, {foreignKey: 'nutritionDiaryId', onDelete: 'cascade', onUpdate: 'cascade'})

db.nutrition_diary.belongsTo(db.user, {foreignKey: 'userId', onDelete: 'cascade', onUpdate: 'cascade'})
//exercise
db.exercise.belongsTo(db.nutrition_diary, {foreignKey: 'nutritionDiaryId', onDelete: 'cascade', onUpdate: 'cascade'})
//comment
db.comment.belongsTo(db.post, {foreignKey: 'postId', onDelete: 'cascade', onUpdate: 'cascade'})
db.comment.belongsTo(db.user, {foreignKey: 'userId', onDelete: 'cascade', onUpdate: 'cascade'})
//likePost
db.likePost.belongsTo(db.post, {foreignKey: 'postId', onDelete: 'cascade', onUpdate: 'cascade'})
db.likePost.belongsTo(db.user, {foreignKey: 'userId', onDelete: 'cascade', onUpdate: 'cascade'})
//reportPost
db.reportPost.belongsTo(db.post, {foreignKey: 'postId', onDelete: 'cascade', onUpdate: 'cascade'})
db.reportPost.belongsTo(db.user, {foreignKey: 'userId', onDelete: 'cascade', onUpdate: 'cascade'})

module.exports = db