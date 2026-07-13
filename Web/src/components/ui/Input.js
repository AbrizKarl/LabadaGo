import React from "react";
import styles from "./Input.module.css";

/**
 * Plain styled input. `rightSlot` is used for things like the password
 * visibility toggle so pages don't hand-roll absolute positioning.
 * `leftIcon` is optional and purely decorative (e.g. a mail icon on an
 * email field) — never used to imply functionality that isn't there.
 */
function Input({ hasError = false, rightSlot = null, leftIcon = null, className = "", ...rest }) {
  return (
    <div className={styles.wrap}>
      {leftIcon && <div className={styles.leftSlot}>{leftIcon}</div>}
      <input
        className={[
          styles.input,
          hasError ? styles.hasError : "",
          rightSlot ? styles.withRightSlot : "",
          leftIcon ? styles.withLeftSlot : "",
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
