import React, { useState } from "react";

const DarkMode = () => {
  const windowGlobal = typeof window !== "undefined" && window;
  const [checked, setChecked] = useState(
    windowGlobal && windowGlobal.localStorage.theme === "dark" ? true : false
  );
  const handleClick = () => {
    setChecked(!checked);
  };
  if (checked === true) {
    windowGlobal ? (windowGlobal.localStorage.theme = "dark") : "";
  } else {
    windowGlobal ? (windowGlobal.localStorage.theme = "light") : "";
  }
  if (
    (windowGlobal && windowGlobal.localStorage.theme === "dark") ||
    (!(windowGlobal && "theme" in windowGlobal.localStorage) &&
      windowGlobal &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    windowGlobal ? (windowGlobal.localStorage.theme = "dark") : "";
    windowGlobal && document.documentElement.classList.add("dark");
  } else {
    windowGlobal && document.documentElement.classList.remove("dark");
  }
  return (
    <div className="absolute md:relative top-6 right-2 md:top-auto md:right-auto">
      <input
        type="checkbox"
        id="dark-mode-toggle"
        aria-checked="true"
        className="toggle-checkbox"
        checked={checked}
        onChange={handleClick}
      />
      <label
        htmlFor="dark-mode-toggle"
        aria-label="Toggle para modo nocturno"
        className="toggle"
      ></label>
    </div>
  );
};
export default DarkMode;
