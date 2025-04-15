import React, { useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../GlobalState";
import styles from "./OneDayView.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import getBackgroundColor from "../../util/colorCoding";

function OneDayView() {
  const location = useLocation();
  const { dayIndex, date } = location.state || {};
  const { threeHourWind, threeHourWave } = useContext(GlobalContext);

  const navigate = useNavigate();

  if (dayIndex === undefined || !threeHourWind || !threeHourWave) {
    return <div>No data available</div>;
  }

  const dayForecast = Array.from({ length: 8 }, (_, threeHourPeriodIndex) => ({
    waveHeight:
      threeHourWave.hourly.waveHeight[dayIndex * 8 + threeHourPeriodIndex].toFixed(2),
    wavePeriod:
      threeHourWave.hourly.swellWavePeriod[dayIndex * 8 + threeHourPeriodIndex].toFixed(2),
    waveDirection:
      threeHourWave.hourly.swellWaveDirection[
        dayIndex * 8 + threeHourPeriodIndex
      ],
    windSpeed:
      threeHourWind.hourly.windSpeed10m[dayIndex * 8 + threeHourPeriodIndex].toFixed(2),
    windDirection:
      threeHourWind.hourly.windDirection10m[
        dayIndex * 8 + threeHourPeriodIndex
      ],
  }));

  const handleThreeHourClick = (threeHourPeriodIndex) => {
    navigate("/three-hour-view", {
      state: { threeHourPeriodIndex, date, dayIndex },
    });
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
            <Link to="/login">Log In</Link>
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
                  />{" "}
                  |
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
