const User = require('../models/User');



// rendering home page
module.exports.homepage = function(req, res) {
        if (req.isAuthenticated()) {
            return res.render('home');

        }
        return res.redirect('/login');
    }
    // Rendering signup  page
module.exports.signupPage = function(req, res) {
    // if (req.isAuthenticated()) {
    //     return res.redirect('/home');
    // }
    return res.render('signup');
}

// Rendering login page
module.exports.loginPage = function(req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/home');
    }
    return res.render('login');
}


// rendering reset page
module.exports.resetPage = function(req, res) {
    return res.render('resetPassword');
}

// signup functionality
module.exports.signup = async(req, res) => {
    try {
        const { name, email, password, confirm_Password } = req.body;
        // check password and confirm password id match or not

        if (password !== confirm_Password) {
            req.flash('error', 'password and confirm password does not match');
            // console.log('password and confirm password does not match');
            return res.redirect('/');
        }
        // check if user is exist already in database  
        const existUser = await User.findOne({ email: email });



        if (existUser) {
            req.flash('error', 'user exist already');
            console.log('user exist already');
            return res.redirect('/')
        }

        const user = await User.create({
            name: name,
            email: email,
            password: password
        });
        req.flash('success', 'user signup successfully');
        return res.redirect('/login');



    } catch (error) {


        console.log('oops something went wrong',error);

    }
}


// signIn functionality

module.exports.signin = async(req, res) => {
    req.flash('success', 'user logged in successfully')
    console.log('user logged in successfully');
    return res.redirect('/home');
}



// password reser functionality
module.exports.reset = async(req, res) => {
    const { email, oldpassword, newpassword } = req.body

    const user = await User.findOne({ email: email });
    if (!user) {
        req.flash('error', 'user not exist');
        console.log('user not exist');
        return req.redirect('/reset');
    }
    // check password exist database or not
    if (user.password !== oldpassword) {

        req.flash('error', 'current password does not match');
        console.log('current password does not match');
        return res.redirect('/reset');

    }
    user.password = newpassword;
    user.save();

    console.log('password updated succesfully');
    req.flash('success', 'password updated successfully');
    res.redirect('/login');





}



// destroy session 
module.exports.destroy = function(req, res, next) {

    req.logout(function(error) {
        if (error) {
            return next(error);
        }
        req.flash('success', 'You have logged out');
        res.redirect('/');
    })
}