const express = require("express");
const axios =  require('axios');
const router = express.Router();
const { read, readPredictions, create, createJournalEntry, addReport, updatePrediction, deleteEntry, deleteReport } = require("../controller/index");

router.get("/", read);
router.get("/readPredictions", readPredictions);
router.post("/create", create);
router.post("/createJournalEntry", createJournalEntry);
router.post("/addReport", addReport);
router.put("/updatePrediction", updatePrediction);
router.delete("/deleteEntry", deleteEntry);
router.delete("/deleteReport", deleteReport);


module.exports = router;

// STEP FIVE - this connects model and controller components
// recieve the middleware from the contorller, and create your routes
// pass these routes to the TOP!
