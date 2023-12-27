const db = require('../models');
const Yup = require('yup');
// create main Model
const PersonalInfo = db.personalInfo;
const Health = db.health;


const updateUserWeight = async (req, res) => {
  try {
    const userId = req.userId;
    console.log("userId : " + userId)
    const schema = Yup.object().shape({
      currentWeight: Yup.number().required(),
    });
    try {
      await schema.validate(req.body);
    } catch (e) {
      return res.status(400).json({
        statusCode: 400,
        message: "Bad Request",
        error: e.errors
      });
    }
    const {currentWeight} = req.body;
    await Health.create(
      {
        currentWeight,
        userId: userId
      }
    );

    const [updatedRowsInfo] = await PersonalInfo.update(currentWeight, {where: {userId: userId}});
    if (updatedRowsInfo === 0 && updateWeight === 0) {
      return res.status(404).json({
        statusCode: 404,
        message: "Not Found",
        error: 'Personal information not found'
      });
    }
    res.status(200).json({
      statusCode: 200,
      message: 'OK',
      notification: "Cập nhật thành công"
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error',
      error: e.errors
    });
  }
};
const getUserWeight = async (req, res) => {
  try {
    const userId = req.userId;
    console.log("userId : " + userId)
    const health = await Health.findAll({
      where: {
        userId: userId
      }
    });
    console.log(health);
    if (!health) {
      return res.status(404).json({
        statusCode: 404,
        message: "Not Found",
        error: "Personal information not found for the given user ID",
      });
    }
    res.status(200).json({
      statusCode: 200,
      message: "OK",
      health,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      statusCode: 500,
      error: e?.errors || e?.message
    });
  }
}

module.exports = {
  updateUserWeight,
  getUserWeight

};
