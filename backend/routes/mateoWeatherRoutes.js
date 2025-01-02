const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/threeHourWind", async (req, res) => {
  try {
    const params = {
      latitude: 58.929889,
      longitude: 9.816022,
      hourly: [
        "temperature_2m",
        "rain",
        "wind_speed_10m",
        "wind_direction_10m",
      ],
      timezone: "Europe/Berlin",
      wind_speed_unit: "ms",
      temporal_resolution: "hourly_3",
    };
    const url = "https://api.open-meteo.com/v1/forecast";
    const response = await axios.get(url, { params });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/threeHourWave", async (req, res) => {
  try {
    const params = {
      latitude: 58.929889,
      longitude: 9.816022,
      hourly: [
        "wave_height",
        "wave_direction",
        "wave_period",
        "wind_wave_height",
        "wind_wave_direction",
        "wind_wave_peak_period",
        "swell_wave_height",
        "swell_wave_direction",
        "swell_wave_period",
        "swell_wave_peak_period",
        "swell_wave_direction",
      ],
      timezone: "Europe/Berlin",
      temporal_resolution: "hourly_3",
      forecast_days: 7,
      
    };
    const url = "https://marine-api.open-meteo.com/v1/marine";
    const response = await axios.get(url, { params });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching three hour wave:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/sixHourWind", async (req, res) => {
  try {
    const params = {
      latitude: 52.52,
      longitude: 13.41,
      hourly: ["temperature_2m", "wind_speed_10m", "wind_direction_10m"],
      timezone: "Europe/Berlin",
      wind_speed_unit: "ms",
      temporal_resolution: "hourly_6",
    };
    const url = "https://api.open-meteo.com/v1/forecast";
    const response = await axios.get(url, { params });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching six hour wind:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/sixHourWave", async (req, res) => {
  try {
    const params = {
      latitude: 58.929889,
      longitude: 9.816022,
      hourly: ["wave_height", "wave_direction", "wave_period"],
      timezone: "Europe/Berlin",
      wind_speed_unit: "ms",
      temporal_resolution: "hourly_6",
    };
    const url = "https://marine-api.open-meteo.com/v1/marine";
    const response = await axios.get(url, { params });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching six hour wave:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
