import React, { useState } from "react";
import styles from "./Modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

function Modal({
  show,
  handleClose,
  handleSubmit,
  twelveScreenshot,
  liveScreenShot,
  currentData,
}) {
  const [prediction, setPrediction] = useState("");
  const [error, setError] = useState(null);

  if (!show) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={handleClose}>
          &times;
        </button>
        <div>
          <div>
            <u>
              {currentData.date_recorded} ||
              {currentData.session_time}{" "}
            </u>
          </div>
          <ul className={styles.horizontalList}>
            <li>
              Wind: {currentData.wind_speed} m/s
              <FontAwesomeIcon
                icon={faArrowUp}
                style={{
                  transform: `rotate(${currentData.wind_direction + 180}deg)`,
                  fontSize: "1em", // Adjust the size of the icon
                  verticalAlign: "middle", // Align the icon vertically
                  marginLeft: "5px", // Add some space between the text and the icon
                }}
              />
            </li>
            <li>
              Swell: {currentData.wave_height} m @ {currentData.wave_period}s{" "}
              <FontAwesomeIcon
                icon={faArrowUp}
                style={{
                  transform: `rotate(${currentData.wave_direction + 180}deg)`,
                  fontSize: "1em", // Adjust the size of the icon
                  verticalAlign: "middle", // Align the icon vertically
                  marginLeft: "5px", // Add some space between the text and the icon
                }}
              />
            </li>
            <li>{currentData.temperature}°C</li>
          </ul>
        </div>
        <h3>Make your forecast:</h3>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="prediction">Prediction: </label>
            <input type="text" id="prediction" name="prediction" required />
          </div>
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>
        {liveScreenShot && (
          <div className={styles.screenshotContainer}>
            <img
              className={styles.screenshot}
              src={`data:image/png;base64,${liveScreenShot}`}
              alt="12 Hour Prior Screenshot"
            />
          </div>
        )}
        {twelveScreenshot && (
          <div className={styles.screenshotContainer}>
            <img
              className={styles.screenshot}
              src={`data:image/png;base64,${twelveScreenshot}`}
              alt="12 Hour Prior Screenshot"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
