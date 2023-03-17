import { Navbar } from "./component/Navbar";
import React, { useState } from 'react';
import './App.css'
import ThemeContext from "./component/ThemeContext";
import { Center } from "./component/Center";

function App() {

  const [darkMode, setDarkMode] = useState(false);
  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
            <div
            className={darkMode ? 'bg-gray-900 text-white h-[100vh]' : 'bg-white text-gray-900 h-[100vh]'}
            >
      <Navbar/>
      <Center/>
    </div>
    </ThemeContext.Provider>
  );
}

export default App;
