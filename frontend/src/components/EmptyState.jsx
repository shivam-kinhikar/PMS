import { useTheme } from "../context/ThemeContext";
import {
  lightTheme,
  darkTheme,
} from "../theme/theme";

function EmptyState() {
  const { themeMode } = useTheme();

  const theme =
    themeMode === "light"
      ? lightTheme
      : darkTheme;

  return (
    <div
      style={{
        textAlign: "center",
        padding: "60px 20px",
        background: theme.card,
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        transition: "0.3s",
      }}
    >
      <div
        style={{
          fontSize: "70px",
          marginBottom: "15px",
        }}
      >
        📦
      </div>

      <h2
        style={{
          color: theme.text,
          marginBottom: "10px",
        }}
      >
        No Products Found
      </h2>

      <p
        style={{
          color: theme.secondaryText,
        }}
      >
        Start by creating your first product.
      </p>
    </div>
  );
}

export default EmptyState;