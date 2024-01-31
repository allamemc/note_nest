//User model for mongoose
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
	name: { type: String, unique: true, trim: true },
	password: { type: String, trim: true },
})

module.exports = mongoose.model('users', UserSchema)
