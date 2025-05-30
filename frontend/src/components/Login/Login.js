import React, { useContext, useState, useEffect } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { LogIn, Cloud, BookOpen } from "lucide-react"; // Using lucide-react for web icons
import { Link } from "react-router-dom";
import { loggingInTheUser } from "../../util";
import { GlobalContext } from "../../GlobalState";

export const Login = () => {
  const { setLoggedInUser, setLoggedInUserId, loggedInUserId } =
    useContext(GlobalContext);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    try {
      const response = await loggingInTheUser(data);
      console.log("handle submit try/catch userID RESPONSE XXXX:", response);

      setLoggedInUser(response.user.name);

      setLoggedInUserId(response.user.id);
      console.log("response user id MMMMM:", response.user.id);
    } catch (err) {
      console.log(err);
    }
  };

  // return (
  //   <div className={styles.page}>
  //     <nav className={styles.navbar}>
  //       <ul>
  //         <li>
  //           <Link to="/homescreen">Back</Link>
  //         </li>
  //         <li>
  //           <Link to="/register">Register</Link>
  //         </li>
  //       </ul>
  //     </nav>
  //     <form onSubmit={handleSubmit}>
  //       <div>
  //         <label>Email</label>
  //         <input name="email" required />
  //       </div>
  //       <div>
  //         <label>Password</label>
  //         <input name="password" required />
  //       </div>
  //       <button type="submit">Login</button>
  //     </form>
  //   </div>
  // );

  return (
    <div className={styles.appContainer}>
      {/* Background Gradient */}
      <div className={styles.backgroundGradient}></div>
      {/* Content Container */}
      <div className={styles.contentContainer}>
        <h1 className={styles.title}>Welcome</h1>
        <p className={styles.subtitle}>Any surf today?</p>
        {/* Button Container */}
        <div className={styles.buttonContainer}>
          {/* Login Button */}
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
              animatePress(setLoginPressed);
              navigate("/login");
            }}
          >
            <div className={styles.buttonContent}>
              <LogIn color="#E2E8F0" size={24} className={styles.icon} />
              <span className={styles.buttonText}>Login</span>
            </div>
          </button>
          {/* See Forecast Button */}
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
            onClick={() => navigate("/")}
          >
            <div className={styles.buttonContent}>
              <Cloud color="#E2E8F0" size={24} className={styles.icon} />
              <span className={styles.buttonText}>See Forecast</span>
            </div>
          </button>
          {/* Journal Button */}
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
            onClick={() => navigate("/journal")}
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
