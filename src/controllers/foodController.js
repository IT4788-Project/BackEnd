const db = require('../models')

// create main Model
const Food = db.food

const getAllfood = async (req, res) => {
    try{
        let foods = await Food.findAll({})
        res.status(200).json({
            statusCode: 200,
            message: "OK",
            data: foods
        })
    }catch(e){
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
    let food = await Food.findOne({ where: { id: id }})
    res.status(200).send(food)
}



module.exports = {
    getAllfood,
    getOneFood,

}