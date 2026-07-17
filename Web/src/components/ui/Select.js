import React from "react";
import styles from "./Input.module.css";

/**
 * Styled <select>, sharing Input.module.css so a form mixing text inputs
 * and dropdowns looks like one consistent set, not two different systems.
 */
function Select({ hasError = false, className = "", children, ...rest }) {
  return (
    <div className={styles.wrap}>
      <select
        className={[styles.input, hasError ? styles.hasError : "", className]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {children}
      </select>
    </div>
  );
}

export default Select;
