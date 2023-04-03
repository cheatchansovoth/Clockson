import { Navbar } from "./component/Navbar";
import React, { useState } from "react";
import "./App.css";
import ThemeContext from "./component/ThemeContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Center } from "./component/Center";
import { Shop } from "./component/Shop";
import { Login } from "./component/Login";
import { Register } from "./component/Register";
import { Resetpassword } from "./component/Resetpassword";
import { PreItem } from "./component/PreItem";
import { MobileCart } from "./component/MobileCart";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [itemsNumber, setItemNumber] = useState(0);
  const [cart, setCart] = useState([]);
  const addToCart = (product) => {
    const cartId = Date.now().toString();
    const item = { ...product, cartId };
    setCart((prevCartItems) => [...prevCartItems, { ...item }]);
  };
  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.cartId !== id);
    setCart(updatedCart);
  };
  return (
    <Router>
      <ThemeContext.Provider
        value={{
          darkMode,
          setDarkMode,
          itemsNumber,
          setItemNumber,
          showCart,
          setShowCart,
          addToCart,
          removeItem,
        }}
      >
        <div
          className={
            darkMode ? "bg-gray-900 text-white " : "bg-white text-gray-900 "
          }
        >
          <Navbar cart={cart} />
          <AnimatePresence mode="wait">
            <Routes>
              <Route
                path="/"
                exact
                element={
                  <motion.div
                    key="home"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Center />
                  </motion.div>
                }
              />
              <Route
                path="/shop"
                exact
                element={
                  <motion.div
                    key="shop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Shop />
                  </motion.div>
                }
              />
              <Route
                path="/login"
                exact
                element={
                  <motion.div
                    key="login"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Login />
                  </motion.div>
                }
              />
              <Route
                path="/register"
                exact
                element={
                  <motion.div
                    key="register"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Register />
                  </motion.div>
                }
              />
              <Route
                path="/resetpassword"
                exact
                element={
                  <motion.div
                    key="resetpassword"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Resetpassword />
                  </motion.div>
                }
              />
              <Route
                path="/shop/:id"
                exact
                element={
                  <motion.div
                    key="PreItem"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <PreItem />
                  </motion.div>
                }
              />
              <Route
                path="/shop/mobilecart"
                exact
                element={
                  <motion.div
                    key="MobileCart"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <MobileCart cart={cart} />
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
