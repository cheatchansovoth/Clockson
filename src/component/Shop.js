import React, { useState } from 'react'
import { motion } from 'framer-motion';

export const Shop = () => {
    const [showColors, setShowColors] = useState(false);
    const [plusMinus, setPlusMinus] = useState('+');
    const [plusMinusSize, setPlusMinusSize] = useState('+');
    const [showLabels, setShowLabels] = useState(false);

    const handleToggleColors = () => {
      setShowColors(!showColors);
      setPlusMinus(showColors ? '+' : '-');
    };

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
    <div className='w-screen text-center'>
    <div className="lg:flex h-[80vh] w-full ">
      <div className="lg:w-1/4 p-4 flex flex-col lg:flex lg:flex-col lg:justify-center lg:items-center lg:space-y-3">
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
                    className="inline-block w-6 h-6 rounded-full bg-red-500"></motion.span>
                    <motion.span 
                    variants={circleVariants}
                    className="inline-block w-6 h-6 rounded-full bg-blue-500 ml-4"></motion.span>
                    <motion.span 
                    variants={circleVariants}
                    className="inline-block w-6 h-6 rounded-full bg-green-500 ml-4"></motion.span>
                    <motion.span 
                    variants={circleVariants}
                    className="inline-block w-6 h-6 rounded-full bg-yellow-500 ml-4"></motion.span>
                    <motion.span 
                    variants={circleVariants}
                    className="inline-block w-6 h-6 rounded-full bg-purple-500 ml-4"></motion.span>
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
      <div className="flex w-[60%]">
        <div className="flex-1 p-4 ">
            <h1 className="text-center">Menu</h1>
            <ul className="text-center">
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            </ul>
        </div>
        </div>
    </div>
    </div>
  )
}
