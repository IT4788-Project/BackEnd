const db = require('../models')
const Yup = require('yup');
const sequelize = require("sequelize");
// create main Model
const DishCategory = db.dishCategory
const Food = db.food
const Tag = db.tag


const getAllDishCategory = async (req, res) => {
  try {
    const dishCategories = await DishCategory.findAll({});
    if (dishCategories.length === 0) {
      return res.status(404).json({
        statusCode: 404,
        message: "Not Found: DishCategory not found",
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: "Created",
      data: dishCategories
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error',
      error: e.errors
    })
  }
}


module.exports = {
  getAllDishCategory
}