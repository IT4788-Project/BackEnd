const db = require('../models')
const Yup = require('yup');
const sequelize = require("sequelize");
// create main Model
const Dish = db.dish
const Food = db.food
const Tag = db.tag
const Image = db.image
const FoodDish = db.food_dish
const DishCategory = db.dishCategory
// 1. create Dish


const searchDishByDishCategory = async (req, res) => {
  try {
    let dishCategoryId = req.params.dishCategoryId
    // Fetch data
    const dishCategories = await DishCategory.findOne({
      where: {
        id: dishCategoryId,
      },
      include: {

        model: Dish,
        attributes: ['id', 'name', 'dish_description'],
        include: [
          {
            model: Image,
            attributes: ['id', 'image_path'],
          },
          {
            model: Tag,
            attributes: ['id', 'name'],
            through: {
              attributes: [],
            },
          },
        ],
        through: {
          attributes: [],
        },
      },

    });
    if (!dishCategories) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Not Found',
      });
    }

    // Return response
    return res.status(200).json({
      statusCode: 200,
      message: 'OK',
      data: dishCategories,
    });
  } catch (e) {
    // Handle validation or database error
    return res.status(400).json({
      statusCode: 400,
      error: e?.errors || e?.message,
    });
  }
};

// Search dishes by tag
const searchDishByTag = async (req, res) => {
  try {
    let tagId = req.params.tagId
    const tags = await Tag.findOne({
      where: {
        id: tagId,
      },
      include: {
        model: Dish,
        attributes: ['id', 'name', 'dish_description'],
        include: [
          {
            model: Image,
            attributes: ['id', 'image_path'],
          },
          {
            model: Tag,
            attributes: ['id', 'name'],
            through: {
              attributes: [],
            },
          },
        ],
        through: {
          attributes: [],
        },
      },
    });
    if (!tags) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Not Found',
      });
    }
    // Return response
    return res.status(200).json({
      statusCode: 200,
      message: 'OK',
      data: tags,
    });
  } catch (e) {

    return res.status(500).json({
      statusCode: 500,
      error: e?.errors || e?.message,
    });
  }
};
const getOneDish = async (req, res) => {
  try {
    let dishId = req.params.dishId
    const dish = await Dish.findOne({
      where: {
        id: dishId,
      },
      include: [
        {
          model: Image,
          attributes: ['id', 'image_path'],
        },
        {
          model: Tag,
          attributes: ['id', 'name'],
          through: {
            attributes: [],
          },
        },
        {
          model: Food,
          attributes: ['id', 'name', 'calories', 'glucozo', 'lipit', 'protein', 'vitamin', 'unit'],
          through: {
            model: FoodDish,
            attributes: ['quantity', 'unit'],
          },
        }
      ],
    });
    if (!dish) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Not Found',
      });
    }
    // Return response
    return res.status(200).json({
      statusCode: 200,
      message: 'OK',
      data: dish,
    });

  } catch (e) {
    return res.status(500).json({
      statusCode: 500,
      error: e?.errors || e?.message,
    });
  }

}


const getRandomDish = async (req, res) => {
  try {
    // ramdom 10 thưc ăn bất kì
    const dishes = await Dish.findAll({
      order: sequelize.literal('RAND()'),
      limit: 10,
      include: [
        {
          model: Image,
          attributes: ['id', 'image_path'],
        },
        {
          model: Tag,
          attributes: ['id', 'name'],
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (dishes.length === 0) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Not Found',
      });
    }
    // Return response
    return res.status(200).json({
      statusCode: 200,
      message: 'OK',
      data: dishes,
    });

  } catch (e) {
    return res.status(500).json({
      statusCode: 500,
      error: e?.errors || e?.message,
    });
  }

}
module.exports = {
  searchDishByTag,
  searchDishByDishCategory,
  getOneDish,
  getRandomDish
};
