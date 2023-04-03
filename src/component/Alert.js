import React, { useState } from "react";
import { TiTick } from "react-icons/ti";
import { MdRemoveCircle } from "react-icons/md";
import { motion } from "framer-motion";
export const Alert = ({ show }) => {
  const [isVisible, setIsVisible] = useState(show);
  return isVisible ? (
    <div className="absolute z-50 w-screen">
      <div className="flex justify-center xl:justify-end w-[80%] xl:w-[80%] mx-auto">
        <motion.div
          className="bg-slate-500 flex items-center rounded-3xl fixed"
          animate={{
            opacity: [0, 1],
            transition: {
              duration: 0.3,
            },
          }}
        >
          <p className="flex items-center p-3">
            Item has added to the bucket
            <span className="text-3xl text-green-400">
              <TiTick />
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  ) : (
    <div className="absolute z-50 w-screen">
      <div className="flex justify-center xl:justify-end w-[80%] xl:w-[80%] mx-auto">
        <motion.div
          className="bg-slate-500 flex items-center rounded-3xl fixed"
          animate={{
            opacity: [0, 1],
            transition: {
              duration: 0.3,
            },
          }}
        >
          <p className="flex items-center p-3">
            Item has removed from to the bucket
            <span className="text-3xl text-red-400">
              <MdRemoveCircle />
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};
