import React, { useState, useEffect } from "react";
import styles from "./Journal.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import {
  getForecast,
  getPredictions,
  addReport,
  updatePrediction,
  deleteEntry,
  deleteReport,
} from "../../util";

function Journal() {
  const [entries, setEntries] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [error, setError] = useState(null);
  const [predError, setPredError] = useState(null);
  const [visibleForms, setVisibleForms] = useState({});
  const [editForms, setEditForms] = useState({});

  const fetchEntries = async () => {
    const res = await getForecast();
    if (res.error) {
      setError(res.error.name);
    }
    setEntries(res.data);
    console.log("err in fetch in journal:", error);
  };

  const fetchPredictions = async () => {
    const predRes = await getPredictions();
    if (predRes.error) {
      setPredError(predRes.error.name);
    }
    setPredictions(predRes.data);
    console.log("predErr in fetch in journal:", predError);
  };

  useEffect(() => {
    fetchEntries();
    fetchPredictions();
  }, []);

  const mergedData = entries.map((entry) => {
    const prediction = predictions.find(
      (pred) => pred.forecast_id === entry.forecast_id
    );
    return {
      ...entry,
      prediction: prediction ? prediction.prediction : null,
      report: prediction ? prediction.report : null,
    };
  });

  mergedData.reverse();

  const toggleFormVisibility = (forecast_id) => {
    setVisibleForms((prevState) => ({
      ...prevState,
      [forecast_id]: !prevState[forecast_id],
    }));
  };

  const handleSubmit = async (e, forecast_id) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const report = formData.get("report");

    const journalData = {
      forecast_id,
      report,
    };
    console.log("the formData:", formData);
    try {
      const journalResult = await addReport(journalData);
      console.log("Report updated:", journalResult);

      // Hide the form after submission
      setVisibleForms((prevState) => ({
        ...prevState,
        [forecast_id]: false,
      }));

      // Optionally, update the predictions state to reflect the new entry
      setPredictions((prevState) =>
        prevState.map((pred) =>
          pred.forecast_id === forecast_id ? { ...pred, report } : pred
        )
      );
    } catch (err) {
      console.error("Error updating report:", err);
    }
  };

  const toggleEditFormVisibility = (forecast_id, field) => {
    setEditForms((prevState) => ({
      ...prevState,
      [forecast_id]: {
        ...prevState[forecast_id],
        [field]: !prevState[forecast_id]?.[field],
      },
    }));
  };

  const handleEdit = async (e, forecast_id, field) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const value = formData.get(field);
    const updateData = {
      forecast_id,
      [field]: value,
    };
    try {
      if (field === "prediction") {
        const predictionResult = await updatePrediction(updateData);
        console.log("Prediction updated:", predictionResult);
      } else if (field === "report") {
        const reportResult = await addReport(updateData);
        console.log("Report updated:", reportResult);
      }

      // Hide the edit form after submission
      setEditForms((prevState) => ({
        ...prevState,
        [forecast_id]: {
          ...prevState[forecast_id],
          [field]: false,
        },
      }));

      // Optionally, update the predictions state to reflect the new entry
      setPredictions((prevState) =>
        prevState.map((pred) =>
          pred.forecast_id === forecast_id ? { ...pred, [field]: value } : pred
        )
      );
    } catch (err) {
      console.error(`Error updating ${field}:`, err);
    }
  };

  const handleDelete = async (forecast_id) => {
    try {
      await Promise.all([
        deleteEntry(forecast_id),
        deleteReport(forecast_id)
      ]);
      console.log(`Entries with forecast_id ${forecast_id} deleted`);

      // update the entries state to reflect the deletion
      setEntries((prevState) =>
        prevState.filter((entry) => entry.forecast_id !== forecast_id)
      );
      setPredictions((prevState) =>
        prevState.filter((pred) => pred.forecast_id !== forecast_id)
      );
    } catch (err) {
      console.error(
        `Error deleting entry with forecast_id ${forecast_id}:`,
        err
      );
    }
  };

  return (
    <div className={styles.page}>
      <nav className={styles.navbar}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
      <h2>Surf Journal</h2>
      {mergedData.map((entry) => (
        <div
          key={entry.forecast_id}
          className={`${styles.singleEntry} ${
            entry.report ? styles.reported : ""
          }`}
        >
          <button
            className={styles.closeButton}
            onClick={() => handleDelete(entry.forecast_id)}
          >
            &times;
          </button>
          <div>
            <u>
              {entry.date_recorded} | {entry.session_time}{" "}
            </u>
          </div>
          <ul className={styles.horizontalList}>
            <li>
              Wind: {entry.wind_speed} m/s
              <FontAwesomeIcon
                icon={faArrowUp}
                style={{
                  transform: `rotate(${entry.wind_direction + 180}deg)`,
                  fontSize: "1em",
                  verticalAlign: "middle",
                  marginLeft: "5px",
                }}
              />
            </li>
            <li>
              Swell: {entry.wave_height} m @ {entry.wave_period}s{" "}
              <FontAwesomeIcon
                icon={faArrowUp}
                style={{
                  transform: `rotate(${entry.wave_direction + 180}deg)`,
                  fontSize: "1em",
                  verticalAlign: "middle",
                  marginLeft: "5px",
                }}
              />
            </li>
            <li>{entry.temperature}°C</li>
            <li>
              Prediction:{" "}
              {editForms[entry.forecast_id]?.prediction ? (
                <form
                  onSubmit={(e) =>
                    handleEdit(e, entry.forecast_id, "prediction")
                  }
                  className={styles.inlineForm}
                >
                  <div className={styles.formGroup}>
                    <input
                      type="text"
                      id={`prediction-${entry.forecast_id}`}
                      name="prediction"
                      defaultValue={entry.prediction}
                      required
                    />
                    <button type="submit" className={styles.submitButton}>
                      Save
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  {entry.prediction}
                  <button
                    onClick={() =>
                      toggleEditFormVisibility(entry.forecast_id, "prediction")
                    }
                    className={styles.editButton}
                  >
                    <FontAwesomeIcon icon={faPencilAlt} />
                  </button>
                </>
              )}
            </li>
            <li>
              Experience:{" "}
              {editForms[entry.forecast_id]?.report ? (
                <form
                  onSubmit={(e) => handleEdit(e, entry.forecast_id, "report")}
                  className={`${styles.inlineForm} ${styles.centeredForm}`}
                >
                  <div className={styles.formGroup}>
                    <input
                      type="text"
                      id={`report-${entry.forecast_id}`}
                      name="report"
                      defaultValue={entry.report}
                      required
                    />
                    <button type="submit" className={styles.submitButton}>
                      Save
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  {entry.report ? (
                    <>
                      {entry.report}
                      <button
                        onClick={() => toggleEditFormVisibility(entry.forecast_id, "report")}
                        className={styles.editButton}
                      >
                        <FontAwesomeIcon icon={faPencilAlt} />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => toggleEditFormVisibility(entry.forecast_id, "report")}
                      className={styles.addButton}
                    >
                      Add Report
                    </button>
                  )}
                </>
              )}
            </li>
            {visibleForms[entry.forecast_id] && (
              <form
                onSubmit={(e) => handleSubmit(e, entry.forecast_id)}
                className={styles.inlineForm}
              >
                <div className={styles.formGroup}>
                  <label htmlFor={`report-${entry.forecast_id}`}>
                    Experience:{" "}
                  </label>
                  <input
                    type="text"
                    id={`report-${entry.forecast_id}`}
                    name="report"
                    required
                  />
                  <button type="submit" className={styles.submitButton}>
                    Submit
                  </button>
                </div>
              </form>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Journal;
