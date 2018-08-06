const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(new LocalStrategy({

	usernameField: 'email',
	passwordField: 'password]'

}, function(email, password, done) {

	User.findOne({ email: email }).then(function(user) {
		console.log('duh');
		if(!user || !user.validPassword(password)) {
			return done(null, false, {errors: {'email or password': 'is invalid'}});
		}

		return done(null, user);

	});
}));