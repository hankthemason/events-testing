import Link from "next/link";
import Layout from "../../components/Layout";
import CenteredTextLayout from "components/CenteredTextLayout";
import contactItems from "./contactItems.json";
import styles from "./contact.module.scss";

const Contact = () => {
  return (
    <Layout>
      <Link
        href="https://docs.google.com/forms/d/e/1FAIpQLSctcvU8LbMZHsj4pQo3XQFS5JhBBZ00g3gqkKyCmXIalCO-mw/viewform"
        passHref
      >
        <a className={styles.contactLink}>Contact</a>
      </Link>
      <CenteredTextLayout items={contactItems} />
    </Layout>
  );
};

export default Contact;
