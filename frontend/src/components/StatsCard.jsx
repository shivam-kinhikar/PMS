import { useTheme } from "../context/ThemeContext";
import {
  lightTheme,
  darkTheme,
} from "../theme/theme";

function StatsCard({
  title,
  value,
}) {
  const { themeMode } = useTheme();

  const theme =
    themeMode === "light"
      ? lightTheme
      : darkTheme;

  return (
    <div
      style={{
        background: theme.card,
        color: theme.text,
        padding: "24px",
        borderRadius: "18px",
        boxShadow:
          "0 4px 15px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease",
      }}
    >
      <h4
        style={{
          margin: 0,
          marginBottom: "10px",
          color: theme.secondaryText,
          fontSize: "18px",
        }}
      >
        {title}
      </h4>

      <h2
        style={{
          margin: 0,
          fontSize: "40px",
          color: theme.text,
        }}
      >
        {value}
      </h2>
    </div>
  );
}

export default StatsCard;