import React, { useState, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
// import dayjs from "dayjs";
import styles from "./ThreeHourView.module.css";
import { GlobalContext } from "../../GlobalState";
import Modal from "./Modal/Modal";
import ConfModal from "./ConfModal/ConfModal";
import { createEntry, createJournalEntry } from "../../util";
// import apiUrl from "../../config";

function ThreeHourView() {
  const location = useLocation();
  const { threeHourPeriodIndex, date, dayIndex } = location.state || {};
  const { threeHourWind, threeHourWave } = useContext(GlobalContext);
  const [twelveScreenshot, setTwelveScreenshot] = useState(null);
  const [liveScreenShot, setLiveScreenShot] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfModal, setShowConfModal] = useState(false);

  // format the date to insert into URL
  // const originalDate = dayjs(date);
  // const month = originalDate.format("MM");
  // const day = originalDate.format("DD");
  // const currentYear = dayjs().year();
  // const fullDate = `${currentYear}-${month}-${day}`;
  // const formattedDate = dayjs(fullDate).format("YYYY-MM-DD");

  //fetch the screenshots with the formattedDate
  // useEffect(() => {
  //   async function fetchTwelveHourPriorScreenshot() {
  //     try {
  //       let url;
  //       const newTime = threeHourPeriodIndex * 3 - 12;
  //       if (newTime < 0) {
  //         const originalDate = dayjs(date);
  //         const month = originalDate.format("MM");
  //         const day = originalDate.format("DD") - 1;
  //         const fullDate = `${currentYear}-${month}-${day}`;
  //         const negativeFormattedDate = dayjs(fullDate).format("YYYY-MM-DD");
  //         const newNegativeTime = threeHourPeriodIndex * 3 - 12 + 24;
  //         url = `https://zoom.earth/maps/wind-speed/#view=56.13,2.822,6z/date=${negativeFormattedDate},${newNegativeTime}:00,+1/model=icon`;
  //       } else {
  //         url = `https://zoom.earth/maps/wind-speed/#view=56.13,2.822,6z/date=${formattedDate},${newTime}:00,+1/model=icon`;
  //       }
  //       const response = await fetch(
  //         `http://localhost:8000/api/screenshot?url=${encodeURIComponent(url)}`
  //       );
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const data = await response.json();
  //       setTwelveScreenshot(data.screenshot);
  //     } catch (error) {
  //       console.error("Error fetching screenshot:", error);
  //       setError("Failed to fetch screenshot");
  //     }
  //   }

  //   async function fetchLivePriorScreenshot() {
  //     try {
  //       const newTime = threeHourPeriodIndex * 3;
  //       const url = `https://zoom.earth/maps/wind-speed/#view=58.35609,9.51122,8z/date=${formattedDate},${newTime}:00,+1/model=icon`;
  //       const response = await fetch(
  //         `http://localhost:8000/api/screenshot?url=${encodeURIComponent(url)}`
  //       );
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const data = await response.json();
  //       setLiveScreenShot(data.screenshot);
  //     } catch (error) {
  //       console.error("Error fetching screenshot:", error);
  //       setError("Failed to fetch screenshot");
  //     }
  //   }

  //   fetchLivePriorScreenshot();
  //   fetchTwelveHourPriorScreenshot();
  // }, []);

  const handleModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCloseConfModal = async (e) => {
    setShowConfModal(false);
  };

  //get the data from the state
  const currentData = {
    date_recorded: date,
    session_time: `${threeHourPeriodIndex * 3}:00 - ${
      threeHourPeriodIndex * 3 + 3
    }:00`,
    wind_speed:
      threeHourWind?.hourly?.windSpeed10m[
        dayIndex * 8 + threeHourPeriodIndex
      ].toFixed(2),
    wind_direction:
      threeHourWind?.hourly?.windDirection10m[
        dayIndex * 8 + threeHourPeriodIndex
      ],
    wave_height:
      threeHourWave?.hourly?.waveHeight[dayIndex * 8 + threeHourPeriodIndex].toFixed(2),
    wave_period:
      threeHourWave?.hourly?.swellWavePeriod[
        dayIndex * 8 + threeHourPeriodIndex
      ].toFixed(2),
    wave_direction:
      threeHourWave?.hourly?.waveDirection[
        dayIndex * 8 + threeHourPeriodIndex
      ],
    temperature:
      threeHourWind?.hourly?.temperature2m[
        dayIndex * 8 + threeHourPeriodIndex
      ].toFixed(2),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 
    const data = currentData;
    const formData = new FormData(e.target);
    const prediction = formData.get("prediction");
    try {
      const result = await createEntry(data);
      const journalData = {
        forecast_id: result.forecast_id,
        prediction,
      };
      await createJournalEntry(journalData);
      setShowModal(false);
      setShowConfModal(true);
    } catch (err) {
      console.error("Error creating forecast:", err);
      setError(err.message);
    }
  };

  return (
    <div className={styles.page}>
      <nav className={styles.navbar}>
        <ul>
          <li>
            <Link to="/one-day-view" state={{ dayIndex, date }}>
              Back
            </Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Log In</Link>
          </li>
        </ul>
      </nav>
      <h2>
        Session Time: {threeHourPeriodIndex * 3}:00 -{" "}
        {threeHourPeriodIndex * 3 + 3}:00
      </h2>
      <h3>{date}</h3>
      <button onClick={handleModal} className={styles.modalButton}>
        Log to Journal
      </button>
      <Modal
        show={showModal}
        handleClose={handleCloseModal}
        handleSubmit={handleSubmit}
        // twelveScreenshot={twelveScreenshot}
        // liveScreenShot={liveScreenShot}
        currentData={currentData}
      />
      <ConfModal show={showConfModal} handleClose={handleCloseConfModal} />
      <div className={styles.screenshotContainer}>
        {" "}
        Session wind forecast
        <div className={styles.screenshot}>
          {error ? (
            <p>{error}</p>
          ) : liveScreenShot ? (
            <img
              className={styles.screenshot}
              src={`data:image/png;base64,${liveScreenShot}`}
              alt="Webpage Screenshot"
            />
          ) : (
            <p>Loading screenshot...</p>
          )}
        </div>
      </div>
      <div className={styles.screenshotContainer}>
        {" "}
        Wind over North Sea **12 hours prior**
        <div className={styles.screenshot}>
          {error ? (
            <p>{error}</p>
          ) : twelveScreenshot ? (
            <img
              className={styles.screenshot}
              src={`data:image/png;base64,${twelveScreenshot}`}
              alt="Webpage Screenshot"
            />
          ) : (
            <p>Loading screenshot...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ThreeHourView;
