import React, { useContext, useState, useEffect } from "react";
import styles from "./Account.module.css";
import { useNavigate } from "react-router-dom";
import { LogOut, House, Cloud, BookOpen } from "lucide-react"; // Using lucide-react for web icons
import { Link } from "react-router-dom";
import { loggingInTheUser } from "../../util";
import { GlobalContext } from "../../GlobalState";

const Account = () => {
  const { setLoggedInUser, setLoggedInUserId, loggedInUserId, loggedInUser } =
    useContext(GlobalContext);

  const [animateIn, setAnimateIn] = useState(false);
  const [loginPressed, setLoginPressed] = useState(false);
  const [forecastPressed, setForecastPressed] = useState(false);
  const [journalPressed, setJournalPressed] = useState(false);

  const navigate = useNavigate();

  function logout() {
    setLoggedInUser(null);
    setLoggedInUserId(null);
  }

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

  return (
    <div>
      <div className={styles.appContainer}>
        <div className={styles.backgroundGradient}></div>
        <div className={styles.contentContainer}>
          <h1 className={styles.title}>Account</h1>
          <p className={styles.subtitle}></p>
          <h3>{loggedInUser}</h3>
          <div className={styles.buttonContainer}>{/* Login Button */}</div>
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.buttonContainer}>
            {/* Register Button */}
            <button
              className={`${styles.button} ${
                animateIn ? styles.animateIn : ""
              } ${journalPressed ? styles.pressed : ""}`}
              style={{
                transform: `translateY(${animateIn ? "0" : "40px"}) scale(${
                  journalPressed ? "0.95" : "1"
                })`,
                opacity: animateIn ? "1" : "0",
                transitionDelay: animateIn ? "0.1s" : "0s",
              }}
              onClick={() => {
                navigate("/journal");
              }}
            >
              <div className={styles.buttonContent}>
                <BookOpen color="#E2E8F0" size={24} className={styles.icon} />
                <span className={styles.buttonText}>Journal</span>
              </div>
            </button>
            <button
              className={`${styles.button} ${
                animateIn ? styles.animateIn : ""
              } ${journalPressed ? styles.pressed : ""}`}
              style={{
                transform: `translateY(${animateIn ? "0" : "40px"}) scale(${
                  journalPressed ? "0.95" : "1"
                })`,
                opacity: animateIn ? "1" : "0",
                transitionDelay: animateIn ? "0.2s" : "0s",
              }}
              onClick={() => {
                navigate("/");
              }}
            >
              <div className={styles.buttonContent}>
                <House color="#E2E8F0" size={24} className={styles.icon} />
                <span className={styles.buttonText}>Home Page</span>
              </div>
            </button>
            <button
              className={`${styles.button} ${
                animateIn ? styles.animateIn : ""
              } ${journalPressed ? styles.pressed : ""}`}
              style={{
                transform: `translateY(${animateIn ? "0" : "40px"}) scale(${
                  journalPressed ? "0.95" : "1"
                })`,
                opacity: animateIn ? "1" : "0",
                transitionDelay: animateIn ? "0.3s" : "0s",
              }}
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              <div className={styles.buttonContent}>
                <LogOut color="#E2E8F0" size={24} className={styles.icon} />
                <span className={styles.buttonText}>Logout</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
