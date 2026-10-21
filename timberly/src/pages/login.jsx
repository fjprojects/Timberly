import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] =
    useState(false);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]:
        event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(
        form.username,
        form.password
      );

      navigate("/shop");
    } catch {
      setError(
        "Invalid username or password."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >
        <h1>Login</h1>

        <label>Username</label>

        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          required
        />

        <label>Password</label>

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        {error && (
          <p className="auth-error">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

        <p>
          No account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>
      </form>
    </main>
  );
}

export default Login;