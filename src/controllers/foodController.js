const db = require('../models')

// create main Model
const Food = db.food
// main work

// 1. create Food

const addFood = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).send('Bad Request: Missing request body');
        }

        const info = {
            name: req.body.name,
            calories: req.body.calories,
            glucozo: req.body.glucozo,
            lipit: req.body.lipit,
            protein: req.body.protein,
            vitamin: req.body.vitamin,
            unit: req.body.unit,
        }
        console.log('info')

        console.log(info)

        const food = await Food.create(info)
        res.status(201).send(food)
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}




// 2. get all food

const getAllfood = async (req, res) => {

    let foods = await Food.findAll({})
    res.status(200).send(foods)

}

// 3. get single food

const getOneFood = async (req, res) => {

    let id = req.params.id
    let food = await Food.findOne({ where: { id: id }})
    res.status(200).send(food)

}

// 4. update food

const updateFood = async (req, res) => {

    let id = req.params.id

    const food = await Food.update(req.body, { where: { id: id }})

    res.status(200).send(food)


}

// 5. delete dish by id

const deleteFood = async (req, res) => {

    let id = req.params.id

    await Food.destroy({ where: { id: id }} )

    res.status(200).send('Food is deleted !')

}




module.exports = {
    addFood,
    getAllfood,
    getOneFood,
    updateFood,
    deleteFood,

}