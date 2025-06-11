import React, { useState, useEffect, useContext } from "react";
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
import { GlobalContext } from "../../GlobalState";
import { useNavigate } from "react-router-dom";

function Journal() {
  const [animateIn, setAnimateIn] = useState(false);
  const [entries, setEntries] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [error, setError] = useState(null);
  const [predError, setPredError] = useState(null);
  const [visibleForms, setVisibleForms] = useState({});
  const [editForms, setEditForms] = useState({});
  const {
    loggedInUserId,
    setLoggedInUser,
    setLoggedInUserId,
    setSessionTimeOutModal,
  } = useContext(GlobalContext);

  const navigate = useNavigate();

  const fetchEntries = async () => {
    if (loggedInUserId) {
      const res = await getForecast(loggedInUserId);
      console.log("journal 401 response? and STATUS?:", res.status);
      if (res.status === 401) {
        setLoggedInUser(null);
        setLoggedInUserId(null);
        setSessionTimeOutModal(true);
        setEntries([]);
        navigate("/");
        return;
      }
      if (res.error) {
        setError(res.error.name);
        setEntries([]);
      }
      if (res.data === null || res.data === undefined) {
        setEntries([]);
      }
      setEntries(res.data);
    } else {
      setEntries([]);
    }
  };

  const fetchPredictions = async () => {
    const predRes = await getPredictions();
    if (predRes.status === 401) {
      setLoggedInUser(null);
      setLoggedInUserId(null);
      setSessionTimeOutModal(true);
      setEntries([]);
      navigate("/");
      return;
    }
    if (predRes.error) {
      setPredError(predRes.error.name);
      console.log(predError);
    }
    setPredictions(predRes.data);
  };

  useEffect(() => {
    fetchEntries();
    fetchPredictions();
  }, []);

  useEffect(() => {
    if (entries.length > 0) {
      // Trigger the entrance animation after a short delay
      const timer = setTimeout(() => {
        setAnimateIn(true);
      }, 10); // time waiting to begin animations
      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [entries]); // Runs whenever loggedInUser changes

  const mergedData = (entries || []).map((entry) => {
    const prediction = (predictions || []).find(
      (pred) => pred.forecast_id === entry.forecast_id
    );
    return {
      ...entry,
      prediction: prediction ? prediction.prediction : null,
      report: prediction ? prediction.report : null,
    };
  });

  mergedData.reverse();

  const handleSubmit = async (e, forecast_id) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const report = formData.get("report");

    const journalData = {
      forecast_id,
      report,
    };
    try {
      await addReport(journalData);

      // Hide the form after submission
      setVisibleForms((prevState) => ({
        ...prevState,
        [forecast_id]: false,
      }));
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
        await updatePrediction(updateData);
        // return predictionResult;
      } else if (field === "report") {
        await addReport(updateData);
        // return reportResult;
      }
      // Hide the edit form after submission
      setEditForms((prevState) => ({
        ...prevState,
        [forecast_id]: {
          ...prevState[forecast_id],
          [field]: false,
        },
      }));
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
      const hasReport = predictions.some(
        (pred) => pred.forecast_id === forecast_id && pred.report
      );

      // Build the promises array conditionally
      const promises = [deleteEntry(forecast_id)];
      if (hasReport) {
        promises.push(deleteReport(forecast_id));
      }

      const [deleteEntryResponse, deleteReportResponse] = await Promise.all(
        promises
      );
      // update the entries state to reflect the deletion
      if (
        (deleteEntryResponse && deleteEntryResponse.status === 401) ||
        (deleteReportResponse && deleteReportResponse.status === 401)
        // check if it exists( aka, does deleteReportResponse exist?) - if so, then check the status
      ) {
        setLoggedInUser(null);
        setLoggedInUserId(null);
        setSessionTimeOutModal(true);
        setEntries([]);
        navigate("/");
        return;
      }
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

  if (entries.length === 0) {
    return (
      <div className={styles.page}>
        <nav className={styles.navbar}>
          <ul>
            <li>
              <div className={styles.spacer}></div>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/account">Account</Link>
            </li>
          </ul>
        </nav>
        <h2>Surf Journal</h2>
        <div className={styles.emptyJournal}>No Journal Entries Yet!</div>
      </div>
    );
  } else {
    return (
      <div className={styles.page}>
        <nav className={styles.navbar}>
          <ul>
            <li>
              <div className={styles.spacer}></div>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/account">Account</Link>
            </li>
          </ul>
        </nav>
        <h2>Surf Journal</h2>
        {mergedData.map((entry, index) => (
          <div
            key={entry.forecast_id}
            className={`${styles.singleEntry} ${
              entry.report ? styles.reported : ""
            }`}
            style={{
              opacity: animateIn ? "1" : "0",
              transition: "opacity 0.5s ease-in-out",
              transitionDelay: animateIn ? `${(index + 1) * 0.1}s` : 0,
            }}
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
                        toggleEditFormVisibility(
                          entry.forecast_id,
                          "prediction"
                        )
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
                          onClick={() =>
                            toggleEditFormVisibility(
                              entry.forecast_id,
                              "report"
                            )
                          }
                          className={styles.editButton}
                        >
                          <FontAwesomeIcon icon={faPencilAlt} />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() =>
                          toggleEditFormVisibility(entry.forecast_id, "report")
                        }
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
}

export default Journal;
