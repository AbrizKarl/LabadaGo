import React from "react";
import styles from "./Textarea.module.css";

function Textarea({ className = "", ...rest }) {
  return <textarea className={[styles.textarea, className].filter(Boolean).join(" ")} {...rest} />;
}

export default Textarea;
