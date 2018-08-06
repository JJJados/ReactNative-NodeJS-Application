const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secret = require('../config').secret;

// This outlines the schema for each user

const UserSchema = new mongoose.Schema({

	firstname: {
		type: String,
		required: [true, "cannot be left blank"],
		match: [/[a-zA-Z]/, "is invalid"],
		index: true
	},

	lastname: {
		type: String,
		required: [true, "cannot be left blank"],
		match: [/[a-zA-Z]/, "is invalid"],
		index: true
	},

	email: {
		type: String,
		unique: true,
		required: [true, "cannot be left blank"],
		match: [/\S+@\S+\.\S+/, "is invalid"],
		index: true
	},

	hash: {
		type: String
	},

	salt: {
		type: String
	}

}, {timestamps: true});


UserSchema.plugin(uniqueValidator, {message: 'is already taken'});

UserSchema.methods.setPassword = function(password) {

	// Generates new salt each time, thus removing reuse 
	// and becoming more secure
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function(password) {

	var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
	return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {

	const today = new Date();
	const exp = new Date(today);
	exp.setDate(today.getDate() + 60);

	return jwt.sign({
		id: this._id,
		firstname: this.firstName,
		lastname: this.lastName,
		exp: parseInt(exp.getTime() / 1000),
	}, secret);
};

UserSchema.methods.toAuthJSON = function() {
	return {
		firstname: this.firstName,
		lastname: this.lastName,
		email: this.email,
		token: this.generateJWT(),
	};
};

mongoose.model('User', UserSchema);
