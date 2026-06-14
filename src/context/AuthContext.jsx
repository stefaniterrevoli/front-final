import { createContext, useContext, useState, useEffect, useMemo } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("creativa_user");
    const token = localStorage.getItem("token");
    if (stored && token) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const register = async (userData) => {
    const fullName = userData.lastname
      ? `${userData.name} ${userData.lastname}`
      : userData.name;
    const response = await api.post("/users", {
      name: fullName,
      email: userData.email,
      password: userData.password,
      commune: userData.commune || "",
      phone: userData.phone || "",
      address: userData.address || "",
      age: parseInt(userData.born || userData.age) || 18,
    });
    const data = response.data;
    const newUser = {
      id: data.userId,
      userId: data.userId,
      name: data.name,
      email: data.email,
    };
    return newUser;
  };

  const login = async (email, password) => {
    const response = await api.post("/users/login", { email, password });
    const data = response.data;
    const userData = {
      id: data.userId,
      userId: data.userId,
      name: data.name,
      email: data.email,
      role: data.role,
    };
    localStorage.setItem("token", data.token);
    localStorage.setItem("creativa_user", JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem("creativa_user");
    localStorage.removeItem("token");
    setUser(null);
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  const value = useMemo(
    () => ({ user, isAuthenticated, isAdmin, register, login, logout }),
    [user, isAuthenticated, isAdmin],
  );

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
