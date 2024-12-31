import React from "react";
import {
  Route,
  Routes,
} from "react-router-dom";
import styles from "./styling/App.module.css"; // Import the CSS module
import Home from "./components/Home/Home";
import OneDayView from "./components/OneDayView/OneDayView";
import ThreeHourView from "./components/ThreeHourView/ThreeHourView";
import Journal from "./components/Jounral/Journal";

function App() {

  return (
    <div className={styles.App}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/one-day-view" element={<OneDayView />} />
        <Route path="/three-hour-view" element={<ThreeHourView />} />
        <Route path="/journal" element={<Journal />} />
      </Routes>
    </div>
  );
}

export default App;

// STEP EIGHT - we can now set our functions into our handlers,
// for the specific actions the user may take
// - NOTE - for this app, we didn't pass the functions here - we passed them to the GlobalState, and had App.js be a child wrapped by the global state, which provides access to the information recieved by our functions throughout the entire app
// you can see this at the top of our front end in index.js
