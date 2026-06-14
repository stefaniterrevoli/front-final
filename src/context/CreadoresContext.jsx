import { createContext, useContext, useState } from "react";

const CreadoresContext = createContext();
const SUBS_KEY = "creativa_subs";
const DONS_KEY = "creativa_donations";

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem("creativa_users") || "[]");
  } catch {
    return [];
  }
}

function loadSubs() {
  try {
    return JSON.parse(localStorage.getItem(SUBS_KEY) || "[]");
  } catch {
    return [];
  }
}

function loadDons() {
  try {
    return JSON.parse(localStorage.getItem(DONS_KEY) || "[]");
  } catch {
    return [];
  }
}

function save(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {}
}

export function CreadoresProvider({ children }) {
  const [subs, setSubs] = useState(loadSubs);
  const [dons, setDons] = useState(loadDons);

  const creators = getUsers().filter((u) => u.role !== "admin");

  const isSubscribed = (userId, creatorId) =>
    subs.some((s) => s.userId === userId && s.creatorId === creatorId);

  const subscribe = (userId, creatorId, amount) => {
    const next = [...subs, { userId, creatorId, amount, date: new Date().toLocaleDateString() }];
    setSubs(next);
    save(SUBS_KEY, next);
  };

  const unsubscribe = (userId, creatorId) => {
    const next = subs.filter((s) => !(s.userId === userId && s.creatorId === creatorId));
    setSubs(next);
    save(SUBS_KEY, next);
  };

  const donate = (userId, creatorId, amount, message) => {
    const next = [...dons, { userId, creatorId, amount, message, date: new Date().toLocaleDateString() }];
    setDons(next);
    save(DONS_KEY, next);
  };

  const subscriberCount = (creatorId) =>
    subs.filter((s) => s.creatorId === creatorId).length;

  return (
    <CreadoresContext.Provider
      value={{ creators, subs, dons, isSubscribed, subscribe, unsubscribe, donate, subscriberCount }}
    >
      {children}
    </CreadoresContext.Provider>
  );
}

export function useCreadores() {
  const ctx = useContext(CreadoresContext);
  if (!ctx) throw new Error("useCreadores must be used within CreadoresProvider");
  return ctx;
}

export default CreadoresContext;
