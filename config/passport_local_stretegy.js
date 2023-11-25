const User = require('../models/User');
const passport = require('passport');
const LocalStretegy = require("passport-local");
// authentication using passport
passport.use(new LocalStretegy({
        usernameField: 'email',
        passReqToCallback: true
    },
    async function(req, email, password, done) {
        try {
            // find user and establish identity
            let user = await User.findOne({ email: email });
            console.log(user);

            if (!user || user.password !== password) {
                req.flash('error', 'Invalid user/password');
                console.log("user not exist in db")
                return done(null, false);
            }

            return done(null, user);

        } catch (error) {
            req.flash('error', error);
            console.log(error, "something is wrong");
            return done(error);

        }

    }))





// seralizing the user to decide which key is to be kept in cookie

passport.serializeUser(function(user, done) {
    done(null, user.id);
})

// deserializing the user  from the key in the cookies
passport.deserializeUser(async function(id, done) {
    try {

        let user = await User.findById(id);
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    } catch (error) {
        console.log("Error to finding user in db during desrilalize");
        return done(error);

    }

})


// check user authenticated
passport.checkAuthentication = function(req, res, next) {
    // if user is authenticaed then pass request to the next function(conlrollers action)

    if (req.isAuthenticated()) {
        console.log("user is authenticated");
        return next();
    }
    return res.redirect('/user/login');
}

passport.setAuthenticatedUser = function(req, res, next) {
    if (req.isAuthenticated()) {
        // req.user contains the current signIn user from the session cookie and we are just sending
        // it into  locals for the view
        res.locals.user = req.user;

    }
    next();
}


module.exports = passport;