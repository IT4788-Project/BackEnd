const db = require('../models');
const Yup = require('yup');
const {Op} = require('sequelize');

const Image = db.image;

const getAllImage = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("userId : " + userId)
    const image = await Image.findAll({
      where: {
        userId: userId
      }
    });
    return res.status(200).json({
      statusCode: 200,
      message: 'OK',
      data: image
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error',
      error: e.errors
    });
  }
}
module.exports = {
  getAllImage
}

