import React, { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <div>
      <label className="swap swap-rotate cursor-pointer">
        <input type="checkbox" onChange={handleToggle} checked={theme !== "light"} />
        <FaSun className="swap-off fill-current w-6 h-6 text-yellow-400" />
        <FaMoon className="swap-on fill-current w-6 h-6 text-indigo-400" />
      </label>
    </div>
  );
};

export default ThemeToggle;
