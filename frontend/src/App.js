import React from "react";
import {
  Route,
  Routes,
} from "react-router-dom";
import styles from "./styling/App.module.css";
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