import React from "react";
import styles from "./Badge.module.css";

function Badge({ children, variant = "neutral" }) {
  return <span className={[styles.badge, styles[variant]].join(" ")}>{children}</span>;
}

export default Badge;
