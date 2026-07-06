import React from "react";
import styles from "./FormField.module.css";

let uid = 0;

/**
 * Wraps a single form control with a consistent label + hint/error
 * pattern. Pages pass the actual <Input> as a render prop so FormField
 * never needs to know what kind of control it's labeling.
 */
function FormField({ label, error, hint, htmlFor, children }) {
  const id = React.useMemo(() => htmlFor || `field-${++uid}`, [htmlFor]);
  const child = React.cloneElement(children, { id, "aria-invalid": !!error });

  return (
    <div className={styles.field}>
      <div className={styles.labelRow}>
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      </div>
      {child}
      {error ? (
        <div className={styles.error} role="alert">
          {error}
        </div>
      ) : hint ? (
        <div className={styles.hint}>{hint}</div>
      ) : null}
    </div>
  );
}

export default FormField;
