import React, { useState ,useContext, useEffect,useMemo} from 'react'
import { motion } from 'framer-motion';
import ThemeContext from './ThemeContext';
import { GrFormNext,GrFormPrevious } from "react-icons/gr";
import clothes from './clothes.json';
import ItemPreview from './ItemPreview';
export const Shop = () => {
   const { showCart, setShowCart} = useContext(ThemeContext);
    const [showColors, setShowColors] = useState(false);
    const [plusMinus, setPlusMinus] = useState('+');
    const [plusMinusSize, setPlusMinusSize] = useState('+');
    const [showLabels, setShowLabels] = useState(false);
    const {darkMode, setDarkMode } = useContext(ThemeContext);
    const [cartItems, setCartItems] = useState([]);
    const { itemsNumber,setItemNumber} = useContext(ThemeContext);
    const [selectedColor, setSelectedColor] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const filteredClothes = selectedColor ? clothes.filter(item => item.color === selectedColor) : clothes;
    const [sortBy, setSortBy] = useState('newest');
    let totalPrice=cartItems.reduce((a,v) =>  a = a + v.price , 0 );
    const handleSortByChange = (e) => { // event handler for updating sortBy state
      setSortBy(e.target.value);
      setCurrentPage(1); // reset current page when sorting changes
    }
    const removeProduct = (productToRemove) => {
      setCartItems(prevCartItems =>
        prevCartItems.filter(product => product.cartId !== productToRemove.cartId)
      );
    }
    const sortedClothes = useMemo(() => { // sort clothes based on sortBy state
      switch (sortBy) {
        case 'lowtohigh':
          return [...filteredClothes].sort((a, b) => a.price - b.price);
        case 'hightolow':
          return [...filteredClothes].sort((a, b) => b.price - a.price);
        case 'az':
          return [...filteredClothes].sort((a, b) => a.name.localeCompare(b.name));
        case 'za':
          return [...filteredClothes].sort((a, b) => b.name.localeCompare(a.name));
        default:
          return filteredClothes;
      }
    }, [filteredClothes, sortBy]);
    const defaultColor = ''; // Set the default color here


      const handleColorClick = color => {
        setSelectedColor(color === 'reset' ? defaultColor : color);
        setCurrentPage(1);
      };
      const AddProduct=(product)=>
      {
        const cartId = Date.now().toString(); // generate a unique ID for the cart item
        const item = { ...product, cartId }; // add the ID to the product
        setCartItems(prevCartItems => [...prevCartItems,{...item}]);
      }
      
      useEffect(() => {
        setItemNumber(cartItems.length);
        window.localStorage.setItem('itemsPrice', JSON.stringify(cartItems));
        console.log(showCart);
      }, [cartItems]);
      
    const handleToggleColors = () => {
      setShowColors(!showColors);
      setPlusMinus(showColors ? '+' : '-');
    };
    function ClothesCard({ clothingItem }) {
      return (
        <div className="w-full lg:w-full md:w-1/2 p-4 ">
          <div className={darkMode ? 'bg-gray-900 text-white rounded-lg overflow-hidden shadow-lg' : 'bg-white text-gray-900 rounded-lg overflow-hidden shadow-lg'}>
            <div className="w-full lg:h-[20vh] bg-gray-200">
              <img src={clothingItem.image} alt={clothingItem.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium">{clothingItem.name}</h3>
              <p className="font-medium">${clothingItem.price}</p>
              <p
                 className={`inline-block w-6 h-6 rounded-full ${
                  clothingItem.color === 'black'
                    ? 'bg-black'
                    : clothingItem.color === 'white'
                      ? 'bg-white'
                      : `bg-${clothingItem.color}-500`
                }`}
              ></p><br/>
              <div className='space-x-3 sm:space-x-0'>
               <ItemPreview item={clothingItem} />
              <button onClick={()=>AddProduct(clothingItem)} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Add to Cart</button>
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
        <div className=''>
          <div className={darkMode ? 'bg-gray-900 text-white grid lg:grid-cols-4 md:grid-cols-2 gap-4 ': 'bg-white text-gray-900 grid lg:grid-cols-4 md:grid-cols-2 gap-4'}>
            {currentItems.map((clothingItem, index) => (
              <ClothesCard key={index} clothingItem={clothingItem} />
            ))}
          </div>
          <div className={darkMode ? 'bg-gray-900 text-white flex justify-center w-full lg:space-x-10' : 'bg-white text-gray-900 flex justify-center w-full lg:space-x-10'}>
            <div className='flex justify-center items-center'>
              <GrFormPrevious className={darkMode ? 'text-xl text-white':'text-xl text-black'}/>
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                Prev
              </button>
            </div>
            <div className='flex justify-center items-center'>
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
    
    

    const handleToggleLabels = () => {
        setShowLabels(!showLabels);
        setPlusMinusSize(showLabels ? '+' : '-');
      }
      const labelVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
      };
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
            ease: 'easeOut',
          },
        },
      };
  return (
    <div>
    <div className={darkMode ? 'bg-gray-900 text-white lg:flex  w-full h-[125vh] lg:overflow-x-scroll' : 'bg-white text-gray-900 lg:flex  w-full h-[125vh] lg:overflow-x-scroll'}>
      <div className="lg:w-1/4 p-4 flex flex-col lg:flex lg:flex-col lg:justify-center lg:items-center lg:space-y-3 relative">
        <h1 className='lg:text-2xl font-semibold underline'>Filter by</h1>
        <ul className='lg:space-y-3'>
            <motion.li  onClick={handleToggleColors}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    style={{ display: 'flex', alignItems: 'center' }}
            >Color {plusMinus}</motion.li>
                {showColors && (
                    <motion.div className="flex justify-center items-center mt-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate={showColors ? 'visible' : 'hidden'}>
                    <motion.span
                      variants={circleVariants}
                      className="inline-block w-6 h-6 rounded-full bg-red-500"
                      onClick={() => handleColorClick('red')}></motion.span>
                    <motion.span
                      variants={circleVariants}
                      className="inline-block w-6 h-6 rounded-full bg-blue-500 ml-4"
                      onClick={() => handleColorClick('blue')}></motion.span>
                    <motion.span
                      variants={circleVariants}
                      className="inline-block w-6 h-6 rounded-full bg-green-500 ml-4"
                      onClick={() => handleColorClick('green')}></motion.span>
                    <motion.span
                      variants={circleVariants}
                      className="inline-block w-6 h-6 rounded-full bg-yellow-500 ml-4"
                      onClick={() => handleColorClick('yellow')}></motion.span>
                    <motion.span
                      variants={circleVariants}
                      className="inline-block w-6 h-6 rounded-full bg-purple-500 ml-4"
                      onClick={() => handleColorClick('purple')}></motion.span>
                    <motion.span
                      key="reset" // Use a unique key prop for the reset button
                      variants={circleVariants}
                      className={`inline-block text-sm font-medium mx-2 ${selectedColor === defaultColor ? ' text-gray-600 cursor-default' : ' text-red-500 hover:bg-gray-700 cursor-pointer'}`}
                      onClick={() => handleColorClick('reset')}
                    >
                      Reset
                    </motion.span>
                    </motion.div>
            )}
        <motion.li 
        onClick={handleToggleLabels}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ display: 'flex', alignItems: 'center' }}>Size{plusMinusSize}</motion.li>
        {showLabels && (
        <div className="flex justify-center items-center mt-4">
          <motion.span
            className="text-xs font-semibold bg-gray-300 rounded-full px-2 py-1 mx-2"
            variants={labelVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
          >
            XS
          </motion.span>
          <motion.span
            className="text-xs font-semibold bg-gray-300 rounded-full px-2 py-1 mx-2"
            variants={labelVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6 }}
          >
            X
          </motion.span>
          <motion.span
            className="text-xs font-semibold bg-gray-300 rounded-full px-2 py-1 mx-2"
            variants={labelVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.7 }}
          >
            L
          </motion.span>
          <motion.span
            className="text-xs font-semibold bg-gray-300 rounded-full px-2 py-1 mx-2"
            variants={labelVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8 }}
          >
            XL
          </motion.span>
        </div>
      )}

        </ul>
      </div>
          <div className={darkMode ? 'bg-gray-900 text-white flex lg:w-[60%] w-[100%] text-center' : 'bg-white text-gray-900 flex lg:w-[60%] w-[100%] text-center'}>
            <div className="flex-1 lg:p-4 ">
            <div className='flex flex-col'>
          <h1 className='text-3xl font-bold'>Shop</h1>
            <select
              className={darkMode ? 'bg-gray-900 text-white w-1/5 ml-auto border-black' : 'bg-white text-gray-900 w-1/5 ml-auto border-black'}
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
          {showCart && 
          (
          <motion.div className="absolute top-[15%] sm:right-[25%] w-2/2 lg:w-1/2 bg-gray-700"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration:0.5
            }}>
              <div className='flex justify-end w-[100%]'>
              <span className='text-2xl cursor-pointer' onClick={()=>{setShowCart(false)}}>X</span>
              </div>
             <h2 className='text-2xl font-semibold'>Shopping Cart</h2>
            <div className='flex flex-col'>
              {cartItems.map((item) => (
                <div className='flex '>
                  <img src={item.image} alt={item.name} className='h-[15vh] w-[20%]'></img>
                  <div className='flex flex-col '>
                  <p className='font-bold'>{item.name}</p>
                  <p className='font-semibold'>{item.price}</p>
                  <p className='bg-red-500 text-center rounded-2xl py-1' onClick={()=>removeProduct(item)}>Remove</p>
                  </div>
                </div>
              ))}
              </div>
            <p className='font-semibold'>Subtotal:${totalPrice}</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Checkout</button>
          </motion.div>
            )
            }
    </div>
    </div>
  )
}
