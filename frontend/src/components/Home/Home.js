import React, { useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import { GlobalContext } from "../../GlobalState";
import getBackgroundColor from "../../util/colorCoding";

function Home() {
  const { threeHourWind, threeHourWave, loggedInUser } = useContext(GlobalContext);
  const navigate = useNavigate();

  // Filter to get every other index starting from the second one
  const days = Array.from({ length: 7 }, (_, dayIndex) => { // the first arg in this callback is _, because we are creating the skelelton of an array first, to be mapped over later and populated.  but as of now, there is no element to process, so it's blank
    return Array.from({ length: 4 }, (_, sixHourPeriodIndex) => {
      const index = dayIndex * 8 + sixHourPeriodIndex * 2 + 1; // getting every-other index in a 56-itemed array
      return {
        waveHeight: threeHourWave?.hourly.waveHeight[index]
          ? parseFloat(threeHourWave.hourly.waveHeight[index].toFixed(2))
          : "...",
        wavePeriod: threeHourWave?.hourly.swellWavePeriod[index]
          ? parseFloat(threeHourWave.hourly.swellWavePeriod[index].toFixed(2))
          : "...",
        windDirection: threeHourWind?.hourly.windDirection10m[index]
          ? threeHourWind.hourly.windDirection10m[index]
          : "...",
        date: dayjs().add(dayIndex, "day").format("dddd, D MMMM"),
        dayIndex,
      };
    });
  });

  // it is waiting for the .map to give it the index information it needs to calculate the exact index number of the item we need in the forecast array we recieve back from the API call.  it's 56 items (7 days, 8 periods in a day).

  const handleDayClick = (dayIndex, date) => {
    navigate("/one-day-view", { state: { dayIndex, date } });
  };

  console.log("the logged in user at HOME.js:", loggedInUser)

  useEffect(() => {
    if (loggedInUser) {
      console.log("User logged in:", loggedInUser);
      // Perform any side effects here
    }
  }, [loggedInUser]); // Runs whenever loggedInUser changes

  return (
    <div className={styles.page}>
      <nav className={styles.navbar}>
        <ul>
          <li>
            <Link to="/journal">Journal</Link>
          </li>
          <li>
            {loggedInUser ? (
              <Link to="/login">LOGIN</Link>
            ) : (
              <Link to="/login">Log In</Link>
            )}
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
            {day.map((sixHourPeriod, quarterDayIndex) => (
              <React.Fragment key={quarterDayIndex}>
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
                {quarterDayIndex < day.length - 1 && (
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
