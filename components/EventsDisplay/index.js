import { useState } from "react";
import classNames from "classnames";
import useWindowDimensions from "hooks/useWindowDimensions";
import { transformDates } from "../../lib/dateUtilities";
import styles from "./EventsDisplay.module.scss";

const EventsDisplay = ({ events, withFilter = false, showingPastEvents }) => {
  const { width, height } = useWindowDimensions();
  const calculateXYPair = () => {
    //account for extra height due to filter
    const y = withFilter
      ? Math.floor(Math.random() * (height - 400) + 200)
      : Math.floor(Math.random() * height - 200);

    const x = Math.floor(Math.random() * (width - 200));
    return [y, x];
  };

  const [topAndLeft, setTopAndLeft] = useState(calculateXYPair());
  const [showImage, setShowImage] = useState(null);

  const pastEventsSubdirectory = showingPastEvents ? "past/" : "";

  const handleMouseEnter = (index) => {
    setTopAndLeft(calculateXYPair());
    setShowImage(index);
  };

  const handleMouseLeave = () => {
    setShowImage(null);
  };

  return (
    <>
      <ul
        className={classNames(styles.eventsList, {
          [styles.eventsPageEventsList]: withFilter,
        })}
      >
        {withFilter
          ? events.map((event, index) => (
              <li key={event.id}>
                <div
                  className={styles.eventRow}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <a href={`/events/${pastEventsSubdirectory}${event.id}`}>
                    <div className={styles.rowContainer}>
                      <img
                        className={styles.mobileImg}
                        src={`/eventImages/${event.img}`}
                        key={`${event.id}`}
                      />
                      <div className={styles.titleAndDate}>
                        {event.title}
                        <div className={styles.dates}>
                          {event.displayText
                            ? event.displayText
                            : transformDates(event.dates)}
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </li>
            ))
          : events.map((event, index) => (
              <li key={event.id}>
                <div
                  className={styles.eventRow}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <a href={`/events/${pastEventsSubdirectory}${event.id}`}>
                    <div className={styles.rowContainer}>
                      <img
                        className={styles.mobileImg}
                        src={`/eventImages/${event.img}`}
                        key={`${event.id}`}
                      />
                      <div className={styles.titleAndDate}>
                        {event.title}
                        <div className={styles.dates}>
                          {event.displayText
                            ? event.displayText
                            : transformDates(event.dates)}
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </li>
            ))}
      </ul>
      <div className={styles.imgContainer}>
        {events.map((event, index) => (
          <img
            className={classNames(styles.eventImage, {
              [styles.showImage]: showImage === index,
            })}
            style={{
              top: `${topAndLeft[0]}px`,
              left: `${topAndLeft[1]}px`,
            }}
            src={`/eventImages/${event.img}`}
            key={`${event.id}`}
          />
        ))}
      </div>
    </>
  );
};

export default EventsDisplay;
