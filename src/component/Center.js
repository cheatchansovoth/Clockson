import React,{ useState, useEffect } from 'react'
import { motion } from "framer-motion";
import img from '../component/Fashion-Model-Man-PNG-Image.png'
import img1 from '../component/e78047661f7e657fb861f2586f1bcd59.png'
export const Center = () => {
    const images = [
        img,
        img1,
      ];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentImageIndex((currentImageIndex + 1) % images.length);
      }, 3000);
  
      return () => clearInterval(intervalId);
    }, [currentImageIndex]);
  
    return (
        <div className="w-full">
        {images.map((imageUrl, index) => (
          <motion.img
            key={imageUrl}
            src={imageUrl}
            alt="carousel"
            className="absolute  h-[50vh]"
            initial={{ x: currentImageIndex === index ? 0 : "100%" }}
            animate={{ x: currentImageIndex === index ? 0 : "-100%" }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
          />
        ))}
      </div>
  )
}
