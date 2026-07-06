import React from "react";
import styles from "./Alert.module.css";
import { CheckCircleIcon, AlertCircleIcon } from "../icons/Icon";

function Alert({ variant = "info", children }) {
  const Icon = variant === "success" ? CheckCircleIcon : variant === "error" ? AlertCircleIcon : AlertCircleIcon;

  return (
    <div className={[styles.alert, styles[variant]].join(" ")} role={variant === "error" ? "alert" : "status"}>
      <Icon size={16} className={styles.icon} />
      <span>{children}</span>
    </div>
  );
}

export default Alert;
