import apiUrl from "../config";

export const getForecast = async () => {
  try {
    const res = await fetch(`${apiUrl}/api/forecast`);
    const data = await res.json();
    // console.log("db data", data);
    return data;
  } catch (error) {
    return { error };
  }
};

export const getPredictions = async () => {
  try {
    const res = await fetch(`${apiUrl}/api/forecast/readPredictions`);
    const data = await res.json();
    // console.log("predictions data:", data);
    return data;
  } catch (error) {
    return { error };
  }
};

export const createEntry = async (data) => {
  try {
    const res = await fetch(`${apiUrl}/api/forecast/create`, {
      //this api route naming is crucial - must be the same as step 5, with your routes page
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res.json(); // here, by removing the .json(), you are leaving the response unparsed.
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
    console.log("Journal entry created:", result); // Close the modal after submission
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
    console.log("report is updated", result);
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
    console.log("prediction1 is updated", result);
  } catch (err) {
    console.error("Error in updating prediction1", err);
    throw err;
  }
};



export const deleteEntry = async (forecast_id) => {
  try {
    const res = await fetch(`${apiUrl}/api/forecast/deleteEntry`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ forecast_id}),
    });
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    console.log(`Entry with forecast_id EE ${forecast_id} deleted`);
  } catch (err) {
    console.error(`Error deleting entry with forecast_id ${forecast_id}:`, err);
    throw err;
  }
};

export const deleteReport = async (forecast_id) => {
  try {
    const res = await fetch(`${apiUrl}/api/forecast/deleteReport`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ forecast_id}),
    });
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    console.log(`Entry with forecast_id RR ${forecast_id} deleted`);
  } catch (err) {
    console.error(`Error deleting entry with forecast_id ${forecast_id}:`, err);
    throw err;
  }
};



export const getThreeHourWindForecast = async () => {
  try {
    const res = await fetch(`${apiUrl}/api/forecast/threeHourWind`);
    const data = await res.json();
    console.log("three hour wind data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching wind forecast:", error);
    return { error };
  }
};

export const getThreeHourWaveForecast = async () => {
  try {
    const res = await fetch(`${apiUrl}/api/forecast/threeHourWave`);
    const data = await res.json();
    console.log("three hour wave data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching wave forecast:", error);
    return { error };
  }
};

export const getSixHourWindForecast = async () => {
  try {
    const res = await fetch(`${apiUrl}/api/forecast/sixHourWind`);
    const data = await res.json();
    console.log("six hour wind data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching wind forecast:", error);
    return { error };
  }
};

export const getSixHourWaveForecast = async () => {
  try {
    const res = await fetch(`${apiUrl}/api/forecast/sixHourWave`);
    const data = await res.json();
    console.log("six hour wave data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching wave forecast:", error);
    return { error };
  }
};

// STEP SEVEN - since we now have a port that's listening, we can create some utilities that throw
// some http towards that port, with requests to go down certain paths with certain payloads.
// We now create these utilities above, that takes advantage of the API's weve made,
// we will now pass these on to the VIEW, the interaction part of our app
