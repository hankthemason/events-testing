import classNames from "classnames";
import { useState } from "react";
import Layout from "../../components/Layout";
import CenteredTextLayout from "components/CenteredTextLayout";
import joinItems from "./joinItems.json";
import styles from "./join.module.scss";

const images = [
  "/join/mailing-list.png",
  "/join/patreon.png",
  "/join/join-heart.gif",
];

const Join = () => {
  const [imageIndex, setImageIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setImageIndex(index);
  };

  const handleMouseLeave = () => {
    setImageIndex(null);
  };

  return (
    <Layout>
      {images.map((image, index) => (
        <img
          className={classNames(styles.joinImage, {
            [styles.showImage]: imageIndex === index,
          })}
          src={image}
        />
      ))}
      <CenteredTextLayout
        items={joinItems}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
    </Layout>
  );
};

export default Join;
