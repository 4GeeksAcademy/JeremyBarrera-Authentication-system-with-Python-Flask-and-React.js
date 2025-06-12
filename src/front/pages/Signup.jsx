import React, { useState, useContext } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const { store, dispatch, actions } = useGlobalReducer();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    await actions.signup(email, password);

    if (!store.error) {
      navigate("/login");
    }
  }

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4">Sign Up</h2>
      {store.error && <div className="alert alert-danger">{store.error}</div>}
      {store.message && <div className="alert alert-success">{store.message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="emailSignup" className="form-label">
            Email address
          </label>
          <input
            id="emailSignup"
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={store.loading}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="passwordSignup" className="form-label">
            Password
          </label>
          <input
            id="passwordSignup"
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={store.loading}
          />
        </div>
        <button type="submit" className="btn btn-success" disabled={store.loading}>
          {store.loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
