import React, { useState, useContext, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import ThemeContext from "./ThemeContext";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { BsFillGrid3X3GapFill, BsFillGridFill } from "react-icons/bs";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
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
  const [itemsPerPage, setitemsPerPage] = useState(8);
  const [priceSelection, setPriceSelection] = useState(false);
  const [clothesSelection, setClothesSelection] = useState(false);
  const [sizeSelection, setSizeSelection] = useState(false);
  const [colorSelection, setColorSelection] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const onClickSlide = (number) => {
    setitemsPerPage(number);
  };
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

  const handleToggleColors = () => {
    setShowColors(!showColors);
    setPlusMinus(showColors ? "+" : "-");
  };
  const handlePriceSelection = () => {
    setPriceSelection(!priceSelection);
  };
  const handleClothesSelection = () => {
    setClothesSelection(!clothesSelection);
  };
  const handleSizeSelection = () => {
    setSizeSelection(!sizeSelection);
  };
  const handleColorSelection = () => {
    setColorSelection(!colorSelection);
  };
  const handleShowFilter = () => {
    setShowFilter(!showFilter);
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
          <div className="w-full lg:h-[30vh] bg-gray-200">
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
            <p>Colour Available</p>
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
      <div className="min-h-screen">
        <div
          className={
            darkMode
              ? "bg-gray-900 text-white grid lg:grid-cols-6 md:grid-cols-2 gap-4 "
              : "bg-white text-gray-900 grid lg:grid-cols-6 md:grid-cols-2 gap-4 "
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
      <div className="w-[100%] lg:w-[80%] mx-auto my-2">
        <hr></hr>
        <ul className="flex text-sm lg:w-[60%] justify-between mx-auto p-4">
          <li className="font-semibold">Sale Clothing</li>
          <li className="font-semibold">Sale Dressed</li>
          <li className="font-semibold">Sale Curve</li>
          <li className="font-semibold">Sale Accessories</li>
          <li className="font-semibold">Sale Bags</li>
          <li className="font-semibold">Sale Shoes</li>
        </ul>
        <hr></hr>
      </div>
      <div className="w-screen flex flex-col xl:flex-row">
        <div className="sm:w-1/4 xl:h-[100%]">
          <div className="flex text-sm font-semibold justify-center">
            <p>Home ></p>
            <p>Shop</p>
          </div>
          <div className="w-[100%] flex flex-col justify-center items-center space-y-5">
            <div className="flex items-center justify-between xl:w-[30%]">
              <h1 className="xl:text-2xl text-slate-400 my-5">Filter By</h1>
              <span
                className="xl:text-2xl text-slate-400 my-5 xl:hidden cursor-pointer"
                onClick={handleShowFilter}
              >
                +
              </span>
            </div>
            {showFilter && (
              <div className="w-[80%] xl:w-[100%] mx-auto flex flex-col justify-center xl:items-center">
                <div className="w-[30%] space-y-3">
                  <div className="flex w-[100%] justify-between">
                    <h2 className="text-xl">Price</h2>
                    <p
                      className="text-xl cursor-pointer"
                      onClick={handlePriceSelection}
                    >
                      +
                    </p>
                  </div>
                  {priceSelection && (
                    <motion.div
                      className="space-y-1 w-screen mx-auto grid grid-cols-2 gap-5"
                      animate={{
                        opacity: [0, 1],
                        transition: {
                          duration: 1,
                        },
                      }}
                    >
                      <div className="w-[100%] flex items-center space-x-3">
                        <input type="checkbox" />
                        <label>Over $100</label>
                      </div>
                      <div className="w-[100%] flex items-center space-x-3">
                        <input type="checkbox" />
                        <label>Under $100</label>
                      </div>
                      <div className="w-[100%] flex items-center space-x-3">
                        <input type="checkbox" />
                        <label>Under $80</label>
                      </div>
                      <div className="w-[100%] flex items-center space-x-3">
                        <input type="checkbox" />
                        <label>Under $50</label>
                      </div>
                      <div className="w-[100%] flex items-center space-x-3">
                        <input type="checkbox" />
                        <label>Under $50</label>
                      </div>
                      <div className="w-[100%] flex items-center space-x-3">
                        <input type="checkbox" />
                        <label>Under $15</label>
                      </div>
                    </motion.div>
                  )}
                  <hr></hr>
                </div>
                <div className="w-[30%] space-y-3">
                  <div className="flex w-[100%] justify-between">
                    <h2 className="text-xl">Categories</h2>
                    <p
                      className="text-xl cursor-pointer"
                      onClick={handleClothesSelection}
                    >
                      +
                    </p>
                  </div>
                  {clothesSelection && (
                    <motion.div
                      className="space-y-1 w-screen mx-auto grid grid-cols-2 gap-5"
                      animate={{
                        opacity: [0, 1],
                        transition: {
                          duration: 1,
                        },
                      }}
                    >
                      <div className="w-[100%] flex items-center space-x-3 text-sm">
                        <input type="checkbox" />
                        <label>Sale Clothing</label>
                      </div>
                      <div className="w-[100%] flex items-center space-x-3">
                        <input type="checkbox" />
                        <label>Sale Curve</label>
                      </div>
                      <div className="w-[100%] flex items-center space-x-3">
                        <input type="checkbox" />
                        <label>Sale Accessories </label>
                      </div>
                      <div className="w-[100%] flex items-center space-x-3">
                        <input type="checkbox" />
                        <label>Sale Shoes</label>
                      </div>
                      <div className="w-[100%] flex items-center space-x-3">
                        <input type="checkbox" />
                        <label>Sale Bags</label>
                      </div>
                    </motion.div>
                  )}
                  <hr></hr>
                </div>
                <div className="w-[30%] space-y-3">
                  <div className="flex w-[100%] justify-between">
                    <h2 className="text-xl">Size</h2>
                    <p
                      className="text-xl cursor-pointer"
                      onClick={handleSizeSelection}
                    >
                      +
                    </p>
                  </div>
                  {sizeSelection && (
                    <motion.div
                      className="space-y-1 w-screen mx-auto grid grid-cols-2 gap-5"
                      animate={{
                        opacity: [0, 1],
                        transition: {
                          duration: 1,
                        },
                      }}
                    >
                      <div className="w-[100%] flex items-center space-x-3">
                        <input type="checkbox" />
                        <label>S</label>
                      </div>
                      <div className="w-[100%] flex items-center space-x-3">
                        <input type="checkbox" />
                        <label>L</label>
                      </div>
                      <div className="w-[100%] flex items-center space-x-3">
                        <input type="checkbox" />
                        <label>M</label>
                      </div>
                      <div className="w-[100%] flex items-center space-x-3 text-sm">
                        <input type="checkbox" />
                        <label>X</label>
                      </div>
                      <div className="w-[100%] flex items-center space-x-3">
                        <input type="checkbox" />
                        <label>XS</label>
                      </div>
                      <div className="w-[100%] flex items-center space-x-3">
                        <input type="checkbox" />
                        <label>XL </label>
                      </div>
                    </motion.div>
                  )}
                  <hr></hr>
                </div>
                <div className="w-[30%] space-y-3">
                  <div className="flex w-[100%] justify-between">
                    <h2 className="text-xl">Colours</h2>
                    <p
                      className="text-xl cursor-pointer"
                      onClick={handleColorSelection}
                    >
                      +
                    </p>
                  </div>
                  {colorSelection && (
                    <motion.div>
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
                  <hr></hr>
                </div>
              </div>
            )}
            <div className="w-[80%] xl:w-[100%] mx-auto xl:flex flex-col justify-center xl:items-center hidden">
              <div className="w-[30%] space-y-3">
                <div className="flex w-[100%] justify-between">
                  <h2 className="text-xl">Price</h2>
                  <p
                    className="text-xl cursor-pointer"
                    onClick={handlePriceSelection}
                  >
                    +
                  </p>
                </div>
                {priceSelection && (
                  <motion.div
                    className="space-y-1 w-4/5 mx-auto"
                    animate={{
                      opacity: [0, 1],
                      transition: {
                        duration: 1,
                      },
                    }}
                  >
                    <div className="w-[100%] flex items-center space-x-3">
                      <input type="checkbox" />
                      <label>Over $100</label>
                    </div>
                    <div className="w-[100%] flex items-center space-x-3">
                      <input type="checkbox" />
                      <label>Under $100</label>
                    </div>
                    <div className="w-[100%] flex items-center space-x-3">
                      <input type="checkbox" />
                      <label>Under $80</label>
                    </div>
                    <div className="w-[100%] flex items-center space-x-3">
                      <input type="checkbox" />
                      <label>Under $50</label>
                    </div>
                    <div className="w-[100%] flex items-center space-x-3">
                      <input type="checkbox" />
                      <label>Under $50</label>
                    </div>
                    <div className="w-[100%] flex items-center space-x-3">
                      <input type="checkbox" />
                      <label>Under $15</label>
                    </div>
                  </motion.div>
                )}
                <hr></hr>
              </div>
              <div className="w-[30%] space-y-3">
                <div className="flex w-[100%] justify-between">
                  <h2 className="text-xl">Categories</h2>
                  <p
                    className="text-xl cursor-pointer"
                    onClick={handleClothesSelection}
                  >
                    +
                  </p>
                </div>
                {clothesSelection && (
                  <motion.div
                    className="space-y-1 w-4/5 mx-auto"
                    animate={{
                      opacity: [0, 1],
                      transition: {
                        duration: 1,
                      },
                    }}
                  >
                    <div className="w-[100%] flex items-center space-x-3 text-sm">
                      <input type="checkbox" />
                      <label>Sale Clothing</label>
                    </div>
                    <div className="w-[100%] flex items-center space-x-3">
                      <input type="checkbox" />
                      <label>Sale Curve</label>
                    </div>
                    <div className="w-[100%] flex items-center space-x-3">
                      <input type="checkbox" />
                      <label>Sale Accessories </label>
                    </div>
                    <div className="w-[100%] flex items-center space-x-3">
                      <input type="checkbox" />
                      <label>Sale Shoes</label>
                    </div>
                    <div className="w-[100%] flex items-center space-x-3">
                      <input type="checkbox" />
                      <label>Sale Bags</label>
                    </div>
                  </motion.div>
                )}
                <hr></hr>
              </div>
              <div className="w-[30%] space-y-3">
                <div className="flex w-[100%] justify-between">
                  <h2 className="text-xl">Size</h2>
                  <p
                    className="text-xl cursor-pointer"
                    onClick={handleSizeSelection}
                  >
                    +
                  </p>
                </div>
                {sizeSelection && (
                  <motion.div
                    className="space-y-1 w-4/5 mx-auto"
                    animate={{
                      opacity: [0, 1],
                      transition: {
                        duration: 1,
                      },
                    }}
                  >
                    <div className="w-[100%] flex items-center space-x-3">
                      <input type="checkbox" />
                      <label>S</label>
                    </div>
                    <div className="w-[100%] flex items-center space-x-3">
                      <input type="checkbox" />
                      <label>L</label>
                    </div>
                    <div className="w-[100%] flex items-center space-x-3">
                      <input type="checkbox" />
                      <label>M</label>
                    </div>
                    <div className="w-[100%] flex items-center space-x-3 text-sm">
                      <input type="checkbox" />
                      <label>X</label>
                    </div>
                    <div className="w-[100%] flex items-center space-x-3">
                      <input type="checkbox" />
                      <label>XS</label>
                    </div>
                    <div className="w-[100%] flex items-center space-x-3">
                      <input type="checkbox" />
                      <label>XL </label>
                    </div>
                  </motion.div>
                )}
                <hr></hr>
              </div>
              <div className="w-[30%] space-y-3">
                <div className="flex w-[100%] justify-between">
                  <h2 className="text-xl">Colours</h2>
                  <p
                    className="text-xl cursor-pointer"
                    onClick={handleColorSelection}
                  >
                    +
                  </p>
                </div>
                {colorSelection && (
                  <motion.div>
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
                <hr></hr>
              </div>
            </div>
          </div>
        </div>
        <div className="w-3/4 h-[100%] mx-auto">
          <div className="flex w-[80%] items-center justify-between">
            <div className="w-[80%] mx-auto">
              <div className="xl:flex w-[10%] justify-between hidden">
                <spa className="text-xl " onClick={() => onClickSlide(8)}>
                  <BsFillGridFill />
                </spa>
                <spa className="text-xl" onClick={() => onClickSlide(12)}>
                  <BsFillGrid3X3GapFill />
                </spa>
                <span className="text-xl " onClick={() => onClickSlide(18)}>
                  <TfiLayoutGrid4Alt />
                </span>
              </div>
            </div>
            <div className="">
              <select
                className={
                  darkMode
                    ? "bg-gray-900 text-white ml-auto border-black"
                    : "bg-white text-gray-900  ml-auto border-black"
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
          </div>
          <div>
            <ClothesList clothes={clothes} />
          </div>
        </div>
      </div>
    </div>
  );
};
