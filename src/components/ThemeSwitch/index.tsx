import { useState } from "react";
import "./index.css";

export default function ThemeSwitch() {
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const handleChange = (theme: "dark" | "light") => {
    document.documentElement.setAttribute("data-theme", theme);
    setTheme(theme);
  };
  return (
    <>
      {theme === "dark" ? (
        <button className="theme-btn" onClick={() => handleChange("light")}>
          <i className="bi bi-brightness-high"></i>
        </button>
      ) : (
        <button className="theme-btn" onClick={() => handleChange("dark")}>
          <i className="bi bi-moon"></i>
        </button>
      )}
    </>
  );
}
