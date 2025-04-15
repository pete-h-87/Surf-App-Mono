const express = require("express");
const router = express.Router();

const { readUser, createUser, loginUser } = require("../controller/index");



router.get("/users", readUser);
router.post("/users/createUser", createUser);
router.post("/users/loginUser", loginUser);

module.exports = router;

// STEP FIVE - this connects model and controller components
// recieve the middleware from the controller, and create your routes
// pass these routes to the TOP!