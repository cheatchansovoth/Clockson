import { Navbar } from "./component/Navbar";
import React, { useState } from 'react';
import './App.css'
import ThemeContext from "./component/ThemeContext";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Center } from "./component/Center";
import { Shop } from "./component/Shop";

function App() {

  const [darkMode, setDarkMode] = useState(false);
  return (
    <Router>
      <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
              <div
              className={darkMode ? 'bg-gray-900 text-white h-[100vh]' : 'bg-white text-gray-900 h-[100vh]'}
              >
        <Navbar/>
        <AnimatePresence mode='wait'>
        <Routes>
        <Route
            path='/'
            exact
            element={
              <motion.div
                key='home'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Center />
              </motion.div>
            }
          />
          <Route
            path='/shop'
            exact
            element={
              <motion.div
                key='shop'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Shop />
              </motion.div>
            }
          />
        </Routes>
        </AnimatePresence>
      </div>
      </ThemeContext.Provider>
    </Router>
  );
}

export default App;
