import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.body.style.backgroundColor =
      themeMode === "dark"
        ? "#000000"
        : "#f8fafc";

    document.body.style.color =
      themeMode === "dark"
        ? "#ffffff"
        : "#111827";

    localStorage.setItem(
      "theme",
      themeMode
    );
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prev) =>
      prev === "light"
        ? "dark"
        : "light"
    );
  };

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}