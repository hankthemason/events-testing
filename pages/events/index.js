import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import EventsNavBar from "../../components/EventsNavBar";
import EventsDisplay from "../../components/EventsDisplay";
import PageNameHandwriting from "../../components/PageNameHandwriting";
import EventsDropdown from "../../components/EventsDropdown";
import { getSortedEvents } from "../../lib/events";
import { unslugify } from "lib/strings";

const EVENT_SELECTIONS = [
  "all",
  "shows",
  "workshops",
  "classes",
  "special events",
  "past",
];

const Events = ({ currentEvents, pastEvents }) => {
  const router = useRouter();
  const [currentEventSelection, setCurrentEventSelection] = useState(
    EVENT_SELECTIONS[0]
  );
  const [displayedEvents, setDisplayedEvents] = useState(currentEvents);

  const handleFilter = (eventType) => {
    setCurrentEventSelection(eventType);
  };

  const { query } = useRouter();

  useEffect(() => {
    if (Object.keys(query).length > 0) {
      setCurrentEventSelection(unslugify(query.type));
    }

    if (currentEventSelection === "all") {
      setDisplayedEvents(currentEvents);
    } else if (currentEventSelection === "past") {
      setDisplayedEvents(pastEvents);
    } else {
      setDisplayedEvents(
        currentEvents.filter((event) => {
          return event.tag === currentEventSelection;
        })
      );
    }
  }, [query, currentEventSelection]);

  return (
    <Layout currentPage="Events">
      <PageNameHandwriting imageSrc={"/events.png"} />
      <EventsDropdown
        handleFilterSelection={handleFilter}
        menuItems={EVENT_SELECTIONS}
        currentEventSelection={currentEventSelection}
      />
      <EventsNavBar
        eventsData={displayedEvents}
        currentEventSelection={currentEventSelection}
        handleFilterSelection={handleFilter}
        filters={EVENT_SELECTIONS}
      />
      <EventsDisplay
        events={displayedEvents}
        withFilter
        filterEventHandler={handleFilter}
        showingPastEvents={currentEventSelection === "past"}
      />
    </Layout>
  );
};

export async function getStaticProps() {
  const currentEvents = getSortedEvents("current");
  const pastEvents = getSortedEvents("past");
  return {
    props: {
      currentEvents,
      pastEvents,
    },
  };
}

export default Events;
