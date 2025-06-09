import React from "react";
import styles from "./Modal.module.css";
import { text } from "@fortawesome/fontawesome-svg-core";

function Modal({ show, handleClose }) {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={handleClose}>
          &times;
        </button>
        <div></div>
        <h2>Session Expired!</h2>
      </div>
    </div>
  );
}

export default Modal;
