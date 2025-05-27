import React, { useContext } from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { loggingInTheUser } from "../../util";
import { GlobalContext } from "../../GlobalState";

export const Login = () => {
  const { setLoggedInUser, setLoggedInUserId } = useContext(GlobalContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    try {
      const response = await loggingInTheUser(data);
      console.log("handle submit try/catch userID RESPONSE XXXX:", response);

      setLoggedInUser(response.user.name);

      setLoggedInUserId(response.user.id);
      console.log("response user id MMMMM:", response.user.id);
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
      <form onSubmit={handleSubmit}>
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
