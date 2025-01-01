const express = require("express");
const axios =  require('axios');
const router = express.Router();
const { read, readPredictions, create, createJournalEntry, addReport, updatePrediction, deleteReport, deleteEntry } = require("../controller/index");

router.get("/forecast/home", read);
router.get("/forecast/readPredictions", readPredictions);
router.post("/forecast/create", create);
router.post("/forecast/createJournalEntry", createJournalEntry);
router.post("/forecast/addReport", addReport);
router.put("/forecast/updatePrediction", updatePrediction)
router.delete("/forecast/deleteEntry", deleteEntry);
router.delete("/forecast/deleteReport", deleteReport);


module.exports = router;

// STEP FIVE - this connects model and controller components
// recieve the middleware from the contorller, and create your routes
// pass these routes to the TOP!
