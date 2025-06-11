import React, { useContext, useState, useEffect } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { LogIn, FilePen, House } from "lucide-react"; // Using lucide-react for web icons
import { Link } from "react-router-dom";
import { loggingInTheUser } from "../../util";
import { GlobalContext } from "../../GlobalState";
import Modal from "./Modal/LoginModal";

export const Login = () => {
  const { setLoggedInUser, setLoggedInUserId, loggedInUserId } =
    useContext(GlobalContext);

  const [showModal, setShowModal] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [loginPressed, setLoginPressed] = useState(false);
  const [forecastPressed, setForecastPressed] = useState(false);
  const [journalPressed, setJournalPressed] = useState(false);

  const navigate = useNavigate();

  const handleModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    try {
      const response = await loggingInTheUser(data);
      console.log("Login res:", response);
      if (
        response.message === "Invalid password" ||
        response.message === "Email not found"
      ) {
        setShowModal(true);
        return;
      }
      setLoggedInUser(response.user.name);
      setLoggedInUserId(response.user.id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className={styles.appContainer}>
        <div className={styles.backgroundGradient}></div>
        <div className={styles.contentContainer}>
          <h1 className={styles.title}>Login</h1>
          <p className={styles.subtitle}></p>
          <div className={styles.buttonContainer}>
            {/* Login Button */}
            <form onSubmit={handleSubmit}>
              <div>
                <label className={styles.label}>Email</label>
                <input name="email" required />
              </div>
              <div>
                <label className={styles.label}>Password</label>
                <input name="password" required />
              </div>
              <button
                className={`${styles.button} ${
                  animateIn ? styles.animateIn : ""
                } ${loginPressed ? styles.pressed : ""}`}
                type="submit"
                style={{
                  transform: `translateY(${animateIn ? "0" : "20px"}) scale(${
                    loginPressed ? "0.95" : "1"
                  })`,
                  opacity: animateIn ? "1" : "0",
                  transitionDelay: animateIn ? "0.1s" : "0s",
                }}
                onClick={() => {
                  animatePress(setLoginPressed);
                  navigate("/login");
                }}
              >
                <div className={styles.buttonContent}>
                  <LogIn color="#E2E8F0" size={24} className={styles.icon} />
                  <span className={styles.buttonText}>Login</span>
                </div>
              </button>
            </form>
          </div>
        </div>
        <Modal
          show={showModal}
          handleClose={handleCloseModal}
          // handleSubmit={handleSubmit}
          // twelveScreenshot={twelveScreenshot}
          // liveScreenShot={liveScreenShot}
          // currentData={currentData}
        />
        <div className={styles.contentContainer}>
          <p className={styles.subtitle}>New user? Register below</p>
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
              onClick={() => navigate("/register")}
            >
              <div className={styles.buttonContent}>
                <FilePen color="#E2E8F0" size={24} className={styles.icon} />
                <span className={styles.buttonText}>Register</span>
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
          </div>
        </div>
      </div>
    </div>
  );
};
