import React from "react";

// Base URL for your API (no trailing slash)
const API_BASE = (
  import.meta.env.VITE_BACKEND_URL ||
  "https://psychic-adventure-5j99qrjx74p2rrg-3001.app.github.dev"
).replace(/\/?$/, "");

// Initial state
export const initialStore = {
  message: null,
  token: sessionStorage.getItem("token") || null,
  user: JSON.parse(sessionStorage.getItem("user")) || null, // add this line
  error: null,
  loading: false,
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_message":
      return { ...store, message: action.payload, loading: false, error: null };
    case "set_token":
      return { ...store, token: action.payload, loading: false, error: null };
    case "set_user":
      return { ...store, user: action.payload, loading: false, error: null }; // add this case
    case "set_error":
      return { ...store, error: action.payload, loading: false };
    case "set_loading":
      return { ...store, loading: true, error: null };
    case "logout":
      return {
        message: null,
        token: null,
        user: null,
        error: null,
        loading: false,
      };
    default:
      throw new Error("Unknown action.");
  }
}

// Async actions for login, signup, logout, and fetching protected message
export const actions = (dispatch) => ({
  login: async (email, password) => {
    dispatch({ type: "set_loading" });
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      dispatch({ type: "set_token", payload: data.token });
      sessionStorage.setItem("token", data.token);
      dispatch({ type: "set_user", payload: { email } });
      sessionStorage.setItem("user", JSON.stringify({ email }));
      // REMOVE or comment out the next line:
      // dispatch({ type: "set_message", payload: data.message });
    } catch (error) {
      dispatch({ type: "set_error", payload: error.message });
    }
  },

  signup: async (email, password) => {
    dispatch({ type: "set_loading" });
    try {
      const res = await fetch(`${API_BASE}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");
      dispatch({ type: "set_user", payload: { email } });
      sessionStorage.setItem("user", JSON.stringify({ email }));
      
    } catch (error) {
    }
  },

  logout: () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    dispatch({ type: "logout" });
  },

  getProtectedMessage: async (token) => {
    if (!token) {
      dispatch({
        type: "set_error",
        payload: "No token found. Please log in.",
      });
      return;
    }
    console.log("Token being sent:", token);
    dispatch({ type: "set_loading" });
    try {
      const res = await fetch(`${API_BASE}/protected`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to get message");
      dispatch({ type: "set_message", payload: data.message });
    } catch (error) {
      dispatch({ type: "set_error", payload: error.message });
    }
  },
});
