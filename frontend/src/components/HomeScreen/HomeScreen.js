import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CircleUser, LogIn, Cloud, BookOpen } from "lucide-react"; // Using lucide-react for web icons
import styles from "./HomeScreen.module.css"; // Import the CSS module
import { GlobalContext } from "../../GlobalState";
import Modal from "./Modal/Modal";

const HomeScreen = () => {
  // State to manage the current "route" (simulating react-router)
  const { loggedInUser, sessionTimeOutModal, setSessionTimeOutModal } = useContext(GlobalContext);

  // State for animation triggers.
  // These will control the CSS classes that apply animations.
  const [animateIn, setAnimateIn] = useState(false);
  const [loginPressed, setLoginPressed] = useState(false);
  const [forecastPressed, setForecastPressed] = useState(false);
  const [journalPressed, setJournalPressed] = useState(false);

  const navigate = useNavigate();

  // Spring-like animation for button press using CSS classes
  const animatePress = (setPressedState) => {
    setPressedState(true); // Apply pressed state (scale down)
    setTimeout(() => {
      setPressedState(false); // Remove pressed state (scale back up)
    }, 100); // Short duration for the press effect
  };

  // Entrance animation effect (runs once on component mount)
  useEffect(() => {
    // Trigger the entrance animation after a short delay
    const timer = setTimeout(() => {
      setAnimateIn(true);
    }, 100); // time waiting to begin animations
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  const handleJournalClick = () => {
    if (loggedInUser) {
      navigate("/journal");
    } else {
      navigate("/login");
    }
  };

  const handleCloseModal = () => {
    setSessionTimeOutModal(false);
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.backgroundGradient}></div>
      <div className={styles.contentContainer}>
        <h1 className={styles.title}>
          Welcome{loggedInUser ? `, ${loggedInUser}!` : ""}
        </h1>
        <p className={styles.subtitle}>Any surf today?</p>
        <div className={styles.buttonContainer}>
          <Modal show={sessionTimeOutModal} handleClose={handleCloseModal} />
          <button
            className={`${styles.button} ${animateIn ? styles.animateIn : ""} ${
              loginPressed ? styles.pressed : ""
            }`}
            style={{
              transform: `translateY(${animateIn ? "0" : "20px"}) scale(${
                loginPressed ? "0.95" : "1"
              })`,
              opacity: animateIn ? "1" : "0",
              transitionDelay: animateIn ? "0.1s" : "0s",
            }}
            onClick={() => {
              if (loggedInUser) {
                animatePress(setLoginPressed);
                navigate("/account");
              } else {
                animatePress(setLoginPressed);
                navigate("/login");
              }
            }}
          >
            <div className={styles.buttonContent}>
              {loggedInUser ? (
                <CircleUser color="#E2E8F0" size={24} className={styles.icon} />
              ) : (
                <LogIn color="#E2E8F0" size={24} className={styles.icon} />
              )}
              <span className={styles.buttonText}>
                {loggedInUser ? "Account" : "Login"}
              </span>
            </div>
          </button>
          <button
            className={`${styles.button} ${animateIn ? styles.animateIn : ""} ${
              forecastPressed ? styles.pressed : ""
            }`}
            style={{
              transform: `translateY(${animateIn ? "0" : "28px"}) scale(${
                forecastPressed ? "0.95" : "1"
              })`,
              opacity: animateIn ? "1" : "0",
              transitionDelay: animateIn ? "0.2s" : "0s",
            }}
            onClick={() => navigate("/one-week-view")}
          >
            <div className={styles.buttonContent}>
              <Cloud color="#E2E8F0" size={24} className={styles.icon} />
              <span className={styles.buttonText}>See Forecast</span>
            </div>
          </button>
          <button
            className={`${styles.button} ${animateIn ? styles.animateIn : ""} ${
              journalPressed ? styles.pressed : ""
            }`}
            style={{
              transform: `translateY(${animateIn ? "0" : "40px"}) scale(${
                journalPressed ? "0.95" : "1"
              })`,
              opacity: animateIn ? "1" : "0",
              transitionDelay: animateIn ? "0.3s" : "0s",
            }}
            onClick={handleJournalClick}
          >
            <div className={styles.buttonContent}>
              <BookOpen color="#E2E8F0" size={24} className={styles.icon} />
              <span className={styles.buttonText}>Journal</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
