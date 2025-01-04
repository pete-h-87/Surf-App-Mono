const getBackgroundColor = (waveHeight, wavePeriod, windDirection) => {
  if (
    waveHeight > 0.8 &&
    wavePeriod > 5 &&
    windDirection > -1 &&
    windDirection <= 120
  ) {
    return "rgb(123, 219, 123)"; // good report, high-engery & offhsore, green
  }
  if (
    waveHeight > 0.8 &&
    wavePeriod > 5 &&
    windDirection >= 290 &&
    windDirection <= 360
  ) {
    return "rgb(123, 219, 123)"; // good report, high-engery & offhsore, green
  }
  if (
    waveHeight < 0.8 &&
    wavePeriod > 5 &&
    windDirection > -1 &&
    windDirection <= 120
  ) {
    return "rgb(255, 184, 112)"; // questionable report, low energy & offhsore, orange
  }
  if (
    waveHeight < 0.8 &&
    wavePeriod > 5 &&
    windDirection >= 290 &&
    windDirection <= 361
  ) {
    return "rgb(255, 184, 112)"; // questionable report, low energy & offhsore, orange
  }
  if (
    waveHeight > 0.8 &&
    wavePeriod > 5 &&
    windDirection > 120 &&
    windDirection < 290
  ) {
    return "rgb(254, 149, 149)"; // onshore report, high-engery & onshore, red
  }
  return "rgb(92, 173, 255)"; // default report, blue - no energy in water
};

export default getBackgroundColor;