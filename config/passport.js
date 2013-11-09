var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	bcrypt = require('bcrypt-nodejs');


//////////////////////////////////////////
/// LOCAL STRATEGY
//////////////////////////////////////////


//helper functions
function findById(id, fn) {
  User.findOne(id).done(function (err, user) {
    if (err) {
      return fn(null, null);
    } else {
      return fn(null, user);
    }
  });
}
function findByEmail(em, fn) {

	console.log("findByEmail ==> " + em);
  User.findOne({
    email: em
  }).done(function (err, user) {
    // Error handling
    if (err) {
      return fn(null, null);
      // The User was found successfully!
    } else {
      return fn(null, user);
    }
  });
}

// Passport session setup.
// To support persistent login sessions, Passport needs to be able to
// serialize users into and deserialize users out of the session. Typically,
// this will be as simple as storing the user ID when serializing, and finding
// the user by ID when deserializing.
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});


passport.use(new LocalStrategy(
  function (email, password, done) {

      findByEmail(email, function (err, user) {
        if (err) // Error occured
          return done(null, err);
        if (!user) // The user doesn't exist
          return done(null, false, {  message: 'Unknown user ' + email  });
      	// The user exists, we compare passwords
        bcrypt.compare(password, user.password, function (err, res) {
          if (!res)
            return done(null, false, { message: 'Invalid Password' });
          return done(null, user, { message: 'Logged In Successfully' });
        });
      });
  }
));



////////////////////////////////////
/// SETUP PASSPORT 
////////////////////////////////////


module.exports = {
  express: {
    customMiddleware: function(app){
      console.log('Express midleware for passport');
      app.use(passport.initialize());
      app.use(passport.session());
    }
  }
};