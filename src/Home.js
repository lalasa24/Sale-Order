// Home.js
import React from 'react';
import { useTheme } from './ThemeContext';

function Home() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={theme === 'dark' ? 'dark-theme' : 'light-theme'}>
      <h1>Home Page</h1>
      <div>
        <label>
          <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} />
          Dark Theme
        </label>
      </div>
    </div>
  );
}

export default Home;
