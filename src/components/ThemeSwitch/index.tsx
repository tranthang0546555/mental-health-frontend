import { useEffect, useState } from "react";
import "./index.css";

export default function ThemeSwitch() {
  const [theme, setTheme] = useState<string>("light");

  useEffect(() => {
    const defaultTheme = localStorage.getItem("theme");
    if (defaultTheme) {
      handleChange(defaultTheme);
      return setTheme(defaultTheme);
    }
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    setTheme(systemTheme);
    handleChange(systemTheme);
  }, []);

  const handleChange = (theme: string) => {
    document.documentElement.setAttribute("data-theme", theme);
    setTheme(theme);
    localStorage.setItem("theme", theme);
  };

  return (
    <>
      {theme === "dark" ? (
        <button className="theme-btn" onClick={() => handleChange("light")}>
          <i className="bi bi-sun"></i>
        </button>
      ) : (
        <button className="theme-btn" onClick={() => handleChange("dark")}>
          <i className="bi bi-moon"></i>
        </button>
      )}
    </>
  );
}
