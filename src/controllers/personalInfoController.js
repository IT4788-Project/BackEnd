const db = require('../models');
const Yup = require('yup');
// create main Model
const PersonalInfo = db.personalInfo;
const Heathy = db.healthy;
// 1. add personal information
const addPersonalInfo = async (req, res) => {
  try {
    const {
      fullName,
      birthDay,
      height,
      gender,
      nutritionalGoal,
      initialWeight,
      currentWeight,
      targetWeight,
      hip,
      waist,
      userId
    } = req.body;
    const schema = Yup.object().shape({
      fullName: Yup.string().required(),
      birthDay: Yup.date().nullable(),
      height: Yup.number().nullable(),
      gender: Yup.string().required(),
      nutritionalGoal: Yup.string().nullable(),
      initialWeight: Yup.number().nullable(),
      currentWeight: Yup.number().nullable(),
      targetWeight: Yup.number().nullable(),
      hip: Yup.number().nullable(),
      waist: Yup.number().nullable(),
      userId: Yup.number().required(),
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
    const personalInfo = await PersonalInfo.create({
      fullName,
      birthDay,
      height,
      gender,
      nutritionalGoal,
      initialWeight,
      currentWeight,
      targetWeight,
      hip,
      waist,
      userId
    });
    console.log("userId : " + userId)
    console.log("currentWeight : " + currentWeight)

    await Heathy.create({
      currentWeight,
      userId
    })
    return res.status(201).json({
      statusCode: 201,
      message: "Created",
      personalInfo,
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error',
      error: e.errors
    });
  }
};

// 2. get single personal information
const getOnePersonalInfo = async (req, res) => {
  try {
    const {userId} = req.params;
    const personalInfo = await PersonalInfo.findOne({where: {userId: userId}});
    if (!personalInfo) {
      return res.status(404).json({
        statusCode: 404,
        message: "Not Found",
        error: "Personal information not found for the given user ID",
      });
    }
    res.status(200).json({
      statusCode: 200,
      message: "OK",
      personalInfo,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error',
      error: e.errors
    });
  }
};

// 3. update personal information
const updatePersonalInfo = async (req, res) => {
  try {
    const {userId} = req.params;
    const [updatedRows] = await PersonalInfo.update(req.body, {where: {userId: userId}});
    if (updatedRows === 0) {
      return res.status(404).json({
        statusCode: 404,
        message: "Not Found",
        error: 'Personal information not found'
      });
    }
    const [heathy] = await Heathy.update(req.body, {where: {userId: userId}});
    if (heathy === 0) {
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

// 4. delete personal information by userId
const deletePersonalInfo = async (req, res) => {
  try {
    const {userId} = req.params;
    const deletedRows = await PersonalInfo.destroy({where: {userId: userId}});
    if (deletedRows === 0) {
      return res.status(404).json({
        statusCode: 404,
        message: "Not Found",
        error: 'Personal information not found',
      });
    }
    res.status(200).json({
      statusCode: 200,
      message: "OK",
      notification: 'Xoá thông tin cá nhân thành công',
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


module.exports = {
  addPersonalInfo,
  getOnePersonalInfo,
  updatePersonalInfo,
  deletePersonalInfo,
};
