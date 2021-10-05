// models/user.js
const mongoose = require('../db/connection');

const UserSchema = new mongoose.Schema({
	name: String,
	restaurants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
