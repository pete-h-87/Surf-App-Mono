import apiUrl from "../config";

export const getForecast = async (user_id) => {
  try {
    const res = await fetch(`${apiUrl}/api/dbRoute/user/${user_id}`, {
      method: "GET",
      credentials: "include",
    });
    if (res.status === 401) {
      return res;
    }
    const data = await res.json();
    return data;
  } catch (error) {
    return { error };
  }
};

export const getPredictions = async () => {
  try {
    const res = await fetch(`${apiUrl}/api/dbRoute/readPredictions`, {
      method: "GET",
      credentials: "include",
    });
    if (res.status === 401) {
      return res;
    }
    const data = await res.json();
    return data;
  } catch (error) {
    return { error };
  }
};

export const createEntry = async (data) => {
  try {
    const res = await fetch(`${apiUrl}/api/dbRoute/create`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.status === 401) {
      return res;
    }
    return res.json();
  } catch (error) {
    console.error("Error creating forecast3:", error);
    throw error;
  }
};

export const createJournalEntry = async (data) => {
  try {
    const res = await fetch(`${apiUrl}/api/dbRoute/createJournalEntry`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.status === 401) {
      return res;
    }
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    await res.json();
  } catch (err) {
    console.error("Error creating journal entry:", err);
    throw err;
  }
};

export const addReport = async (data) => {
  try {
    const res = await fetch(`${apiUrl}/api/dbRoute/addReport`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.status === 401) {
      return res;
    }
    if (!res.ok) {
      throw new Error("Network response was not ok for updateReport");
    }
    await res.json();
  } catch (err) {
    console.error("Error in adding report1", err);
    throw err;
  }
};

export const updatePrediction = async (data) => {
  try {
    const res = await fetch(`${apiUrl}/api/dbRoute/updatePrediction`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log("index result in front end:", res);
    if (res.status === 401) {
      return res;
    }
    if (!res.ok) {
      throw new Error("Network response was not ok for updatePrediction");
    }
    await res.json();
  } catch (err) {
    console.error("Error in updating prediction1", err);
    throw err;
  }
};

export const deleteEntry = async (forecast_id) => {
  try {
    const res = await fetch(`${apiUrl}/api/dbRoute/deleteEntry`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ forecast_id }),
    });
    console.log("The responsein deleteEntryin index:", res);
    if (res.status === 401) {
      return { status: 401 };
    }
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
    const res = await fetch(`${apiUrl}/api/dbRoute/deleteReport`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ forecast_id }),
    });
    if (res.status === 401) {
      return res;
    }
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
    const res = await fetch(`${apiUrl}/api/mateoWeatherRoutes/threeHourWind`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching wind forecast:", error);
    return { error };
  }
};

export const getThreeHourWaveForecast = async () => {
  try {
    const res = await fetch(`${apiUrl}/api/mateoWeatherRoutes/threeHourWave`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching wave forecast:", error);
    return { error };
  }
};

export const getSixHourWindForecast = async () => {
  try {
    const res = await fetch(`${apiUrl}/api/mateoWeatherRoutes/sixHourWind`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching wind forecast:", error);
    return { error };
  }
};

export const getSixHourWaveForecast = async () => {
  try {
    const res = await fetch(`${apiUrl}/api/mateoWeatherRoutes/sixHourWave`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching wave forecast:", error);
    return { error };
  }
};

export const createNewUser = async (data) => {
  try {
    const res = await fetch(`${apiUrl}/api/userRoute/users/createUser`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error("Network response was not ok for creating USER");
    }
    return res;
  } catch (err) {
    console.error("Error creating new USER:", err);
    throw err;
  }
};

export const loggingInTheUser = async (data) => {
  try {
    const res = await fetch(`${apiUrl}/api/userRoute/users/auth`, {
      //HERE, we are connecting the frontend directly to the route to the backend
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    // if (!res.ok) {
    //   throw new Error("Network response was not ok for finding USER");
    // }
    const result = await res.json();
    console.log("logginInTheUser resposne:", res);
    if (res.ok) {
      window.location.href = result.redirectUrl;
      return result;
    }
    return result;
  } catch (err) {
    console.error("Error finding USER:", err);
    throw err;
  }
};

// STEP SEVEN - since we now have a port that's listening, we can create some utilities that throw
// some http towards that port, with requests to go down certain paths with certain payloads.
// We now create these utilities above, that takes advantage of the API's weve made,
// we will now pass these on to our COMPONENTS and SRC, the interaction part of our app -
// many of these are passed to the GlobalState file to make this data accessable throughout the entire app
