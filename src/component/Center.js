import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import {
  BsFacebook,
  BsTwitter,
  BsInstagram,
  BsPinterest,
} from "react-icons/bs";
import ThemeContext from "./ThemeContext";
import { useNavigate } from "react-router-dom";
export const Center = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  return (
    <div
      style={{ overflow: "hidden" }}
      className={
        darkMode
          ? "bg-gray-900 text-white duration-500"
          : "bg-white text-gray-900 duration-500"
      }
    >
      <motion.div
        class="bg-[url('https://static.wixstatic.com/media/84770f_b5b78cd83b6342199b7370a2ba6b9e06.jpg/v1/fill/w_1920,h_601,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/84770f_b5b78cd83b6342199b7370a2ba6b9e06.jpg')] bg-cover bg-center h-[30vh] lg:h-[50vh]"
        initial={{ opacity: 0, x: "100%" }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="flex text-center justify-center items-center h-[30vh] lg:h-[50vh]">
          <motion.div
            className={
              darkMode
                ? "bg-slate-800  p-[6%] px-[20%] lg:p-[3%] lg:px-[8%] bg-opacity-75 lg:space-y-5 space-y-2 duration-500"
                : "bg-slate-100  p-[6%] px-[20%] lg:p-[3%] lg:px-[8%] bg-opacity-75 lg:space-y-5 space-y-2 duration-500"
            }
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <h1 className="lg:text-5xl font-bold font-mono text-2xl tracking-wide">
              FALL & WINTER
            </h1>
            <button
              className="bg-black text-white px-[14%] p-[2%] hover:bg-slate-800 duration-500"
              onClick={() => navigate("/shop")}
            >
              Shop Now
            </button>
          </motion.div>
        </div>
      </motion.div>
      <div className="text-center space-y-3 m-[5%]">
        <h1 className="text-2xl font-bold tracking-widest">YEAR ROUND</h1>
        <div></div>
        <h1 className="tracking-widest">Must Have Items</h1>
      </div>
      <div className="grid lg:grid-cols-3 grid-cols-1 sm:grid-cols-2  lg:h-[50vh] lg:place-items-center">
        <motion.div
          className="relative bg-[url('https://static.wixstatic.com/media/cda177_f95b14c95d6446de847782f0b6fd0027.png/v1/fill/w_299,h_353,al_c,q_90,usm_0.66_1.00_0.01/cda177_f95b14c95d6446de847782f0b6fd0027.webp')] bg-right-top flex flex-col justify-end text-center bg-cover lg:bg-no-repeat h-[50vh] lg:w-[50%] lg:h-[40vh] transition-transform duration-500 ease-in-out hover:transform hover:scale-110"
          initial={{ opacity: 0, x: "-100%" }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <p className="bg-black text-white p-3 font-semibold tracking-widest">
            MIDI PLEATED SKIRT
          </p>
        </motion.div>
        <motion.div
          className="bg-[url('https://static.wixstatic.com/media/cda177_b5a795ade21b41d38cadd836824e6768.jpg/v1/fill/w_292,h_385,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/cda177_b5a795ade21b41d38cadd836824e6768.jpg')] bg-bottom flex flex-col items-center bg-cover  lg:bg-no-repeat lg:w-[50%] h-[50vh] lg:h-[40vh] transition-transform duration-500 ease-in-out hover:transform hover:scale-110"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="translate-y-7 text-2xl font-semibold tracking-widest">
            Sale
          </p>
        </motion.div>
        <motion.div
          className="bg-[url('https://static.wixstatic.com/media/84770f_9a81715dcb4b43fa936d243fcd90e2a9.png/v1/fill/w_289,h_328,al_c,q_90,usm_0.66_1.00_0.01/84770f_9a81715dcb4b43fa936d243fcd90e2a9.webp')] flex flex-col justify-end text-center bg-cover bg-bottom lg:bg-no-repeat lg:w-[50%] h-[50vh] lg:h-[40vh] transition-transform duration-500 ease-in-out hover:transform hover:scale-110"
          initial={{ opacity: 0, x: "100%" }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p className="bg-black text-white p-3 font-semibold tracking-widest">
            MIDI PLEATED SKIRT
          </p>
        </motion.div>
      </div>
      <motion.div
        className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:place-items-center lg:h-[50vh] bg-black text-white h-[50vh] place-items-center"
        initial={{ x: "100%" }}
        whileInView={{ x: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="flex flex-col items-center space-y-2 lg:space-y-5">
          <p>Stay Connected</p>
          <div></div>
          <div className="flex justify-center space-x-5 text-3xl">
            <BsFacebook />
            <BsTwitter />
            <BsInstagram />
            <BsPinterest />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center space-y-3 lg:space-y-5">
          <p>BE OUR FRIEND</p>
          <div className="flex flex-col space-y-3 lg:space-y-5">
            <input
              className="bg-slate-500 bg-opacity-60 py-1 placeholder:text-slate-100 placeholder:text-left pl-5 rounded-xl"
              placeholder="Enter your email here"
            ></input>
            <button className="bg-slate-400  hover:bg-slate-300 duration-500 ease-in-out rounded-xl text-sm">
              Subscribe Now
            </button>
          </div>
        </div>
        <div className="lg:space-y-5 text-center">
          <p>NEED ASSISTANCE?</p>
          <p>123-456-7890</p>
          <p>info@mysite.com</p>
        </div>
      </motion.div>
    </div>
  );
};
