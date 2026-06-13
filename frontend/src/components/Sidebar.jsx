import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import {
  lightTheme,
  darkTheme,
} from "../theme/theme";

import "../styles/sidebar.css";

function Sidebar({ sidebarOpen }) {
  const { role } = useAuth();
  const location = useLocation();

  const { themeMode } = useTheme();

  const theme =
    themeMode === "light"
      ? lightTheme
      : darkTheme;

  const menuStyle = (path) => ({
    display: "block",
    padding: "14px 18px",
    marginBottom: "10px",
    borderRadius: "10px",
    textDecoration: "none",
    color:
      location.pathname === path
        ? "#ffffff"
        : theme.secondaryText,
    background:
      location.pathname === path
        ? "#ff8c66"
        : "transparent",
    fontWeight: "600",
    transition: "0.3s",
  });

  return (
    <div
      className={`sidebar ${
        sidebarOpen ? "open" : ""
      }`}
      style={{
        width: "240px",
        background: theme.card,
        color: theme.text,
        padding: "25px 15px",
        borderRight:
          "1px solid rgba(0,0,0,0.08)",
      }}
    >
      <h3
        style={{
          marginBottom: "25px",
          color: "#ff8c66",
        }}
      >
        Dashboard
      </h3>

      <Link
        to="/products"
        style={menuStyle("/products")}
      >
        📦 Products
      </Link>

      {role === "admin" && (
        <Link
          to="/products/add"
          style={menuStyle("/products/add")}
        >
          ➕ Add Product
        </Link>
      )}

      <div
        style={{
          marginTop: "40px",
          padding: "15px",
          background:
            themeMode === "dark"
              ? "#334155"
              : "#f3f4f6",
          borderRadius: "10px",
        }}
      >
        <p
          style={{
            margin: 0,
            color: theme.secondaryText,
            fontSize: "12px",
          }}
        >
          Logged in as
        </p>

        <h4
          style={{
            margin: "8px 0 0 0",
          }}
        >
          {role.toUpperCase()}
        </h4>
      </div>
    </div>
  );
}

export default Sidebar;