const express = require("express");
const router = express.Router();

const { readUser, createUser, loginUser } = require("../controller/index");

router.get("/users", readUser);
router.post("/users", createUser);
router.post("/users/login", loginUser);

module.exports = router;
