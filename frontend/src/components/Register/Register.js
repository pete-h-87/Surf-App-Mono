import React, { useContext, useState, useEffect } from "react";
import styles from "./Register.module.css";
import { Link } from "react-router-dom";
import { FilePen } from "lucide-react"; // Using lucide-react for web icons
import { useNavigate } from "react-router-dom";
import { createNewUser } from "../../util";

export const Register = () => {
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
    }, 10); // Short duration for the press effect
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      password: formData.get("password"),
      email: formData.get("email"),
    };
    console.log(data);
    try {
      await createNewUser(data);
    } catch (err) {
      console.log(err);
    }
    navigate("/login");
  };

  useEffect(() => {
    // Trigger the entrance animation after a short delay
    const timer = setTimeout(() => {
      setAnimateIn(true);
    }, 10); // time waiting to begin animations
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <div>
      <nav className={styles.navbar}>
        <ul>
          <li>
            <Link to="/homescreen">Back</Link>
          </li>
        </ul>
      </nav>
      <div className={styles.appContainer}>
        <div className={styles.backgroundGradient}></div>
        <div className={styles.contentContainer}>
          <h1 className={styles.title}>Register new user</h1>
          <p className={styles.subtitle}></p>
          <div className={styles.buttonContainer}>
            <form
              name="login"
              action="/register"
              onSubmit={handleSubmit}
              method="POST"
            >
              <div>
                <label className={styles.label}>Name</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div>
                <label className={styles.label}>Email</label>
                <input type="text" id="email" name="email" required />
              </div>
              <div>
                <label className={styles.label}>Password</label>
                <input type="text" id="password" name="password" required />
              </div>
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
              >
                <div className={styles.buttonContent}>
                  <FilePen color="#E2E8F0" size={24} className={styles.icon} />
                  <span className={styles.buttonText}>Register</span>
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
