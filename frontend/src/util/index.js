export const getForecast = async () => {
  try {
    const res = await fetch("/api/dbRoute");
    const data = await res.json();
    return data;
  } catch (error) {
    return { error };
  }
};

export const getPredictions = async () => {
  try {
    const res = await fetch("/api/dbRoute/readPredictions");
    const data = await res.json();
    return data;
  } catch (error) {
    return { error };
  }
};

export const createEntry = async (data) => {
  try {
    const res = await fetch("/api/dbRoute/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (error) {
    console.error("Error creating forecast3:", error);
    throw error;
  }
};

export const createJournalEntry = async (data) => {
  try {
    const res = await fetch("/api/dbRoute/createJournalEntry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await res.json();
  } catch (err) {
    console.error("Error creating journal entry:", err);
    throw err;
  }
};

export const addReport = async (data) => {
  try {
    const res = await fetch("/api/dbRoute/addReport", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error("Network response was not ok for updateReport");
    }
    const result = await res.json();
  } catch (err) {
    console.error("Error in adding report1", err);
    throw err;
  }
};

export const updatePrediction = async (data) => {
  try {
    const res = await fetch(`/api/dbRoute/updatePrediction`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error("Network response was not ok for updatePrediction");
    }
    const result = await res.json();
  } catch (err) {
    console.error("Error in updating prediction1", err);
    throw err;
  }
};

export const deleteEntry = async (forecast_id) => {
  try {
    const res = await fetch(`/api/dbRoute/deleteEntry`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ forecast_id }),
    });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (err) {
    console.error(`Error deleting entry with forecast_id ${forecast_id}:`, err);
    throw err;
  }
};

export const deleteReport = async (forecast_id) => {
  try {
    const res = await fetch(`/api/dbRoute/deleteReport`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ forecast_id }),
    });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (err) {
    console.error(`Error deleting entry with forecast_id ${forecast_id}:`, err);
    throw err;
  }
};

export const getThreeHourWindForecast = async () => {
  try {
    const res = await fetch(`/api/mateoWeatherRoutes/threeHourWind`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching wind forecast:", error);
    return { error };
  }
};

export const getThreeHourWaveForecast = async () => {
  try {
    const res = await fetch(`/api/mateoWeatherRoutes/threeHourWave`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching wave forecast:", error);
    return { error };
  }
};

export const getSixHourWindForecast = async () => {
  try {
    const res = await fetch(`/api/mateoWeatherRoutes/sixHourWind`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching wind forecast:", error);
    return { error };
  }
};

export const getSixHourWaveForecast = async () => {
  try {
    const res = await fetch(`/api/mateoWeatherRoutes/sixHourWave`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching wave forecast:", error);
    return { error };
  }
};
