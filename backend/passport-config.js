const LocalStrategy = require('passport-local').Strategy;

function initialize(passport) {
    const authenticateUser = (email, password, done) => {

    }
    passport.use(LocalStrategy({usernameField: "name"}), authenticateUser)
    passport.serializeUser((user, done) => {})
    passport.deserializeUser((id, done) => {})
}