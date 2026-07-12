import React from "react";
import { EyeIcon, EyeOffIcon } from "../icons/Icon";
import styles from "./Input.module.css";

/**
 * Shared by Login and Register so the password-visibility control has
 * exactly one implementation instead of two inline copies. Reuses
 * Input.module.css's .iconButton rather than redefining the same
 * button styling a second time.
 */
function PasswordToggleButton({ visible, onToggle }) {
  return (
    <button
      type="button"
      className={styles.iconButton}
      onClick={onToggle}
      aria-label={visible ? "Hide password" : "Show password"}
    >
      {visible ? <EyeOffIcon size={17} /> : <EyeIcon size={17} />}
    </button>
  );
}

export default PasswordToggleButton;
