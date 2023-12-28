const db = require('../models')
const Yup = require("yup");

// create main Model
const Food = db.food
const Tag = db.tag

const CreateFoodSchema = () => {
  return Yup.object().shape({
    name: Yup.string().required(),
    calories: Yup.number().min(0).required(),
    glucozo: Yup.number().min(0).required(),
    lipit: Yup.number().min(0).required(),
    protein: Yup.number().min(0).required(),
    vitamin: Yup.number().min(0).required(),
    unit: Yup.string().required(),
    tags: Yup.array(
      Yup.number().required()
    ).nullable(),
  });
}

const getAllfood = async (req, res) => {
  try {
    let foods = await Food.findAll({})
    if (foods.length === 0) {
      return res.status(404).json({
        statusCode: 404,
        message: "Not Found",
        error: 'Food not found'
      })
    }
    res.status(200).json({
      statusCode: 200,
      message: "OK",
      data: foods
    })
  } catch (e) {
    console.error(e)
    res.status(500).json({
      statusCode: 500,
      message: "Internal Server Error",
      error: e.errors
    })
  }
}

const getOneFood = async (req, res) => {
  let id = req.params.id
  let food = await Food.findOne({where: {id: id}})
  res.status(200).send(food)
}

const createFood = async (req, res) => {
  try {
    await CreateFoodSchema().validate(req.body, {abortEarly: false});

    const food = await Food.create({
      name: req.body.name,
      calories: req.body.calories,
      glucozo: req.body.glucozo,
      lipit: req.body.lipit,
      protein: req.body.protein,
      vitamin: req.body.vitamin,
      unit: req.body.unit,
      tags: req.body.tags,
    })

    await food.addTags(req.body.tags)

    return res.status(201).json({
      statusCode: 201,
      message: "Created",
      data: "oke"
    });
  } catch (e) {
    return res.status(400).json({
      statusCode: 400,
      error: e?.errors || e?.message
    })
  }
}
const getOneFoodByTag = async (req, res) => {
  try {
    let tagId = req.params.tagId
    const tag = await Tag.findOne({
      where: {
        id: tagId,
      },
      include: [
        {
          model: Food,
          attributes: ['id', 'name', 'calories', 'glucozo', 'lipit', 'protein', 'vitamin', 'unit'],
          through: {
            attributes: [],
          },
        },
      ],
      through: {
        attributes: [],
      },
    });
    if (!tag) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Not Found',
      });
    }
    // Return response
    return res.status(200).json({
      statusCode: 200,
      message: 'OK',
      data: tag,
    });
  } catch (e) {
    return res.status(500).json({
      statusCode: 500,
      error: e?.errors || e?.message,
    });
  }
}

module.exports = {
  getAllfood,
  getOneFood,
  createFood,
  getOneFoodByTag
}