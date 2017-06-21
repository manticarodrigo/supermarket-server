const express = require('express');
const router = express.Router();

// users routes
const users = require('../users');

module.exports = function(passport) {

	/* GET home page. */
  router.get('/', function(req, res ) {
      res.send('Bienvenidos a La Colonia!');
  });

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/success',
		failureRedirect: '/error',
		failureFlash : true  
	}));

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/signup'
	}));

  // route for facebook authentication and login
	// different scopes while logging in
	router.get('/login/facebook', 
		passport.authenticate('facebook', { scope : 'public_profile' }
	));

	// handle the callback after facebook has authenticated the user
	router.get('/login/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/success',
			failureRedirect : '/error'
		})
	);

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

  /* Handle passport error */
  router.get('/error', function(req, res){
    res.send('An error has occured.');
  });

  /* Handle passport success */
  router.get('/success', function(req, res){
    res.send('Success!');
  });

  /* User routes */
  router.route('/users')
    .get(users.getAllUsers)
    .put(users.saveUser);


  router.route('/users/:userId')
    .get(users.getUser)
    .put(users.updateUser)
    .delete(users.deleteUser);

	return router;
};