import React from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
  const { store, actions } = useGlobalReducer();
  const navigate = useNavigate();

  const handleBrandClick = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const handleLogout = () => {
    actions.logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
      <a className="navbar-brand" href="#" onClick={handleBrandClick}>
        MyApp
      </a>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          {store.user ? (
            <>
              <li className="nav-item">
                <span className="nav-link">Hello, {store.user.email}</span>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-light" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <a className="nav-link" href="login">
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="signup">
                  Signup
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};