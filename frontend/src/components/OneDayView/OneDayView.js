import React, { useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../GlobalState";
import styles from "./OneDayView.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

function OneDayView() {
  const location = useLocation();
  const { dayIndex, date } = location.state || {};
  const { threeHourWind, threeHourWave } = useContext(GlobalContext);

  const navigate = useNavigate();

  if (dayIndex === undefined || !threeHourWind || !threeHourWave) {
    return <div>No data available</div>;
  }

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

  const dayForecast = Array.from({ length: 8 }, (_, threeHourPeriodIndex) => ({
    waveHeight:
      threeHourWave.hourly.wave_height[dayIndex * 8 + threeHourPeriodIndex],
    wavePeriod:
      threeHourWave.hourly.swell_wave_period[
        dayIndex * 8 + threeHourPeriodIndex
      ],
    waveDirection:
      threeHourWave.hourly.swell_wave_direction[dayIndex * 8 + threeHourPeriodIndex],
    windSpeed:
      threeHourWind.hourly.wind_speed_10m[dayIndex * 8 + threeHourPeriodIndex],
    windDirection:
      threeHourWind.hourly.wind_direction_10m[
        dayIndex * 8 + threeHourPeriodIndex
      ],
  }));

  const handleThreeHourClick = (threeHourPeriodIndex) => {
    navigate("/three-hour-view", { state: { threeHourPeriodIndex, date, dayIndex } });
  };

  return (
    <div className={styles.page}>
              <nav className={styles.navbar}>
                <ul>
                  <li>
                    <Link to="/">Back</Link>
                  </li>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                  <Link to="/journal">Journal</Link>
                  </li>
                </ul>
              </nav>
      <h2>{date}</h2>
      <div className={styles.container}>
        {dayForecast.map((forecast, index) => (
          <React.Fragment key={index}>
            <h5>
              {index * 3}:00 - {index * 3 + 3}:00
            </h5>
            <div>
              <div
                key={index}
                className={styles.session}
                style={{
                  backgroundColor: getBackgroundColor(
                    parseFloat(forecast.waveHeight),
                    parseFloat(forecast.wavePeriod),
                    parseFloat(forecast.windDirection)
                  ),
                }}
                onClick={() => handleThreeHourClick(index)}
              >
                <span>
                  Swell: {forecast.waveHeight}m @ {forecast.wavePeriod} s
                  <FontAwesomeIcon
                    icon={faArrowUp}
                    style={{
                      transform: `rotate(${forecast.waveDirection + 180}deg)`,
                      fontSize: "1em",
                      verticalAlign: "middle",
                      marginLeft: "5px",
                    }}
                  /> |
                </span>
                <span>
                  | Wind: {forecast.windSpeed} m/s
                  <FontAwesomeIcon
                    icon={faArrowUp}
                    style={{
                      transform: `rotate(${forecast.windDirection + 180}deg)`,
                      fontSize: "1em",
                      verticalAlign: "middle",
                      marginLeft: "5px",
                    }}
                  />
                </span>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default OneDayView;
