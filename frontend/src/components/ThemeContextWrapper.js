import React, { useState, useEffect } from 'react';
import { ThemeContext, themes } from '../store/ThemeContext';

export default function ThemeContextWrapper(props) {
  const [theme, setTheme] = useState(localStorage.getItem('theme-color'));

  function changeTheme(theme) {
    setTheme(theme);
    localStorage.setItem('theme-color', theme)
    console.log(localStorage.getItem('theme-color'))
  }

  useEffect(() => {
    switch (theme) {
      case themes.light:
        document.getElementsByTagName('html')[0].setAttribute('class', 'dark');
        break;
      case themes.dark:
      default:
        document.getElementsByTagName('html')[0].setAttribute('class', '');
        break;
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme: theme, changeTheme: changeTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}