import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import { GlobalContext } from "../../GlobalState";

function Home() {
  const { threeHourWind, threeHourWave } = useContext(GlobalContext);
  const navigate = useNavigate();

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

  // Filter to get every other index starting from the second one
  const days = Array.from({ length: 7 }, (_, dayIndex) => {
    return Array.from({ length: 4 }, (_, threeHourPeriodIndex) => {
      const index = dayIndex * 8 + threeHourPeriodIndex * 2 + 1; // getting every-other index in a 56-itemed array
      return {
        waveHeight: threeHourWave?.hourly.wave_height[index] ?? "...",
        wavePeriod: threeHourWave?.hourly.swell_wave_period[index] ?? "...",
        windDirection: threeHourWind?.hourly.wind_direction_10m[index] ?? "...",
        date: dayjs().add(dayIndex, "day").format("dddd, D MMMM"),
        dayIndex,
      };
    });
  });

  const handleDayClick = (dayIndex, date) => {
    navigate("/one-day-view", { state: { dayIndex, date } });
  };

  return (
    <div className={styles.page}>
      <nav className={styles.navbar}>
        <ul>
          <li>
            <Link to="/journal">Journal</Link>
          </li>
        </ul>
      </nav>
      <h2>Pete's Surf Report</h2>
      {days.map((day, dayIndex) => (
        <div key={dayIndex} className={styles.dayContainer}>
          {/* the 0 is the first three-hour period in the array, could also be 1, 2, 3, and it'd be the same date */}
          <h5>{day[0].date}</h5>
          <div
            className={styles.container}
            onClick={() => handleDayClick(dayIndex, day[0].date)}
          >
            {day.map((sixHourPeriod, periodIndex) => (
              <React.Fragment key={periodIndex}>
                <div
                  className={styles.item}
                  style={{
                    backgroundColor: getBackgroundColor(
                      parseFloat(sixHourPeriod.waveHeight),
                      parseFloat(sixHourPeriod.wavePeriod),
                      parseFloat(sixHourPeriod.windDirection)
                    ),
                  }}
                >
                  <span>
                    {sixHourPeriod.waveHeight}m @{sixHourPeriod.wavePeriod}s
                  </span>
                  <br />
                  <span>
                    Wind{" "}
                    <FontAwesomeIcon
                      icon={faArrowUp}
                      style={{
                        transform: `rotate(${
                          sixHourPeriod.windDirection + 180
                        }deg)`,
                        fontSize: "1em", // Adjust the size of the icon
                        verticalAlign: "middle", // Align the icon vertically
                        marginLeft: "5px", // Add some space between the text and the icon
                      }}
                    />
                  </span>
                </div>
                {periodIndex < day.length - 1 && (
                  <hr className={styles.separator} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
