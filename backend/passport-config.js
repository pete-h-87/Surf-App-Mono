const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
// const { loggingInTheUser } = require("../frontend/src/util/index");

const initializePassport = () => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = username;
        if (!user) throw new Error("user not found");
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Invalid password");
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    })
  );
};

module.exports = initializePassport;
