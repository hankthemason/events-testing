import { getNextEvents } from "../lib/events";
import Layout from "../components/Layout";
import PageNameHandwriting from "../components/PageNameHandwriting";
import styles from "./home.module.scss";
import EventsDisplay from "../components/EventsDisplay";

const EVENT_DISPLAY_LIMIT = 3;

const Home = ({ nextThreeEvents }) => {
  return (
    <Layout currentPage={"Home"}>
      <PageNameHandwriting imageSrc={"/coming-up.png"} />
      <div className={styles.spacer} />
      <EventsDisplay events={nextThreeEvents} containsImages />
    </Layout>
  );
};

export async function getStaticProps() {
  const nextThreeEvents = getNextEvents("current", EVENT_DISPLAY_LIMIT);
  return {
    props: {
      nextThreeEvents,
    },
  };
}

export default Home;
