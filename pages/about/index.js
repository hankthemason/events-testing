import Layout from "../../components/Layout";
import CenteredTextLayout from "components/CenteredTextLayout";
import aboutItems from "./aboutItems.json";

const About = () => {
  return (
    <Layout currentPage="About">
      <CenteredTextLayout items={aboutItems} />
    </Layout>
  );
};

export default About;
