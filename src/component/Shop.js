import React, { useState, useContext, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import ThemeContext from "./ThemeContext";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import clothes from "./clothes.json";
import { useNavigate } from "react-router-dom";
import { Alert } from "./Alert";
export const Shop = () => {
  const [showColors, setShowColors] = useState(false);
  const [plusMinus, setPlusMinus] = useState("+");
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [cartItems, setCartItems] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [alert, setAlert] = useState(false);
  const itemsPerPage = 8;
  const filteredClothes = selectedColor
    ? clothes.filter((item) => item.color === selectedColor)
    : clothes;
  const [sortBy, setSortBy] = useState("newest");
  const navigate = useNavigate();
  const handleSortByChange = (e) => {
    // event handler for updating sortBy state
    setSortBy(e.target.value);
    setCurrentPage(1); // reset current page when sorting changes
  };
  const { addToCart } = useContext(ThemeContext);

  const onClickAddToCart = (item) => {
    addToCart(item);
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 2000);
  };

  const removeProduct = (productToRemove) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter(
        (product) => product.cartId !== productToRemove.cartId
      )
    );
  };
  const sortedClothes = useMemo(() => {
    // sort clothes based on sortBy state
    switch (sortBy) {
      case "lowtohigh":
        return [...filteredClothes].sort((a, b) => a.price - b.price);
      case "hightolow":
        return [...filteredClothes].sort((a, b) => b.price - a.price);
      case "az":
        return [...filteredClothes].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      case "za":
        return [...filteredClothes].sort((a, b) =>
          b.name.localeCompare(a.name)
        );
      default:
        return filteredClothes;
    }
  }, [filteredClothes, sortBy]);
  const defaultColor = ""; // Set the default color here

  const handleColorClick = (color) => {
    setSelectedColor(color === "reset" ? defaultColor : color);
    setCurrentPage(1);
  };
  const AddProduct = (product) => {
    const cartId = Date.now().toString(); // generate a unique ID for the cart item
    const item = { ...product, cartId }; // add the ID to the product
    setCartItems((prevCartItems) => [...prevCartItems, { ...item }]);
  };

  const handleToggleColors = () => {
    setShowColors(!showColors);
    setPlusMinus(showColors ? "+" : "-");
  };
  function ClothesCard({ clothingItem }) {
    return (
      <div className="w-full lg:w-full md:w-1/2 p-4 ">
        <div
          className={
            darkMode
              ? "bg-gray-900 text-white rounded-lg overflow-hidden shadow-lg"
              : "bg-white text-gray-900 rounded-lg overflow-hidden shadow-lg"
          }
        >
          <div className="w-full lg:h-[20vh] bg-gray-200">
            <img
              src={clothingItem.image}
              alt={clothingItem.name}
              className="w-full h-full object-cover hover:scale-125 duration-500"
              onClick={() => navigate("/shop/" + clothingItem.productID)}
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-medium">{clothingItem.name}</h3>
            <p className="font-medium">${clothingItem.price}</p>
            <p
              className={`inline-block w-6 h-6 rounded-full ${
                clothingItem.color === "black"
                  ? "bg-black"
                  : clothingItem.color === "white"
                  ? "bg-white"
                  : `bg-${clothingItem.color}-500`
              }`}
            ></p>
            <br />
            <div className="space-x-3 sm:space-x-0">
              <button
                onClick={() => onClickAddToCart(clothingItem)}
                className="bg-slate-700 text-white px-4 py-2 rounded mt-2 hover:bg-slate-600"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function ClothesList({ clothes }) {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedClothes.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(sortedClothes.length / itemsPerPage);

    const handleNextPage = () => {
      setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
      setCurrentPage(currentPage - 1);
    };

    return (
      <div className="">
        <div
          className={
            darkMode
              ? "bg-gray-900 text-white grid lg:grid-cols-4 md:grid-cols-2 gap-4 "
              : "bg-white text-gray-900 grid lg:grid-cols-4 md:grid-cols-2 gap-4"
          }
        >
          {currentItems.map((clothingItem, index) => (
            <ClothesCard key={index} clothingItem={clothingItem} />
          ))}
        </div>
        <div
          className={
            darkMode
              ? "bg-gray-900 text-white flex justify-center w-full lg:space-x-10"
              : "bg-white text-gray-900 flex justify-center w-full lg:space-x-10"
          }
        >
          <div className="flex justify-center items-center">
            <GrFormPrevious
              className={darkMode ? "text-xl text-white" : "text-xl text-black"}
            />
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Prev
            </button>
          </div>
          <div className="flex justify-center items-center">
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
            <GrFormNext />
          </div>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: {
      x: "-100%",
    },
    visible: {
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const circleVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.2,
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };
  return (
    <div>
      {alert && <Alert />}
      <div
        className={
          darkMode
            ? "bg-gray-900 text-white lg:flex  w-full lg:overflow-x-scroll"
            : "bg-white text-gray-900 lg:flex  w-full lg:overflow-x-scroll"
        }
      >
        <div
          className={
            darkMode
              ? "bg-gray-900 text-white flex lg:w-[60%] w-[100%] text-center mx-auto"
              : "bg-white text-gray-900 mx-auto flex lg:w-[60%] w-[100%] text-center"
          }
        >
          <div className="flex-1 lg:p-4 ">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">Shop</h1>
              <div className="mr-auto w-2/5">
                <h1 className="lg:text-2xl font-semibold underline text-left">
                  Filter by
                </h1>
                <ul className="lg:space-y-3">
                  <motion.li
                    onClick={handleToggleColors}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    Color {plusMinus}
                  </motion.li>
                  {showColors && (
                    <motion.div
                      className="flex justify-start items-start mt-4 w-screen lg:w-1/2"
                      variants={containerVariants}
                      initial="hidden"
                      animate={showColors ? "visible" : "hidden"}
                    >
                      <motion.span
                        variants={circleVariants}
                        className="inline-block w-6 h-6 rounded-full bg-red-500"
                        onClick={() => handleColorClick("red")}
                      ></motion.span>
                      <motion.span
                        variants={circleVariants}
                        className="inline-block w-6 h-6 rounded-full bg-blue-500 ml-4"
                        onClick={() => handleColorClick("blue")}
                      ></motion.span>
                      <motion.span
                        variants={circleVariants}
                        className="inline-block w-6 h-6 rounded-full bg-green-500 ml-4"
                        onClick={() => handleColorClick("green")}
                      ></motion.span>
                      <motion.span
                        variants={circleVariants}
                        className="inline-block w-6 h-6 rounded-full bg-yellow-500 ml-4"
                        onClick={() => handleColorClick("yellow")}
                      ></motion.span>
                      <motion.span
                        variants={circleVariants}
                        className="inline-block w-6 h-6 rounded-full bg-purple-500 ml-4"
                        onClick={() => handleColorClick("purple")}
                      ></motion.span>
                      <motion.span
                        key="reset" // Use a unique key prop for the reset button
                        variants={circleVariants}
                        className={`inline-block text-sm font-medium mx-2 ${
                          selectedColor === defaultColor
                            ? " text-gray-600 cursor-default"
                            : " text-red-500 hover:bg-gray-700 cursor-pointer"
                        }`}
                        onClick={() => handleColorClick("reset")}
                      >
                        Reset
                      </motion.span>
                    </motion.div>
                  )}
                </ul>
              </div>
              <select
                className={
                  darkMode
                    ? "bg-gray-900 text-white w-1/5 ml-auto border-black"
                    : "bg-white text-gray-900 w-1/5 ml-auto border-black"
                }
                value={sortBy}
                onChange={handleSortByChange}
              >
                <option value="newest">Newest</option>
                <option value="lowtohigh">Price (low to high)</option>
                <option value="hightolow">Price (high to low)</option>
                <option value="az">Name A-Z</option>
                <option value="za">Name Z-A</option>
              </select>
            </div>

            <div>
              <ClothesList clothes={clothes} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
