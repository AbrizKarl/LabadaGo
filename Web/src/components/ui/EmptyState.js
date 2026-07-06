import React from "react";
import styles from "./EmptyState.module.css";

function EmptyState({ icon, title, description, action }) {
  return (
    <div className={styles.wrap}>
      {icon && <div className={styles.iconWrap}>{icon}</div>}
      <div className={styles.title}>{title}</div>
      {description && <p className={styles.description}>{description}</p>}
      {action}
    </div>
  );
}

export default EmptyState;
