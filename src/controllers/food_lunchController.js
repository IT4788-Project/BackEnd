const {sequelize, DataTypes} = require('sequelize');
const db = require('../models');
const yup = require('yup');

const Food_lunch = db.food_lunch;
const Lunch = db.lunch;
const Food = db.food;

// {
//     "foods": [
//     { "id": 2, "quantity": 200, "unit": "gam" },
//     { "id": 3, "quantity": 300, "unit": "gam" }
// ]
// }
const addFood_lunch = async (req, res) => {
  const {foods} = req.body;
  const {lunchId} = req.params;
  // Validate the payload using yup
  const isValidPayload = await validatePayload({foods});
  if (!isValidPayload) {
    return res.status(400).json({
      statusCode: 400,
      message: "Bad Request: Invalid request body",
    });
  }

  try {
    const sumCalories = foods.reduce((sum, food) => sum + food.quantity, 0);
    let lunch = await Lunch.findByPk(lunchId);

    if (!lunch) {
      return res.status(404).json({
        statusCode: 404,
        message: "Not Found: Lunch not found",
      });
    }

    await lunch.update({sumCalories});

    await Promise.all(
      foods.map(async food => {
        await Food_lunch.create({
          lunchId: lunch.id,
          foodId: food.id,
          quantity: food.quantity,
          unit: food.unit,
        });
      })
    );

    res.status(201).json({
      statusCode: 201,
      message: "Meal added successfully",
      data: {lunch, foods},
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const updateFood_lunch = async (req, res) => {
  const {foods} = req.body;
  const {lunchId} = req.params;

  if (!Array.isArray(foods) || foods.length === 0) {
    return res.status(400).json({
      statusCode: 400,
      message: "Bad Request: Invalid request body",
    });
  }
  try {
    const sumCalories = foods.reduce((sum, food) => sum + food.quantity, 0);
    let lunch = await Lunch.findByPk(lunchId);

    if (!lunch) {
      return res.status(404).json({
        statusCode: 404,
        message: "Not Found: Lunch not found",
      });
    }

    await lunch.update({sumCalories});

    // Assuming you have a model Food_lunch with appropriate associations
    // This assumes that each food has a unique ID
    await Food_lunch.destroy({where: {lunchId: lunch.id}});

    await Promise.all(
      foods.map(async food => {
        await Food_lunch.create({
          lunchId: lunch.id,
          foodId: food.id,
          quantity: food.quantity,
          unit: food.unit,
        });
      })
    );

    res.status(200).json({
      statusCode: 200,
      message: "Meal updated successfully",
      data: {lunch, foods},
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


module.exports = {
  addFood_lunch,
  updateFood_lunch
};
const foodSchema = yup.object().shape({
  id: yup.number().required(),
  quantity: yup.number().required(),
  unit: yup.string().required(),
});

const payloadSchema = yup.object().shape({
  foods: yup.array().of(foodSchema).required(),
});

const validatePayload = async (payload) => {
  try {
    await payloadSchema.validate(payload);
    return true; // Validation passed
  } catch (error) {
    console.error('Validation error:', error.errors);
    return false; // Validation failed
  }
};
