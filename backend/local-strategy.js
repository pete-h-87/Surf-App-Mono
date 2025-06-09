const passport = require("passport");
const Strategy = require("passport-local");
const bcrypt = require("bcryptjs");
const { findUserByEmail, findUserById } = require("./model/dbApi");

passport.serializeUser((user, done) => {
  console.log("the serialized user id:", user.user_id);
  done(null, user.user_id);
});

passport.deserializeUser(async (id, done) => {
  console.log("the id in desirelize", id);
  try {
    const user = await findUserById(id);
    console.log("the deserialized ID:", id);
    if (!user) throw new Error("user not found in deserializer");
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport.use(
  new Strategy({ usernameField: "email" }, async (email, password, done) => {
    // console.log("user email:", email);
    // console.log("password:", password);
    try {
      const user = await findUserByEmail(email);
      if (!user) return done(null, false, { message: "Email not found" });
      const isMatch = await bcrypt.compare(password, user.user_password);
      if (!isMatch) return done(null, false, { message: "Invalid password" });
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  })
);
