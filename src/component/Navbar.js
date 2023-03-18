import React,{useState,useContext, useEffect} from 'react'
// import { GiHamburgerMenu } from "react-icons/gi";
import { motion } from "framer-motion";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdDarkMode } from "react-icons/md";
import ThemeContext from './ThemeContext';

export const Navbar = () => {

    
    const [show, setShow] = useState(false);

    const toggleShow = () => {
      setShow(!show);
    };
    const { darkMode, setDarkMode } = useContext(ThemeContext);
  return (
            <div
            className={darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}
            >
                <motion.div className='flex flex-row h-[50px] items-center  justify-between lg:flex lg:flex-row lg:justify-center lg:items-center text-center lg:p-10'
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration:0.5
                        }}>
                    <div className='w-[50%] flex items-center'>
                    <h1 className={darkMode ? 'bg-gray-900 text-white  text-2xl font-bold' : 'bg-white text-black text-2xl font-bold'}><span>Clock</span></h1>
                    <motion.p className='text-2xl font-bold' 
                    animate={{
                        y: [0, -50, 0], 
                        rotate: [0, 0, 30], // Rotate the element 90 degrees as it goes up// Move the element down by 50 pixels, then back up to its original position
                        transition: {
                        duration: 1, // Change the duration of each animation
                        repeat: Infinity, // Repeat the animation infinitely
                        repeatDelay: 5, // Delay the start of the next animation by 3 seconds
                        },
                    }}><span className={darkMode ? 'bg-gray-900 text-white' : 'bg-white text-red-400'}>S</span>o<span className={darkMode ? 'bg-gray-900 text-white' : 'bg-white text-red-400'}>N</span></motion.p>
                    </div>
                    <div className='my-6 h-[20%]  hover:text-slate-500 lg:hidden'>
                    {/* <GiHamburgerMenu onClick={toggleShow}/> */}
                    </div>
                    <div className='hidden lg:flex space-x-10 w-[50%]'>
                        <a href='#' className='text-slate-400 hover:text-slate-100 cursor-pointer font-semibold '>Home</a>
                        <a href='#' className='text-slate-400 hover:text-slate-100 cursor-pointer font-semibold '>Shop</a>
                        <a href='#' className='text-slate-400 hover:text-slate-100 cursor-pointer font-semibold '>Pages</a>
                        <a href='#' className='text-slate-400 hover:text-slate-100 cursor-pointer font-semibold '>Blog</a>
                        <a href='#' className='text-slate-400 hover:text-slate-100 cursor-pointer font-semibold '>Contact</a>
                    </div>
                    <div className='lg:flex-row lg:justify-end lg:space-x-5 lg:space-y-0 lg:w-[10%] lg: mr-[10%] hidden lg:flex'>
                        <div className='w-[20%] flex justify-center items-center'>
                        <p className='text-2xl '><AiOutlineShoppingCart/></p>
                        <a href='#' className='font-bold'>$0.00</a>
                        </div>
                        <p className='text-2xl' onClick={() => setDarkMode(!darkMode)}><MdDarkMode/></p>
                    </div>
                    <div className='flex items-center justify-center lg:hidden'>
                        <p className='text-2xl'><AiOutlineShoppingCart/></p>
                        <a href='#' className='font-bold'>$0.00</a>
                    </div>
                    <p className='text-2xl lg:hidden'  onClick={() => setDarkMode(!darkMode)}><MdDarkMode/></p>
                </motion.div>
                 {show && 
                 (
                    <div className='flex flex-col h-[200px] items-center space-y-3 justify-center lg:flex-row lg:justify-end lg:space-x-5 lg:space-y-0 lg:w-[70%] lg:mr-[10%] lg:flex lg:hidden'
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.1,
                      ease: [0, 0.71, 0.2, 1.01]
                    }}
                    >
                    <a href='#' className='text-slate-400 font-semibold'>Home</a>
                    <a href='#' className='text-slate-400 font-semibold'>Shop</a>
                    <a href='#' className='text-slate-400 font-semibold'>Pages</a>
                    <a href='#' className='text-slate-400 font-semibold'>Blog</a>
                    <a href='#' className='text-slate-400 font-semibold'>Contact</a>
                    </div>
                )
                }
            </div>
    
  )
}
