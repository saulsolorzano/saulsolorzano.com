import React, { useState } from "react";

const DarkMode = () => {
  const [checked, setChecked] = useState(
    localStorage.theme === "dark" ? true : false
  );
  const handleClick = () => {
    setChecked(!checked);
  };
  if (checked === true) {
    localStorage.theme = "dark";
  } else {
    localStorage.theme = "light";
  }
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    localStorage.theme = "dark";
    document.documentElement.classList.add("dark");
  } else {
    console.log("modo claro");
    document.documentElement.classList.remove("dark");
  }
  return (
    <>
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
    </>
  );
};
export default DarkMode;
