import React, { createContext, useState, useEffect } from "react";
import {
  getForecast,
  getThreeHourWaveForecast,
  getThreeHourWindForecast,
} from "./util";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [journalData, setJournalData] = useState(null);
  const [threeHourWind, setThreeHourWind] = useState(null);
  const [threeHourWave, setThreeHourWave] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sessionTimeOutModal, setSessionTimeOutModal] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(() => {
    // Retrieve the user from localStorage on initial load
    const savedUser = localStorage.getItem("loggedInUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loggedInUserId, setLoggedInUserId] = useState(() => {
    // Retrieve the user ID from localStorage on initial load
    const savedUserId = localStorage.getItem("loggedInUserId");
    return savedUserId ? savedUserId : null;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const journalEntryData = await getForecast();
        const waveData = await getThreeHourWaveForecast();
        const windData = await getThreeHourWindForecast();
        setJournalData(journalEntryData);
        setThreeHourWave(waveData);
        setThreeHourWind(windData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Save the user to localStorage whenever it changes
    if (loggedInUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
      localStorage.setItem("loggedInUserId", loggedInUserId);
    } else {
      localStorage.removeItem("loggedInUser"); // Clear it if user logs out
    }
  }, [loggedInUser, loggedInUserId]);

  console.log("Global page loggedInuser:", loggedInUser);

  return (
    <GlobalContext.Provider
      value={{
        journalData,
        threeHourWind,
        threeHourWave,
        loading,
        error,
        loggedInUser,
        setLoggedInUser,
        loggedInUserId,
        setLoggedInUserId,
        sessionTimeOutModal,
        setSessionTimeOutModal,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
