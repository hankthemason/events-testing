import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import Layout from "../../components/Layout";
import PageNameHandwriting from "../../components/PageNameHandwriting";
import { getSortedEvents } from "../../lib/events";
import styles from "./calendar.module.scss";

const EventsCalendar = ({ allEventsData }) => {
  let cleanedEvents = [];
  allEventsData.forEach((event) => {
    event.dates.forEach((date) => {
      cleanedEvents.push({
        title: event.title,
        start: date,
        end: date,
        url: `/events/${event.id}`,
      });
    });
  });

  return (
    <Layout currentPage="Calendar">
      <PageNameHandwriting imageSrc={"/calendar.png"} />
      <div className={styles.calendarContainer}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          editable
          selectable
          initialView="dayGridMonth"
          events={cleanedEvents}
          eventColor={"#FF0F0F"}
          headerToolbar={{
            start: "title", // will normally be on the left. if RTL, will be on the right
            center: "",
            end: "prev,next", // will normally be on the right. if RTL, will be on the left
          }}
          buttonText={{
            today: null,
            month: "month",
            week: "week",
            day: "day",
            list: "list",
          }}
        />
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  const allEventsData = getSortedEvents();
  return {
    props: {
      allEventsData,
    },
  };
}

export default EventsCalendar;
