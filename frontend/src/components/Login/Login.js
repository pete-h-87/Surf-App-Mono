import React from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";

export const Login = () => {


  return (
    <div className={styles.page}>
      <nav className={styles.navbar}>
        <ul>
          <li>
            <Link to="/">Back</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>
      <form action="">

      </form>
      <div>Hi there</div>
    </div>
  );
};
