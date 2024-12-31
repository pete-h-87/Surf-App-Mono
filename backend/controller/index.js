const {
  get,
  getPredictions,
  create,
  createJournalEntry,
  updatePrediction,
  addReport,
  deleteReport,
  deleteEntry,
} = require("../model/dbApi");

exports.read = async (req, res) => {
  try {
    const forecast = await get();
    return res.json({ data: forecast.rows }); //???
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
};

exports.readPredictions = async (req, res) => {
  try {
    const predictions = await getPredictions();
    return res.json({ data: predictions.rows }); //???
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
};

exports.create = async (req, res) => {
  try {
    const data = req.body;
    console.log("Data received in create endpoint1:", data);
    const result = await create(data);
    return res.status(201).json(result);
  } catch (err) {
    console.error("Error creating forecast1:", err);
    return res.status(400).json({
      error: err.message,
    });
  }
};

exports.createJournalEntry = async (req, res) => {
  try {
    const data = req.body;
    console.log("Data received in createJournalEntry endpoint:", data);
    const result = await createJournalEntry(data);
    return res.status(201).json(result);
  } catch (err) {
    console.error("Error creating journal entry:", err);
    return res.status(400).json({
      error: err.message,
    });
  }
};

exports.addReport = async (req, res) => {
  try {
    const data = req.body;
    const result = await addReport(data);
    return res.status(201).json(result);
  } catch (err) {
    console.error("Error creating journal entry:", err);
    return res.status(400).json({
      error: err.message,
    });
  }
};

exports.updatePrediction = async (req, res) => {
  try {
    const data = req.body;
    const result = await updatePrediction(data);
    return res.status(201).json(result);
  } catch (err) {
    console.error("Error creating journal entry:", err);
    return res.status(400).json({
      error: err.message,
    });
  }
};

exports.deleteEntry = async (req, res) => {
  try {
    const { forecast_id } = req.body;
    if (!forecast_id) {
      throw new Error('forecast_id is required');
    }
    await deleteEntry(forecast_id);
    return res.status(200).json({ message: `Entries with forecast_id ${forecast_id} deleted from journal table` });
  } catch (err) {
    console.error(`Error deleting entry with forecast_id ${req.body.forecast_id}:`, err);
    return res.status(400).json({
      error: err.message,
    });
  }
};

exports.deleteReport = async (req, res) => {
  try {
    const { forecast_id } = req.body;
    if (!forecast_id) {
      throw new Error('forecast_id is required');
    }
    await deleteReport(forecast_id);
    return res.status(200).json({ message: `Entries with forecast_id ${forecast_id} deleted from forecast table` });
  } catch (err) {
    console.error(`Error deleting entry with forecast_id ${req.body.forecast_id}:`, err);
    return res.status(400).json({
      error: err.message,
    });
  }
};

// STEP FOUR - recieve the SQL injections from the model, and make middelware in your controller folder -
// pass to your routes
