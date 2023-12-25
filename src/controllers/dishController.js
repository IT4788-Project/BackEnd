const db = require('../models')
const Yup = require('yup');
const sequelize = require("sequelize");
// create main Model
const Dish = db.dish
const Food = db.food
const Tag = db.tag
const Image = db.image
const DishCategory = db.dishCategory
// 1. create Dish

const SearchDishByTagSchema = () => {
  return Yup.object().shape({
    tags: Yup.number().required().nullable()
  });
}
const SearchDishByDishCategorySchema = () => {
  return Yup.object().shape({
    dishCategoryId: Yup.number().required().nullable()
  });
}
const searchDishByDishCategory = async (req, res) => {
  try {
    // Validate request parameters
    await SearchDishByDishCategorySchema().validate(req.params, {abortEarly: false});

    // Fetch data
    const dishCategories = await DishCategory.findAll({
      where: {
        id: req.params.dishCategoryId,
      },
      include: [
        {
          model: Dish,
          attributes: ['id', 'name', 'dish_description'],
          include: [
            {
              model: Image,
              attributes: ['id', 'image_path'],
            },
          ],
        },
      ],
    });

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
    // Validate request body
    await SearchDishByTagSchema().validate(req.body, {abortEarly: false});

    // Fetch data
    const foods = await Food.findAll({
      include: [
        {
          model: Tag,
          where: {
            id: req.body.tags,
          },
        },
      ],
    });
    const dishes = await Dish.findAll({
      include: [
        {
          model: Food,
          where: {
            id: foods.map(item => item.id),
          },
        },
      ],
    });

    // Return response
    return res.status(200).json({
      statusCode: 200,
      message: 'OK',
      data: dishes,
    });
  } catch (e) {
    // Handle validation or database error
    return res.status(400).json({
      statusCode: 400,
      error: e?.errors || e?.message,
    });
  }
};

module.exports = {
  searchDishByTag,
  searchDishByDishCategory,
};
