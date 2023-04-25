import React, { createContext, useState } from 'react';

export const ThemeContext = createContext<any>({ theme: "light", undefined });

export const ThemeProvider: React.FC<any> = ({children}) => {
  const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");
  const [theme, setTheme] = useState(isDarkTheme ? "dark" : "light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
