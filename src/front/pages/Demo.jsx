import React, { useState, useContext } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

export function Demo() {
  const { store, dispatch, actions } = useGlobalReducer();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    await actions.login(email, password);
    
    if (!store.error) {
      navigate("/");
    }
  }

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4">Login</h2>
      {store.error && <div className="alert alert-danger">{store.error}</div>}
      {store.message && <div className="alert alert-success">{store.message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="emailLogin" className="form-label">
            Email address
          </label>
          <input
            id="emailLogin"
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={store.loading}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="passwordLogin" className="form-label">
            Password
          </label>
          <input
            id="passwordLogin"
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={store.loading}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={store.loading}>
          {store.loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}