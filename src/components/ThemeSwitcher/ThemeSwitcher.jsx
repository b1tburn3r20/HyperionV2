import React, { useContext } from "react";
import { ThemeContext } from "../../pages/App/App";

import "./ThemeSwitcher.css";

function ThemeSwitcher() {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  return (
    <div className="theme-switcher-container-container">
      <select
        className="theme-switcher-container"
        value={theme}
        onChange={handleThemeChange}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="blue">Blue</option>
      </select>
    </div>
  );
}

export default ThemeSwitcher;
