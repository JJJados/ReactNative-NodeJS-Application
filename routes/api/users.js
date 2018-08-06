const mongoose = require('mongoose');
const router = require('express').Router();
const passport = require('passport');
const User = mongoose.model('User');
const auth = require('../auth');
const bodyParser = require('body-parser');

router.get('/user', auth.required, function(req, res, next){

  User.findById(req.payload.id).then(function(user){

    if(!user){ return res.sendStatus(401); }

    return res.json({user: user.toAuthJSON()});

  }).catch(next);

});

router.put('/user', auth.required, function(req, res, next){

  User.findById(req.payload.id).then(function(user){

    if(!user){ return res.sendStatus(401); }

    // only update fields that were actually passed...
    if(typeof req.body.user.firstName !== 'undefined'){
      user.firstName = req.body.user.firstName;
    }
    if(typeof req.body.user.lastName !== 'undefined'){
      user.lastName = req.body.user.lastName;
    }
    if(typeof req.body.user.email !== 'undefined'){
      user.email = req.body.user.email;
    }
    if(typeof req.body.user.password !== 'undefined'){
      user.setPassword(req.body.user.password);
    }

    return user.save().then(function(){
      return res.json({user: user.toAuthJSON()});
    });

  }).catch(next);

});

router.post('/users/login', function(req, res, next){

  if(!req.body.email){
    return res.status(422).json({errors: {email: "can't be blank"}});
  }

  if(!req.body.password){
    return res.status(422).json({errors: {password: "can't be blank"}});
  }

  console.log(req.user);

  passport.authenticate('local', {session: false}, function(err, user, info){
    if(err){ return next(err); }

    console.log(req.body);
    if(user){
      user.token = user.generateJWT();
      console.log(user._id);
      return res.json({user: user.toAuthJSON()});
    } else {
      console.log('here');    
      return res.status(422).json(info);
    }

  })(req, res, next);

});

router.post('/users', function(req, res, next){

  console.log(JSON.stringify(req.body));

  const user = new User();

  console.log(JSON.stringify(req.body.password));

  user.firstname = req.body.firstname;
  user.lastname = req.body.lastname;
  user.email = req.body.email;
  user.setPassword(req.body.password);

  user.save().then(function(){
    return res.json({user: user.toAuthJSON()});
  }).catch(next);

  console.log(JSON.stringify(user.token));

});

module.exports = router;