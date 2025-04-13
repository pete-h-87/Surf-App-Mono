import React from "react";
import { Link } from "react-router-dom";
import styles from "./Register.module.css";
import { createNewUser } from "../../util";

const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = {
    name: formData.get("name"),
    password: formData.get("password"),
    email: formData.get("email")
  };
  console.log(data);
  try {
    await createNewUser(data);
  } catch (err) {
    console.log(err);
  }
};

export const Register = () => {
  return (
    <div className={styles.page}>
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
      <form
        name="login"
        action="/register"
        onSubmit={handleSubmit}
        method="POST"
      >
        <div>
          <label>Name</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div>
          <label>Email</label>
          <input type="text" id="email" name="email" required />
        </div>
        <div>
          <label>Password</label>
          <input type="text" id="password" name="password" required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};
