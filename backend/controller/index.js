const bcrypt = require("bcryptjs");

const {
  get,
  getPredictions,
  create,
  createJournalEntry,
  updatePrediction,
  addReport,
  deleteEntry,
  deleteReport,
  addNewUser,
} = require("../model/dbApi");

exports.read = async (req, res) => {
  try {
    const { user_id } = req.params;
    if (!user_id) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const forecast = await get(user_id);
    return res.json({ data: forecast.rows });
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
};

exports.readPredictions = async (req, res) => {
  try {
    const predictions = await getPredictions();
    return res.json({ data: predictions.rows });
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
};

exports.create = async (req, res) => {
  try {
    const data = req.body;
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
    console.log("the add report:", req.body);
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
    console.log("the update prediction:", req.body);
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
    console.log("the delete entry:", req.body);
    if (!forecast_id) {
      throw new Error("forecast_id is required");
    }
    await deleteEntry(forecast_id);
    return res.status(200).json({
      message: `Entries with forecast_id ${forecast_id} deleted from journal table`,
    });
  } catch (err) {
    console.error(
      `Error deleting entry with forecast_id ${req.body.forecast_id}:`,
      err
    );
    return res.status(400).json({
      error: err.message,
    });
  }
};

exports.deleteReport = async (req, res) => {
  try {
    const { forecast_id } = req.body;
    console.log("the delete report:", req.body);
    if (!forecast_id) {
      throw new Error("forecast_id is required");
    }
    await deleteReport(forecast_id);
    return res.status(200).json({
      message: `Entries with forecast_id ${forecast_id} deleted from forecast table`,
    });
  } catch (err) {
    console.error(
      `Error deleting entry with forecast_id ${req.body.forecast_id}:`,
      err
    );
    return res.status(400).json({
      error: err.message,
    });
  }
};

//authentication

// exports.readUser = async (req, res) => {
//   try {
//     res.json(users);
//   } catch (err) {
//     console.error(err);
//   }
// };

exports.createUser = async (req, res) => {
  try {
    const hashSaltPassword = await bcrypt.hash(req.body.password, 10);
    const user = {
      name: req.body.name,
      password: hashSaltPassword,
      email: req.body.email,
    };
    const result = await addNewUser(user);
    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

// exports.loginUserWithAuth = (req, res, next) => {
//   passport.authenticate("local", (err, user, info) => {
//     if (err) {
//       console.error("Error during authentication:", err);
//       return res.status(500).json({ message: "Internal server error" });
//     }
//     if (!user) {
//       console.log("Authentication failed:", info.message);
//       return res.status(401).json({ message: info.message }); // Send error message from strategy
//     }
//     req.logIn(user, (err) => {
//       if (err) {
//         console.error("Error during login:", err);
//         return res.status(500).json({ message: "Internal server error" });
//       }
//       // console.log("User logged in successfully:", user);
//       console.log("response in logingUserWithAuth func:", res.statusCode)
//       return res.status(200).json({ message: "Login successful", redirectUrl: "/" });
//     });
//   })(req, res, next); // Pass req, res, and next to passport.authenticate
// };



// STEP FOUR - recieve the SQL injections from the model, and make middelware in your controller folder -
// pass to your routes
