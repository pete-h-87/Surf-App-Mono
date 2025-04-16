const express = require("express");
const passport = require("passport");
const router = express.Router();

const { readUser, createUser, loginUser, loginUserWithAuth } = require("../controller/index");

router.get("/users", readUser);
router.post("/users/createUser", createUser);
router.post("/users/loginUser", loginUser);
router.post("/users/auth", passport.authenticate("local"), (req, res) => {
  console.log("Authenticated user:", req.user);
  res.status(200).json({ message: "Login successful", user: req.user });
});

module.exports = router;

// STEP FIVE - this connects model and controller components
// recieve the middleware from the controller, and create your routes
// pass these routes to the TOP!
