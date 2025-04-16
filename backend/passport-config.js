const passport = require("passport");
const Strategy = require("passport-local");
const bcrypt = require("bcryptjs");
// const { loggingInTheUser } = require("../frontend/src/util/index");

const initializePassport = () => {
  passport.use(
    new Strategy(async (username, password, done) => {
      console.log("username:", username);
      console.log("password:", password);
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
