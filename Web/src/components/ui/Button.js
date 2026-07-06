import React from "react";
import styles from "./Button.module.css";

/**
 * Single source of truth for every button in the app. Handles its own
 * loading state (spinner + disabled) so pages never re-implement it.
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  fullWidth = false,
  leftIcon = null,
  disabled = false,
  type = "button",
  className = "",
  ...rest
}) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={[
        styles.btn,
        styles[variant],
        styles[size],
        fullWidth ? styles.fullWidth : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-busy={isLoading || undefined}
      {...rest}
    >
      {isLoading ? <span className={styles.spinner} aria-hidden="true" /> : leftIcon}
      {children}
    </button>
  );
}

export default Button;
