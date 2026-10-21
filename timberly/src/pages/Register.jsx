import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    username: "",
    email: "",
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
      await register(form);

      alert(
        "Account created successfully. Please log in."
      );

      navigate("/login");
    } catch (error) {
      const data = error.response?.data;

      if (data?.username) {
        setError(data.username[0]);
      } else if (data?.email) {
        setError(data.email[0]);
      } else if (data?.password) {
        setError(data.password[0]);
      } else {
        setError(
          "Registration failed. Check your details."
        );
      }
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
        <h1>Create Account</h1>

        <label>Username</label>

        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          required
        />

        <label>Email</label>

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label>Password</label>

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          minLength="6"
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
            ? "Creating account..."
            : "Register"}
        </button>

        <p>
          Already registered?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>
      </form>
    </main>
  );
}

export default Register;