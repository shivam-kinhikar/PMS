import { useTheme } from "../context/ThemeContext";
import {
  lightTheme,
  darkTheme,
} from "../theme/theme";

function SearchBar({
  search,
  setSearch,
}) {
  const { themeMode } = useTheme();

  const theme =
    themeMode === "light"
      ? lightTheme
      : darkTheme;

  return (
    <input
      type="text"
      placeholder="Search products..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      style={{
        width: "100%",
        maxWidth: "400px",
        padding: "14px",
        border: `1px solid ${theme.border}`,
        borderRadius: "12px",
        marginBottom: "25px",
        background: theme.card,
        color: theme.text,
        outline: "none",
        transition: "all 0.3s ease",
      }}
    />
  );
}

export default SearchBar;