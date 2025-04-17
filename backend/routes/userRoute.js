const express = require("express");
const router = express.Router();
const { createUser } = require("../controller/index");

router.post("/users/createUser", createUser);

module.exports = router;

// STEP FIVE - this connects model and controller components
// recieve the middleware from the controller, and create your routes
// pass these routes to the TOP!
