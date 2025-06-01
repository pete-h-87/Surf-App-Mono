import React, { useState, useContext, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import dayjs from "dayjs";
import styles from "./ThreeHourView.module.css";
import { GlobalContext } from "../../GlobalState";
import Modal from "./Modal/Modal";
import ConfModal from "./ConfModal/ConfModal";
import { createEntry, createJournalEntry } from "../../util";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { ArrowLeftToLine } from "lucide-react";

// import apiUrl from "../../config";
// import screenshotEx1 from "../../../public/pictures/ScreenshotEx1.png"

function ThreeHourView() {
  const location = useLocation();
  const { threeHourPeriodIndex, date, dayIndex } = location.state || {};
  const {
    threeHourWind,
    threeHourWave,
    loggedInUser,
    loggedInUserId,
    setLoggedInUser,
    setLoggedInUserId,
    setSessionTimeOutModal,
  } = useContext(GlobalContext);
  const [twelveScreenshot, setTwelveScreenshot] = useState(null);
  const [liveScreenShot, setLiveScreenShot] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfModal, setShowConfModal] = useState(false);

  const navigate = useNavigate();

  // format the date to insert into URL
  const originalDate = dayjs(date);
  const month = originalDate.format("MM");
  const day = originalDate.format("DD");
  const currentYear = dayjs().year();
  const fullDate = `${currentYear}-${month}-${day}`;
  const formattedDate = dayjs(fullDate).format("YYYY-MM-DD");

  const [animateIn, setAnimateIn] = useState(false);
  const [loginPressed, setLoginPressed] = useState(false);
  const [forecastPressed, setForecastPressed] = useState(false);
  const [journalPressed, setJournalPressed] = useState(false);

  // Spring-like animation for button press using CSS classes
  const animatePress = (setPressedState) => {
    setPressedState(true); // Apply pressed state (scale down)
    setTimeout(() => {
      setPressedState(false); // Remove pressed state (scale back up)
    }, 10); // Short duration for the press effect
  };

  // Entrance animation effect (runs once on component mount)
  useEffect(() => {
    // Trigger the entrance animation after a short delay
    const timer = setTimeout(() => {
      setAnimateIn(true);
    }, 10); // time waiting to begin animations
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  // fetch the screenshots with the formattedDate
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
  //         url = `https://zoom.earth/maps/wind-speed/#view=56.13,2.822,6z/date=${negativeFormattedDate},${newNegativeTime}:00,+2/model=icon`;
  //       } else {
  //         url = `https://zoom.earth/maps/wind-speed/#view=56.13,2.822,6z/date=${formattedDate},${newTime}:00,+1/model=icon`;
  //       }
  //       const response = await fetch(
  //         `http://localhost:8000/api/screenshot/one-week-view?url=${encodeURIComponent(url)}`
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
      threeHourWave?.hourly?.waveHeight[
        dayIndex * 8 + threeHourPeriodIndex
      ].toFixed(2),
    wave_period:
      threeHourWave?.hourly?.swellWavePeriod[
        dayIndex * 8 + threeHourPeriodIndex
      ].toFixed(2),
    wave_direction:
      threeHourWave?.hourly?.waveDirection[dayIndex * 8 + threeHourPeriodIndex],
    temperature:
      threeHourWind?.hourly?.temperature2m[
        dayIndex * 8 + threeHourPeriodIndex
      ].toFixed(2),
    user_id: loggedInUserId,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const data = currentData;
    const formData = new FormData(e.target);
    const prediction = formData.get("prediction");
    try {
      const result = await createEntry(data);
      if (result.status === 401) {
        setLoggedInUser(null);
        setLoggedInUserId(null);
        setSessionTimeOutModal(true);
        navigate("/homescreen");
        return;
      }
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
          <li className={styles.arrowContainer}>
            <Link to="/one-day-view" state={{ dayIndex, date }}>
              <ArrowLeftToLine
                color="#E2E8F0"
                size={16}
                className={styles.icon}
              />
              {" " + "Day"}
            </Link>
          </li>
          <li>
            <Link to="/homescreen">Home</Link>
          </li>
          <li>
            {loggedInUser ? (
              <Link to="/account">Account</Link>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
        </ul>
      </nav>
      <h2>
        Session Time: {threeHourPeriodIndex * 3}:00 -{" "}
        {threeHourPeriodIndex * 3 + 3}:00
      </h2>
      <h3>{date}</h3>

      <div
        className={`${styles.oldButton} ${animateIn ? styles.animateIn : ""} ${
          loginPressed ? styles.pressed : ""
        }`}
        style={{
          transform: `translateY(${animateIn ? "0" : "20px"}) scale(${
            loginPressed ? "0.95" : "1"
          })`,
          opacity: animateIn ? "1" : "0",
          transitionDelay: animateIn ? "0.1s" : "0s",
        }}
      >
        <div className={styles.buttonContent}>
          <span className={styles.infoSpan}>
            Swell: {currentData.wave_height}m @ {currentData.wave_period} s
            <FontAwesomeIcon
              icon={faArrowUp}
              style={{
                transform: `rotate(${currentData.wave_direction + 180}deg)`,
                fontSize: "1em",
                verticalAlign: "middle",
                marginLeft: "5px",
              }}
            />{" "}
          </span>
          <span className={styles.infoSpan}>
            Wind: {currentData.wind_speed} m/s
            <FontAwesomeIcon
              icon={faArrowUp}
              style={{
                transform: `rotate(${currentData.wind_direction + 180}deg)`,
                fontSize: "1em",
                verticalAlign: "middle",
                marginLeft: "5px",
              }}
            />
          </span>
        </div>
      </div>

      {loggedInUser ? (
        <button onClick={handleModal} className={styles.modalButton}>
          Log to Journal
        </button>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className={styles.modalButton}
        >
          Log to Journal{" "}
        </button>
      )}

      <Modal
        show={showModal}
        handleClose={handleCloseModal}
        handleSubmit={handleSubmit}
        // twelveScreenshot={twelveScreenshot}
        // liveScreenShot={liveScreenShot}
        currentData={currentData}
      />
      <ConfModal show={showConfModal} handleClose={handleCloseConfModal} />
      <div
        className={`${styles.screenshotContainer} ${
          animateIn ? styles.animateIn : ""
        } ${loginPressed ? styles.pressed : ""}`}
        style={{
          transform: `translateY(${animateIn ? "0" : "20px"}) scale(${
            loginPressed ? "0.95" : "1"
          })`,
          opacity: animateIn ? "1" : "0",
          transitionDelay: animateIn ? "0.2s" : "0s",
        }}
      >
        {" "}
        Session wind forecast
        <div className={styles.screenshot}>
          <img
            className={styles.screenshot}
            src="/pictures/ScreenshotEx1.png"
            alt="Webpage Screenshot"
          />
        </div>
      </div>
      <div
        className={`${styles.screenshotContainer} ${
          animateIn ? styles.animateIn : ""
        } ${loginPressed ? styles.pressed : ""}`}
        style={{
          transform: `translateY(${animateIn ? "0" : "20px"}) scale(${
            loginPressed ? "0.95" : "1"
          })`,
          opacity: animateIn ? "1" : "0",
          transitionDelay: animateIn ? "0.3s" : "0s",
        }}
      >
        {" "}
        Wind over North Sea **12 hours prior**
        <div className={styles.screenshot}>
          <img
            className={styles.screenshot}
            src="/pictures/ScreenshotEx2.png"
            alt="Webpage Screenshot"
          />
        </div>
      </div>
    </div>
  );
}

export default ThreeHourView;
