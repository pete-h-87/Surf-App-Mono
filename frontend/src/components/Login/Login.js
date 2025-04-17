import React from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { loggingInTheUser } from "../../util";

export const Login = () => {

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("BUTTON PRESSED")
    const formData = new FormData(e.target);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    console.log("SSSSSS", data);
    try {
      console.log("EEEEEE", data)
      const response = await loggingInTheUser(data);
      console.log("KKKKKKK:", response)
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
        onSubmit={handleSubmit}
      >
        <div>
          <label>Email</label>
          <input name="email" required />
        </div>
        <div>
          <label>Password</label>
          <input name="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
