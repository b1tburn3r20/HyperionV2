import { useState } from "react";
import * as usersService from "../../utilities/users-service";
import "./LoginForm.css";

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError("");
  }

  async function handleSubmit(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      // The promise returned by the signUp service method
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await usersService.login(credentials);
      setUser(user);
    } catch {
      setError("Log In Failed - Try Again");
    }
  }

  return (
    <div>
      <div className="login-form-header">- Already a user? Login Below!</div>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label className="label-header">Email</label>
          <input
            className="login-input"
            type="text"
            name="email"
            placeholder="..."
            value={credentials.email}
            onChange={handleChange}
            required
          />
          <label className="label-header">Password</label>
          <input
            className="login-input"
            type="password"
            name="password"
            placeholder="..."
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <button className="login-form-button" type="submit">
            LOGIN
          </button>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
}
