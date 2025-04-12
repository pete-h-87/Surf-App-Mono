import React from "react";
import { Link } from "react-router-dom";
import styles from "./Register.module.css";
import { createNewUser } from "../../util";

const handleSubmit = (e) => {
  e.preventDefault();
  
}

export const Register = () => {
  return (
    <div>
      <nav className={styles.navbar}>
        <ul>
          <li>
            <Link to="/">Back</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/journal">Journal</Link>
          </li>
        </ul>
      </nav>
      <form action="/register" method="POST">
        <div>
          <label for="name">Name</label>
          <input type="text" id="name" name="name" required/>
        </div>
        <div>
          <label for="password">Password</label>
          <input type="text" id="password" name="password" required/>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};
