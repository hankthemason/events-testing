import Link from "next/link";
import { transformDates } from "../../lib/dateUtilities";
import styles from "./event.module.scss";

const filters = [
  "all",
  "shows",
  "workshops",
  "classes",
  "special events",
  "past",
];

export default function Event({ eventData }) {
  const text = eventData.contentHtml;
  return (
    <div className={styles.eventContainer}>
      <div className={styles.title}>{eventData.title}</div>
      <div className={styles.dates}>
        {eventData.displayText
          ? eventData.displayText
          : transformDates(eventData.dates)}
      </div>
      <div className={styles.tickets}>
        <Link href={eventData.eventBrite}>Tickets</Link>
      </div>
      <img
        src={`/eventImages/${eventData.img}`}
        className={styles.eventImage}
      />
      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: eventData.contentHtml }}
      />
    </div>
  );
}
