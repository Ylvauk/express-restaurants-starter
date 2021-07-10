const mongoose = require('../db/connection');
// import the schema for our reviews:
const reviewSchema = require('./review');

const restaurantSchema = new mongoose.Schema(
	{
		// Your Restaurant schema code goes here
		name: {
			type: String,
			required: true,
		},
		cuisine: {
			type: String,
			required: true,
		},
		reviews: [reviewSchema],
	},
	{ timestamps: true }
);

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
