import { createContext, useContext, useState, useEffect, useMemo } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("creativa_user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const register = async (userData) => {
    const users = JSON.parse(localStorage.getItem("creativa_users") || "[]");
    const exists = users.find((u) => u.email === userData.email);
    if (exists) throw new Error("El email ya está registrado");

    const role = userData.email.includes("admin") ? "admin" : "user";
    const newUser = {
      id: Date.now(),
      name: userData.name,
      lastname: userData.lastname,
      email: userData.email,
      birthYear: userData.born,
      role,
    };
    users.push({ ...newUser, password: userData.password });
    localStorage.setItem("creativa_users", JSON.stringify(users));

    const { password, ...safeUser } = { ...newUser, password: userData.password };
    setUser(safeUser);
    localStorage.setItem("creativa_user", JSON.stringify(safeUser));
    return safeUser;
  };

  const login = async (email, password) => {
    const users = JSON.parse(localStorage.getItem("creativa_users") || "[]");
    const found = users.find((u) => u.email === email && u.password === password);

    if (!found) {
      const role = email.includes("admin") ? "admin" : "user";
      const newUser = {
        id: Date.now(),
        name: email.split("@")[0],
        lastname: "",
        email,
        birthYear: 1990,
        role,
      };
      users.push({ ...newUser, password });
      localStorage.setItem("creativa_users", JSON.stringify(users));
      setUser(newUser);
      localStorage.setItem("creativa_user", JSON.stringify(newUser));
      return newUser;
    }

    const { password: _, ...safeUser } = found;
    setUser(safeUser);
    localStorage.setItem("creativa_user", JSON.stringify(safeUser));
    return safeUser;
  };

  const logout = () => {
    localStorage.removeItem("creativa_user");
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
