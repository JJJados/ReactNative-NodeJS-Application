const 	http = require('http'),
	    path = require('path'),
	    methods = require('methods'),
	    express = require('express'),
	    bodyParser = require('body-parser'),
	    session = require('express-session'),
	    cors = require('cors'),
	    passport = require('passport'),
	    errorhandler = require('errorhandler'),
	    mongoose = require('mongoose');

const isProduction = process.env.NODE_ENV === 'production';

// Creates the global app object
const app = express()

app.use(cors());

// Default express config
app.use(require('morgan')('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(require('method-override')());
app.use(express.static(__dirname + '/public'));

app.use(session({ 
	secret: 'spurbackend', 
	cookie: {maxAge: 60000 }, 
	resave: true, 
	saveUnitialized: true
}));

// Init passport authentication 
app.use(passport.initialize());
// persistent login sessions 
app.use(passport.session());

if (!isProduction) {
	app.use(errorhandler());
}

if (isProduction) {
	mongoose.connect(process.env.MONGODB_URI);
} else {
	mongoose.connect('mongodb://localhost:27017/d', { useNewUrlParser: true });
	mongoose.set('debug', true);
}

require('./models/user');
require('./config/passport');

// Initializes routes
app.use(require('./routes'));

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handlers

// Development error handler
// will print stacktrace
if (!isProduction) {
  app.use(function(err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({'errors': {
      message: err.message,
      error: err
    }});
  });
}

// Production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: {}
  }});
});

// finally, let's start our server...
const server = app.listen( process.env.PORT || 3000, function(){
  console.log('Listening on port ' + server.address().port);
});