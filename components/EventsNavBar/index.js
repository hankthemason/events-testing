import Link from "next/link";
import classNames from "classnames";
import { slugify } from "lib/strings";
import styles from "./EventsNavBar.module.scss";

const EventsNavBar = ({ currentEventSelection, filters }) => {
  const renderFilters = () => (
    <div className={styles.filterContainer}>
      {filters.map((filter) => (
        <Link
          key={filter}
          className={classNames(styles.filterLabel, {
            [styles.selected]: filter === currentEventSelection,
          })}
          href={`/events?type=${slugify(filter)}`}
        >
          {filter}
        </Link>
      ))}
    </div>
  );

  return <div>{renderFilters()}</div>;
};

export default EventsNavBar;
