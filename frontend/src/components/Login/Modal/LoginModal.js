import React, { useState } from "react";
import styles from "./LoginModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

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
        <h4>Invalid email or password</h4>
      </div>
    </div>
  );
}

export default Modal;
