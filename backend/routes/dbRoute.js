const express = require("express");
const router = express.Router();
const {
  read,
  readPredictions,
  create,
  createJournalEntry,
  addReport,
  updatePrediction,
  deleteEntry,
  deleteReport,
} = require("../controller/index");
const checkSession = require("../middleware/middleware");

router.get("/user/:user_id", checkSession, read);
router.get("/readPredictions", checkSession, readPredictions);
router.post("/create", checkSession, create);
router.post("/createJournalEntry", checkSession, createJournalEntry);
router.post("/addReport", checkSession, addReport);
router.put("/updatePrediction", checkSession, updatePrediction);
router.delete("/deleteEntry", deleteEntry);
router.delete("/deleteReport", deleteReport);

module.exports = router;

// STEP FIVE - this connects model and controller components
// recieve the middleware from the controller, and create your routes
// pass these routes to the TOP!
