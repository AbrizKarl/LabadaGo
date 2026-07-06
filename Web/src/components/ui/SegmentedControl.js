import React from "react";
import styles from "./SegmentedControl.module.css";

/**
 * Accessible segmented control built from visually-hidden radio inputs so
 * it works with keyboard nav and screen readers, not just click handlers.
 */
function SegmentedControl({ name, value, onChange, options }) {
  return (
    <div className={styles.group} role="radiogroup">
      {options.map((opt) => (
        <label key={opt.value} style={{ flex: 1, position: "relative" }}>
          <input
            type="radio"
            className={styles.input}
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
          />
          <div className={[styles.option, value === opt.value ? styles.optionActive : ""].join(" ")}>
            {opt.label}
          </div>
        </label>
      ))}
    </div>
  );
}

export default SegmentedControl;
