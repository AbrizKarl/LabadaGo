import React, { useEffect } from "react";
import { XIcon } from "../icons/Icon";
import styles from "./Modal.module.css";

/**
 * Simple, reusable modal shell. Closes on Escape or backdrop click.
 * Content is passed as children so any form can live inside it without
 * duplicating the overlay/panel/close-button chrome.
 */
function Modal({ title, onClose, children }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.panel} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className={styles.header}>
          <span className={styles.title}>{title}</span>
          <button className={styles.closeButton} onClick={onClose} aria-label="Close">
            <XIcon size={18} />
          </button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
