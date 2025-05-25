import React from "react";
import { Link } from "react-router-dom";
import styles from "./Landing.module.css";
// import { createNewUser } from "../../util";

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   const formData = new FormData(e.target);
//   const data = {
//     name: formData.get("name"),
//     password: formData.get("password"),
//     email: formData.get("email"),
//   };
//   console.log(data);
//   try {
//     await createNewUser(data);
//   } catch (err) {
//     console.log(err);
//   }
// };

export const Landing = () => {
  return (
    <div className={styles.page}>
      <div>The Landing</div>
      <div className={`${styles.dgrid} ${styles.gap2}`}>
        <button
          className={`${styles.btn} ${styles.btnlg} ${styles.btnprimary}`}
          type="button"
        >
          Block button
        </button>
        <button
          className={`${styles.btn} ${styles.btnlg} ${styles.btnprimary}`}
          type="button"
        >
          Block button
        </button>
      </div>
      <nav className={styles.navbar}>
        <ul>
          <li>
            <Link to="/login">Back</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/journal">Journal</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
