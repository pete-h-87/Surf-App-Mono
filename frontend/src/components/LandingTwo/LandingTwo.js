import React, { useState, useEffect, useCallback } from "react";
import { LogIn, Cloud, BookOpen } from "lucide-react"; // Using lucide-react for web icons
import styles from "./LandingTwo.module.css"; // Import the CSS module

// Main App component
const LandingTwo = () => {
  // State to manage the current "route" (simulating react-router)
  const [currentRoute, setCurrentRoute] = useState("home");

  // State for animation triggers.
  // These will control the CSS classes that apply animations.
  const [animateIn, setAnimateIn] = useState(false);
  const [loginPressed, setLoginPressed] = useState(false);
  const [forecastPressed, setForecastPressed] = useState(false);
  const [journalPressed, setJournalPressed] = useState(false);

  // Simulate `useRouter` for navigation
  const useRouter = () => {
    return {
      push: (route) => {
        console.log(`Navigating to: /${route}`);
        // In a real application, you'd use a routing library like react-router-dom
        // or update global state for single-page app navigation.
        setCurrentRoute(route);
      },
    };
  };
  const router = useRouter();

  // Spring-like animation for button press using CSS classes
  const animatePress = (setPressedState) => {
    setPressedState(true); // Apply pressed state (scale down)
    setTimeout(() => {
      setPressedState(false); // Remove pressed state (scale back up)
    }, 100); // Short duration for the press effect
  };

  // Navigation handler with animation
  const navigateTo = useCallback(
    (route, setPressedState) => {
      animatePress(setPressedState);
      setTimeout(() => {
        router.push(route);
      }, 200); // Navigate after the animation completes
    },
    [router]
  );

  // Entrance animation effect (runs once on component mount)
  useEffect(() => {
    // Trigger the entrance animation after a short delay
    const timer = setTimeout(() => {
      setAnimateIn(true);
    }, 100); // time waiting to begin animations
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  // Conditional rendering based on the current route
  if (currentRoute !== "home") {
    return (
      <div className={styles.otherPageContainer}>
        <h1 className={styles.otherPageTitle}>
          Welcome to the{" "}
          {currentRoute.charAt(0).toUpperCase() + currentRoute.slice(1)} Page!
        </h1>
        <button
          onClick={() => setCurrentRoute("home")}
          className={styles.backButton}
        >
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div className={styles.appContainer}>
      {/* Background Gradient */}
      <div className={styles.backgroundGradient}></div>

      {/* Content Container */}
      <div className={styles.contentContainer}>
        <h1 className={styles.title}>Welcome</h1>
        <p className={styles.subtitle}>What would you like to do today?</p>

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
            onClick={() => navigateTo("login", setLoginPressed)}
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
            onClick={() => navigateTo("forecast", setForecastPressed)}
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
            onClick={() => navigateTo("journal", setJournalPressed)}
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

export default LandingTwo;
