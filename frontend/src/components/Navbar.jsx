import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import "../styles/navbar.css";

function Navbar({ toggleSidebar }) {
  const { role, logout } = useAuth();

  const {
    themeMode,
    toggleTheme,
  } = useTheme();

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <button
          className="mobile-menu-btn"
          onClick={toggleSidebar}
        >
          ☰
        </button>

        <div className="navbar-logo">
          <div className="logo-circle">P</div>

          <div>
            <h2 className="logo-title">PMS</h2>
            <p className="logo-subtitle">
              Product Management System
            </p>
          </div>
        </div>
      </div>

      <div className="navbar-right">
        <Link
          to="/products"
          className={`nav-link ${
            location.pathname === "/products"
              ? "active"
              : ""
          }`}
        >
          Products
        </Link>

        {role === "admin" && (
          <Link
            to="/products/add"
            className={`nav-link ${
              location.pathname === "/products/add"
                ? "active"
                : ""
            }`}
          >
            Add Product
          </Link>
        )}

        <span
          className={`role-badge ${
            role === "admin"
              ? "admin"
              : "user"
          }`}
        >
          {role}
        </span>

        <button
          onClick={toggleTheme}
          className="theme-btn"
        >
          {themeMode === "light"
            ? "🌙 Dark"
            : "☀️ Light"}
        </button>

        <button
          onClick={handleLogout}
          className="logout-btn"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;