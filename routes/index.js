const express = require('express');
const passport = require('passport');
const router = express.Router();

// import the controllers actions
const user_Controller = require('../controllers/userController');

// rendering the home page as a signup page
router.get('/home', user_Controller.homepage);

// rendering the signup page
router.get('/', user_Controller.signupPage);

// rendering login page 
router.get('/login', user_Controller.loginPage);

// rendering reset page
router.get('/reset', user_Controller.resetPage)

// log out route
router.get('/logout', user_Controller.destroy);

// create new user in data base
router.post('/signup', user_Controller.signup);

// update password in database
router.post('/reset', user_Controller.reset);

// google authentication route
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), user_Controller.signin);

// create new session for  user
router.post('/signin', passport.authenticate('local', { failureRedirect: '/login' }), user_Controller.signin);


module.exports = router;