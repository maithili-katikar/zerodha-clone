import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import api from "../api";
import GeneralContext from "./GeneralContext";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { orderVersion } = useContext(GeneralContext);

  const loadUser = useCallback(() => {
    return api
      .get("/auth/me")
      .then((res) => setUser(res.data.user))
      .catch(() => {});
  }, []);

  useEffect(() => {
    loadUser().finally(() => setLoading(false));
  }, [loadUser, orderVersion]);

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      window.location.href = "http://localhost:3000/login";
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);