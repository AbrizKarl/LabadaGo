import React from "react";
import styles from "./Input.module.css";

/**
 * Plain styled input. `rightSlot` is used for things like the password
 * visibility toggle so pages don't hand-roll absolute positioning.
 */
function Input({ hasError = false, rightSlot = null, className = "", ...rest }) {
  return (
    <div className={styles.wrap}>
      <input
        className={[
          styles.input,
          hasError ? styles.hasError : "",
          rightSlot ? styles.withRightSlot : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      />
      {rightSlot && <div className={styles.rightSlot}>{rightSlot}</div>}
    </div>
  );
}

export default Input;
