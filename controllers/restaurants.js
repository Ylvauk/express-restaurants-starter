const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');
const User = require('../models/user.js');

// INDEX
// GET /restaurants
router.get('/', (req, res, next) => {
	Restaurant.find()
		.then((restaurants) => res.json(restaurants))
		.catch(next);
});

// SHOW
// GET /restaurants/:id
router.get('/:id', (req, res, next) => {
	const id = req.params.id;
	Restaurant.findById(id)
		.populate('customers')
		.then((restaurant) => res.json(restaurant))
		.catch(next);
});

// CREATE
// POST /restaurants/
router.post('/', (req, res, next) => {
	const restaurantData = req.body;
	Restaurant.create(restaurantData)
		.then((restaurant) => res.status(201).json(restaurant))
		.catch(next);
});

// UPDATE
// PATCH /restaurants/:id
router.patch('/:id', (req, res, next) => {
	const id = req.params.id;
	const restaurantData = req.body;
	Restaurant.findOneAndUpdate({ _id: id }, restaurantData, { new: true })
		.then((restaurant) => res.json(restaurant))
		.catch(next);
});

// DESTROY
// DELETE /restaurants/:id
router.delete('/:id', (req, res, next) => {
	const id = req.params.id;
	Restaurant.findOneAndDelete({ _id: id })
		.then(() => res.sendStatus(204))
		.catch(next);
});

// add user to customers array
// PUT /restaurants/:restaurantID/users/:userID
router.put('/:id/users/:userId', (req, res, next) => {
	let updatedRestaurant;
	Restaurant.findByIdAndUpdate(
		req.params.id,
		{ $push: { customers: req.params.userId } },
		{ new: true }
	)
		.then((restaurant) => {
			updatedRestaurant = restaurant;
		})
		.then(() => {
			User.findByIdAndUpdate(
				req.params.userId,
				{ $push: { restaurants: req.params.id } },
				{ new: true }
			).then(() => res.json(updatedRestaurant));
		})
		.catch(next);
});

module.exports = router;
