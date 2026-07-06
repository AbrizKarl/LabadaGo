import React from "react";
import { EyeIcon, EyeOffIcon } from "../icons/Icon";

/**
 * Shared by Login and Register so the password-visibility control has
 * exactly one implementation instead of two inline copies.
 */
function PasswordToggleButton({ visible, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={visible ? "Hide password" : "Show password"}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 30,
        height: 30,
        border: "none",
        background: "transparent",
        borderRadius: 6,
        color: "var(--gray-500)",
        cursor: "pointer",
      }}
    >
      {visible ? <EyeOffIcon size={17} /> : <EyeIcon size={17} />}
    </button>
  );
}

export default PasswordToggleButton;
