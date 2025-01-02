import React from "react";
import styles from "./ConfModal.module.css";
import { Link } from "react-router-dom";

function ConfModal({ show, handleClose }) {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Confirmation</h2>
        <p>Your entry has been successfully recorded.</p>
        <div className={styles.buttonContainer}>
          <div>
            <Link className={styles.journalButton} to="/journal">Go to Journal</Link>
          </div>
          <button className={styles.closeButton} onClick={handleClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default ConfModal;