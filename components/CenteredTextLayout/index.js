import styles from "./centeredTextLayout.module.scss";

const CenteredTextLayout = ({
  items,
  handleMouseEnter = null,
  handleMouseLeave = null,
}) => {
  return (
    <div className={styles.container}>
      {items.map((item, index) => (
        <div
          className={styles.section}
          onMouseEnter={handleMouseEnter && (() => handleMouseEnter(index))}
          onMouseLeave={handleMouseLeave}
        >
          <div className={styles.sectionHeader}>{item.sectionHeader}</div>
          {item.paragraph && (
            <div
              className={styles.paragraph}
              dangerouslySetInnerHTML={{ __html: item.paragraph }}
            />
          )}
          {item.list &&
            item.list.map((listItem) => (
              <div className={styles.listItem}>{listItem}</div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default CenteredTextLayout;
