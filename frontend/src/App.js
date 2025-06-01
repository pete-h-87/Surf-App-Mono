import React from "react";
import { Route, Routes } from "react-router-dom";
import styles from "./styling/App.module.css";
import OneWeekView from "./components/OneWeekView/OneWeekView";
import OneDayView from "./components/OneDayView/OneDayView";
import ThreeHourView from "./components/ThreeHourView/ThreeHourView";
import Journal from "./components/Journal/Journal";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import Account from "./components/Account/Account";

function App() {
  return (
    <div className={styles.App}>
      <Routes>
        <Route path="/homescreen" element={<HomeScreen />} />
        <Route path="/one-week-view" element={<OneWeekView />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
        <Route path="/register" element={<Register />} />
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
