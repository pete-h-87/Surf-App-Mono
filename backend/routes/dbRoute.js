const express = require("express");
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