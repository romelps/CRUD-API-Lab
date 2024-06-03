const Grocery = require('../models/grocery');
const express = require('express');
const router = express.Router();


//create
router.post('/', async (req, res) => {
    try {
        const createdGrocery = await Grocery.create(req.body);
        res.status(201).json(createdGrocery);
    }
    catch (err) {
        res.status(400).json(err);
    }
});

//index
router.get('/', async (req, res) => {
    try {
        const foundGroceries = await Grocery.find();
        res.status(200).json(foundGroceries);
    }
    catch (err) {
        res.status(500).json(err);
    }
});


//delete of course
router.delete('/:groceryId', async (req, res) => {
    try {
        const deletedGrocery = await Grocery.findByIdAndDelete(req.params.groceryId);
        res.status(200).json(deletedGrocery);
    } catch (err) {
        res.status(500).json(err);
    }

}
)

//update route
router.put('/:groceryId', async (req, res) => {

    try {
        const updatedGrocery = await Grocery.findByIdAndUpdate(req.params.groceryId, req.body);
        if (!updatedGrocery) {
            res.status(404);
            throw new Error('The grocery item was not found.');
        }

        res.status(200).json(updatedGrocery);
    }
    catch (err) {
        if (res.statusCode === 404) {
            res.json({error: err.message});
        } else {
            res.status(500).json(err);
        }
    }
});

//show
router.get('/:groceryId', async (req, res) => {
    try {
        const foundGrocery = await Grocery.findById(req.params.groceryId);
        res.status(200).json(foundGrocery);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;