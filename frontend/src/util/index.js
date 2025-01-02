import apiUrl from "../config";

export const getForecast = async () => {
  try {
    const res = await fetch(`${apiUrl}/api/forecast`);
    const data = await res.json();
    return data;
  } catch (error) {
    return { error };
  }
};

export const getPredictions = async () => {
  try {
    const res = await fetch(`${apiUrl}/api/forecast/readPredictions`);
    const data = await res.json();
    return data;
  } catch (error) {
    return { error };
  }
};

export const createEntry = async (data) => {
  try {
    const res = await fetch(`${apiUrl}/api/forecast/create`, {
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
    const res = await fetch(`${apiUrl}/api/forecast/createJournalEntry`, {
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
    const res = await fetch(`${apiUrl}/api/forecast/addReport`, {
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
    const res = await fetch(`${apiUrl}/api/forecast/updatePrediction`, {
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
    const res = await fetch(`${apiUrl}/api/forecast/deleteEntry`, {
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
    const res = await fetch(`${apiUrl}/api/forecast/deleteReport`, {
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
    const res = await fetch(`${apiUrl}/api/proxy/threeHourWind`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching wind forecast:", error);
    return { error };
  }
};

export const getThreeHourWaveForecast = async () => {
  try {
    const res = await fetch(`${apiUrl}/api/proxy/threeHourWave`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching wave forecast:", error);
    return { error };
  }
};

export const getSixHourWindForecast = async () => {
  try {
    const res = await fetch(`${apiUrl}/api/proxy/sixHourWind`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching wind forecast:", error);
    return { error };
  }
};

export const getSixHourWaveForecast = async () => {
  try {
    const res = await fetch(`${apiUrl}/api/proxy/sixHourWave`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching wave forecast:", error);
    return { error };
  }
};