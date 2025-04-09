const express = require("express");
const router = express.Router();
const { read, readUser, createUser, readPredictions, create, createJournalEntry, addReport, updatePrediction, deleteEntry, deleteReport } = require("../controller/index");

router.get("/", read);
router.get("/readPredictions", readPredictions);
router.get("/users", readUser);
router.post("/createUser", createUser)
router.post("/create", create);
router.post("/createJournalEntry", createJournalEntry);
router.post("/addReport", addReport);
router.put("/updatePrediction", updatePrediction);
router.delete("/deleteEntry", deleteEntry);
router.delete("/deleteReport", deleteReport);

module.exports = router;

// STEP FIVE - this connects model and controller components
// recieve the middleware from the controller, and create your routes
// pass these routes to the TOP!