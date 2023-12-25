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
    return res.status(200).json({
      statusCode: 200,
      message: "Created",
      data: dishCategories
    });
  } catch (e) {
    return res.status(400).json({
      statusCode: 400,
      error: e?.errors || e?.message
    })
  }
}


module.exports = {
  getAllDishCategory
}