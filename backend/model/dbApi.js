const pool = require("./database");

const get = () => pool.query("SELECT * FROM forecast");

const getPredictions = () => pool.query("SELECT * FROM journal");

const create = async (data) => {
  const {
    date_recorded,
    session_time,
    wind_speed,
    wind_direction,
    wave_height,
    wave_period,
    wave_direction,
    temperature,
  } = data;
  try {
    const forecastQuery = `
      INSERT INTO forecast (date_recorded, session_time, wind_speed, wind_direction, wave_height, wave_period, wave_direction, temperature)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING forecast_id
    `;
    const forecastValues = [
      date_recorded,
      session_time,
      wind_speed,
      wind_direction,
      wave_height,
      wave_period,
      wave_direction,
      temperature,
    ];
    const forecastResult = await pool.query(forecastQuery, forecastValues);
    return forecastResult.rows[0];
  } catch (error) {
    console.error("Error creating forecast:", error);
    throw error;
  }
};

const createJournalEntry = async (data) => {
  const { forecast_id, prediction } = data;
  try {
    const query = `
      INSERT INTO journal (forecast_id, prediction)
      VALUES ($1, $2)
      RETURNING journal_id
    `;
    const values = [forecast_id, prediction];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating journal entry:", error);
    throw error;
  }
};

const addReport = async (data) => {
  const { forecast_id, report } = data;
  try {
    const query = `
      UPDATE journal
      SET report = $1
      WHERE forecast_id = $2
      RETURNING journal_id, report
    `;
    const values = [report, forecast_id];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error updating report:", error);
    throw error;
  }
};

const updatePrediction = async (data) => {
  const { forecast_id, prediction } = data;
  try {
    const query = `
      UPDATE journal
      SET prediction = $1
      WHERE forecast_id = $2
      RETURNING journal_id, prediction
    `;
    const values = [prediction, forecast_id];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error updating prediction:", error);
    throw error;
  }
};

const deleteEntry = async (forecast_id) => { //foreign/primary key constraints - first to delete
  try {
    const deleteJournalQuery = `DELETE FROM journal WHERE forecast_id = $1`;
    const values = [forecast_id];
    await pool.query(deleteJournalQuery, values);
  } catch (error) {
    console.error(
      `Error deleting entries with forecast_id ${forecast_id}:`,
      error
    );
    throw error;
  }
};

const deleteReport = async (forecast_id) => {
  try {
    const deleteForecastQuery = `DELETE FROM forecast WHERE forecast_id = $1`;
    const values = [forecast_id];
    await pool.query(deleteForecastQuery, values);
  } catch (error) {
    console.error(
      `Error deleting entries with forecast_id ${forecast_id}:`,
      error
    );
    throw error;
  }
};

module.exports = {
  get,
  getPredictions,
  create,
  createJournalEntry,
  addReport,
  updatePrediction,
  deleteEntry,
  deleteReport,
};