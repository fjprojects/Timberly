import {
  createContext,
  useContext,
  useState,
} from "react";

import api from "../api/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(
      localStorage.getItem(
        "timberlyAccessToken"
      )
    )
  );

  const [username, setUsername] = useState(
    localStorage.getItem(
      "timberlyUsername"
    ) || ""
  );

  async function register(formData) {
    const response = await api.post(
      "/accounts/register/",
      formData
    );

    return response.data;
  }

  async function login(loginUsername, password) {
    const response = await api.post(
      "/token/",
      {
        username: loginUsername,
        password,
      }
    );

    localStorage.setItem(
      "timberlyAccessToken",
      response.data.access
    );

    localStorage.setItem(
      "timberlyRefreshToken",
      response.data.refresh
    );

    localStorage.setItem(
      "timberlyUsername",
      loginUsername
    );

    setUsername(loginUsername);
    setIsLoggedIn(true);
  }

  function logout() {
    localStorage.removeItem(
      "timberlyAccessToken"
    );

    localStorage.removeItem(
      "timberlyRefreshToken"
    );

    localStorage.removeItem(
      "timberlyUsername"
    );

    setUsername("");
    setIsLoggedIn(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        username,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}