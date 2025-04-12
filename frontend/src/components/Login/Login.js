import React from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { loggingInTheUser } from "../../util";

export const Login = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      password: formData.get("password"),
    };
    console.log(data);
    try {
      await loggingInTheUser(data);
    } catch (err) {
      console.log(err);
    }
  };

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
      <form
        name="login"
        action="/register"
        onSubmit={handleSubmit}
        method="POST"
      >
        <div>
          <label for="name">Name</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div>
          <label for="password">Password</label>
          <input type="text" id="password" name="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <div>Hi there</div>
    </div>
  );
};
