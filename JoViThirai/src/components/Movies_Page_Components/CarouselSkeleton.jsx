import React from "react";
import styles from "../../style/Skeleton.module.css";

function CarouselSkeleton() {
  return <div className={`${styles.carouselSkeleton} ${styles.skeleton}`}></div>;
}

export default CarouselSkeleton;
