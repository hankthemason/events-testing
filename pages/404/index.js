import Layout from "../../components/Layout";
import styles from "./404.module.scss";

export default function Custom404() {
  return (
    <Layout>
      <div className={styles.main}>
        the page you are looking for does not exist :-(
      </div>
    </Layout>
  );
}
