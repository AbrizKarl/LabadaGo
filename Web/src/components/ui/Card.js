import React from "react";
import styles from "./Card.module.css";

function Card({ children, padding = "md", interactive = false, className = "", ...rest }) {
  return (
    <div
      className={[styles.card, styles[`pad-${padding}`], interactive ? styles.interactive : "", className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Card;
