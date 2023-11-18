const db = require('../models')


// create main Model
const Dish = db.dish


// main work

// 1. create Dish

const addDish = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).send('Bad Request: Missing request body');
        }

        const info = {
            name: req.body.name,
            dish_description: req.body.dish_description,
        }
        console.log('info')
        console.log(info)

        const dish = await Dish.create(info)
        res.status(201).send(dish)
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}




// 2. get all dish

const getAllDish = async (req, res) => {

    const dishs = await Food.findAll({})
    res.status(200).send(dishs)

}

// 3. get single dish

const getOneDish = async (req, res) => {

    let id = req.params.id
    const dish = await Food.findOne({ where: { id: id }})
    res.status(200).send(dish)

}

// 4. update dish

const updateDish = async (req, res) => {

    let id = req.params.id

    const dish = await Dish.update(req.body, { where: { id: id }})

    res.status(200).send(dish)


}

// 5. delete dish by id

const deleteDish = async (req, res) => {

    let id = req.params.id

    await Dish.destroy({ where: { id: id }} )

    res.status(200).send('Dish is deleted !')

}




module.exports = {
    addDish,
    getAllDish,
    getOneDish,
    updateDish,
    deleteDish,

}