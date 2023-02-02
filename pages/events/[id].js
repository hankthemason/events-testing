import Event from "../../components/Event";
import Layout from "../../components/Layout";
import EventsNavBar from "../../components/EventsNavBar";
import { getCurrentEventIds, getEventData } from "../../lib/events";

const filters = [
  "all",
  "shows",
  "workshops",
  "classes",
  "special events",
  "past",
];

export default function CurrentEvent({ eventData }) {
  return (
    <Layout>
      <EventsNavBar filters={filters} />
      <Event eventData={eventData}></Event>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getCurrentEventIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const isCurrent = true;
  const eventData = await getEventData(params.id, isCurrent);
  return {
    props: {
      eventData,
    },
  };
}
