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
    return "linear-gradient(to bottom, rgb(196, 94, 94), rgb(222, 145, 145))"; // onshore report, high-energy & onshore, red gradient
  }
  return "linear-gradient(to bottom, rgb(65, 146, 227), rgb(128, 172, 215))"; // default report, blue - no energy in water
};

export default getBackgroundColor;
