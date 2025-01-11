const { fetchWeatherApi } = require("openmeteo");
const express = require("express");
const router = express.Router();

router.get("/threeHourWind", async (req, res) => {
  try {
    const params = {
      latitude: 59,
      longitude: 10.0333,
      hourly: [
        "temperature_2m",
        "precipitation",
        "wind_speed_10m",
        "wind_direction_10m",
      ],
      wind_speed_unit: "ms",
    };
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);

    // Helper function to form time ranges
    const range = (start, stop, step) =>
      Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];

    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();

    const hourly = response.hourly();

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
      hourly: {
        time: range(
          Number(hourly.time()),
          Number(hourly.timeEnd()),
          hourly.interval()
        ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
        temperature2m: hourly.variables(0).valuesArray(),
        precipitation: hourly.variables(1).valuesArray(),
        windSpeed10m: hourly.variables(2).valuesArray(),
        windDirection10m: hourly.variables(3).valuesArray(),
      },
    };

    res.json(weatherData);
  } catch (error) {
    console.log("error HERE");
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
    const responses = await fetchWeatherApi(url, params);

    // Helper function to form time ranges
    const range = (start, stop, step) =>
      Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];

    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();

    const hourly = response.hourly();

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
      hourly: {
        time: range(
          Number(hourly.time()),
          Number(hourly.timeEnd()),
          hourly.interval()
        ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
        waveHeight: hourly.variables(0).valuesArray(),
        waveDirection: hourly.variables(1).valuesArray(),
        wavePeriod: hourly.variables(2).valuesArray(),
        windWaveHeight: hourly.variables(3).valuesArray(),
        windWaveDirection: hourly.variables(4).valuesArray(),
        windWavePeakPeriod: hourly.variables(5).valuesArray(),
        swellWaveHeight: hourly.variables(6).valuesArray(),
        swellWaveDirection: hourly.variables(7).valuesArray(),
        swellWavePeriod: hourly.variables(8).valuesArray(),
        swellWavePeakPeriod: hourly.variables(9).valuesArray(),
      },
    };

    res.json(weatherData);
  } catch (error) {
    console.error("Error fetching three hour wave:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;