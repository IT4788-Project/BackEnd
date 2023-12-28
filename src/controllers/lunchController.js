const db = require('../models')
const Yup = require('yup');
const Lunch = db.lunch
const Food_lunch = db.food_lunch
const Food = db.food

//addlunch
const addLunch = async (req, res) => {
  try {

    let nutritionDiaryId = req.params.nutritionDiaryId
    console.log("nutritionDiaryId : " + nutritionDiaryId)
    console.log("req.body : ")
    const schema = Yup.object().shape({
      timeLunch: Yup.string().required(),
      name: Yup.string().required(),

    });
    try {
      await schema.validateSync(req.body, {abortEarly: false});
    } catch (e) {
      console.error(e)
      return res.status(400).json({
        statusCode: 400,
        message: "Bad Request",
        error: e.errors
      })
    }
    let {timeLunch, name} = req.body;
    const lunch = await Lunch.create({
      timeLunch,
      name,
      nutritionDiaryId
    });
    return res.status(201).json({
      statusCode: 201,
      message: "Created",
      lunch
    })
  } catch (e) {
    console.error('Error:', e);
    return res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error',
      error: e.errors
    });
  }
}
//get all lunch

const getAllLunch = async (req, res) => {
  try {
    let nutritionDiaryId = req.params.nutritionDiaryId
    const lunchs = await Lunch.findAll({
      where: {
        nutritionDiaryId: nutritionDiaryId,
      },
    })
    if (lunchs.length === 0) {
      return res.status(404).json({
        statusCode: 404,
        message: "Not Found",
      })
    }
    res.status(200).json({
      statusCode: 200,
      message: "OK",
      data: lunchs
    })
  } catch (e) {
    console.error('Error:', e);
    return res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error',
      error: e.errors
    });
  }
}

//get all food_lunch
const getOneFood_lunch = async (req, res) => {
  try {
    const lunchId = req.params.lunchId;
    const food_lunch = await Lunch.findOne({
      where: {id: lunchId},
      include: [
        {
          model: Food,
          attributes: ['id', 'name', 'calories', 'unit'],
          through: {
            model: Food_lunch,
            attributes: ['quantity', 'unit'],
          },
        },
      ],
    });
    if (!food_lunch) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Lunch not found',
      });
    }
    res.status(200).json({
      statusCode: 200,
      message: "OK",
      data: food_lunch
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      statusCode: 500,
      message: "Internal Server Error",
      error: e.errors,
    });
  }


}
const deleteLunch = async (req, res) => {
  try {

    const lunchId = req.params.lunchId;
    const nutritionDiaryId = req.params.nutritionDiaryId;
    const lunch = await Lunch.findByPk(lunchId);
    if (!lunch) {
      return res.status(404).json({
        statusCode: 404,
        message: "Not Found",
        error: "Lunch not found"
      });
    }
    await lunch.destroy();
    return res.status(200).json({
      statusCode: 200,
      message: "Deleted successfully",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error',
      error: e.errors
    });
  }
}
const updateLunch = async (req, res) => {
  try {
    const lunchId = req.params.lunchId;
    const nutritionDiaryId = req.params.nutritionDiaryId;
    const lunch = await Lunch.findByPk(lunchId);
    if (!lunch) {
      return res.status(404).json({
        statusCode: 404,
        message: "Not Found",
        error: "Lunch not found"
      });
    }
    await lunch.update(req.body);
    return res.status(200).json({
      statusCode: 200,
      message: "Updated successfully",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error',
      error: e.errors
    });
  }
}

module.exports = {
  addLunch,
  getAllLunch,
  getOneFood_lunch,
  deleteLunch,
  updateLunch
}