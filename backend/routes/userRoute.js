const express = require("express");
const router = express.Router();

const {readUser} = require("../controller/index");

router.get("/users", readUser);

module.exports = router;