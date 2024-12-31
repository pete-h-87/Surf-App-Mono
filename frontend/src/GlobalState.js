import React, { createContext, useState, useEffect } from 'react';
import { getForecast, getThreeHourWaveForecast, getThreeHourWindForecast } from './util';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [journalData, setJournalData] = useState(null);
  const [threeHourWind, setThreeHourWind] = useState(null);
  const [threeHourWave, setThreeHourWave] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <GlobalContext.Provider value={{ journalData, threeHourWind, threeHourWave, loading, error }}>
      {children}
    </GlobalContext.Provider>
  );
};