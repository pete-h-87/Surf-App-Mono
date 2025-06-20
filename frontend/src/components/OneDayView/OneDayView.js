import React, { useContext, useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../GlobalState";
import styles from "./OneDayView.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import getBackgroundColor from "../../util/colorCoding";
import { ArrowLeftToLine } from "lucide-react";

function OneDayView() {
  const [animateIn, setAnimateIn] = useState(false);

  const location = useLocation();
  const { dayIndex, date } = location.state || {};
  const { threeHourWind, threeHourWave, loggedInUser } =
    useContext(GlobalContext);

  const navigate = useNavigate();

  useEffect(() => {
    // Trigger the entrance animation after a short delay
    const timer = setTimeout(() => {
      setAnimateIn(true);
    }, 10); // time waiting to begin animations
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  if (dayIndex === undefined || !threeHourWind || !threeHourWave) {
    return <div>No data available</div>;
  }

  const dayForecast = Array.from({ length: 8 }, (_, threeHourPeriodIndex) => ({
    waveHeight:
      threeHourWave.hourly.waveHeight[
        dayIndex * 8 + threeHourPeriodIndex
      ].toFixed(2),
    wavePeriod:
      threeHourWave.hourly.swellWavePeriod[
        dayIndex * 8 + threeHourPeriodIndex
      ].toFixed(2),
    waveDirection:
      threeHourWave.hourly.swellWaveDirection[
        dayIndex * 8 + threeHourPeriodIndex
      ],
    windSpeed:
      threeHourWind.hourly.windSpeed10m[
        dayIndex * 8 + threeHourPeriodIndex
      ].toFixed(2),
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
          <li className={styles.arrowContainer}>
            <Link to="/one-week-view" state={{ dayIndex, date }}>
            <ArrowLeftToLine color="#E2E8F0" size={16} className={styles.icon} />
              {" " + "Week"}
            </Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            {loggedInUser ? (
              <Link to="/account">Account</Link>
            ) : (
              <Link to="/login">Login</Link>
            )}
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
            <div
              style={{
                opacity: animateIn ? "1" : "0",
                transition: "opacity 0.5s ease-in-out",
                transitionDelay: animateIn ? `${index * 0.1}s` : 0,
                justifyItems: "center",              }}
            >
              <div
                key={index}
                className={styles.session}
                style={{
                  background: getBackgroundColor(
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