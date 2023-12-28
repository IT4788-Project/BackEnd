const db = require('../models')
const Yup = require('yup');
const sequelize = require("sequelize");
const {Op} = require('sequelize');
// create main Model

const Tag = db.tag
const tagSchema = () => {
  return Yup.object().shape({
    tagName: Yup.string().required(),
  });
}
const findTagByNames = async (req, res) => {
  try {
    const {tagName} = req.body;

    try {
      await tagSchema().validate(req.body, {abortEarly: false});
    } catch (e) {
      return res.status(400).json({
        statusCode: 400,
        message: "Bad Request",
        error: e.errors,
      });
    }
    const tags = await Tag.findOne({
      where: {
        [Op.or]: [
          {name: tagName},
        ],
      },
    });

    if (!tags) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Not Found',
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'OK',
      data: tags,
    });

  } catch (e) {
    console.error(e);
    return res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error',
      error: e.errors,
    });
  }
}
const getAllTag = async (req, res) => {
  try {
    const tags = await Tag.findAll();
    if (tags === 0) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Not Found',
      });
    }
    return res.status(200).json({
      statusCode: 200,
      message: 'OK',
      data: tags,
    });

  } catch (e) {
    console.error(e);
    return res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error',
      error: e.errors,
    });
  }
}


module.exports = {
  findTagByNames,
  getAllTag
}