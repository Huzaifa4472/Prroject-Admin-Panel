import { createContext, useState, useEffect } from 'react';

const INITIAL_STATE = {
  darkMode: false,
};

const getTheme = localStorage.getItem('theme');

export const DarkModeContext = createContext(INITIAL_STATE);

export const DarkModeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(getTheme ? getTheme : 'light');

  useEffect(() => {
    const htmlElement = document.querySelector('html');
    if (theme === 'dark') {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <DarkModeContext.Provider value={{ theme, setTheme }}>
      {children}
    </DarkModeContext.Provider>
  );
};
