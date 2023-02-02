import styles from "./PageNameHandwriting.module.scss";

const PageNameHandwriting = ({ imageSrc }) => {
  return <img className={styles.handwriting} src={imageSrc} />;
};

export default PageNameHandwriting;
