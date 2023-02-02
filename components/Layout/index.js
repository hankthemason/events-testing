import Head from "next/head";
import Link from "next/link";
import NavBar from "../NavBar";
import styles from "./Layout.module.scss";

const Layout = ({ children, currentPage }) => {
  return (
    <>
      <Head>
        <title>PAGEANT</title>
      </Head>
      <NavBar currentPage={currentPage} />
      <main>{children}</main>
    </>
  );
};

export default Layout;
