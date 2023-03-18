import React,{ useState, useEffect } from 'react'
import { motion } from "framer-motion";
export const Center = () => {

  
    return (
      <div>
        <div class="bg-[url('https://static.wixstatic.com/media/84770f_b5b78cd83b6342199b7370a2ba6b9e06.jpg/v1/fill/w_1920,h_601,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/84770f_b5b78cd83b6342199b7370a2ba6b9e06.jpg')] bg-cover bg-center h-[30vh] lg:h-[50vh]">
          <div className='flex text-center justify-center items-center h-[30vh] lg:h-[50vh]'>
            <div className='bg-slate-100  p-[6%] px-[20%] lg:p-[3%] lg:px-[8%] bg-opacity-75 lg:space-y-5 space-y-2'>
              <h1 className='lg:text-5xl font-bold font-mono text-2xl tracking-wide'>FALL & WINTER</h1>
              <button className='bg-black text-white px-[14%] p-[2%]'>Shop Now</button>
            </div>
          </div>
        </div>
        <div className='text-center space-y-3 m-[5%]'>
          <h1 className='text-2xl font-bold tracking-widest'>YEAR ROUND</h1>
          <div></div>
          <h1 className='tracking-widest'>Must Have Items</h1>
        </div>
        <div className='grid lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 h-[100vh] lg:h-[40vh] lg:place-items-center'>
          <div className="relative bg-[url('https://static.wixstatic.com/media/cda177_f95b14c95d6446de847782f0b6fd0027.png/v1/fill/w_299,h_353,al_c,q_90,usm_0.66_1.00_0.01/cda177_f95b14c95d6446de847782f0b6fd0027.webp')] bg-right-top flex flex-col justify-end text-center bg-cover lg:bg-no-repeat lg:w-[50%] lg:h-[40vh] transition-transform duration-500 ease-in-out hover:transform hover:scale-125">
            <p className='bg-black text-white p-3 font-semibold tracking-widest'>MIDI PLEATED SKIRT</p>
          </div>
          <div className="bg-[url('https://static.wixstatic.com/media/cda177_b5a795ade21b41d38cadd836824e6768.jpg/v1/fill/w_292,h_385,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/cda177_b5a795ade21b41d38cadd836824e6768.jpg')] bg-bottom flex flex-col items-center bg-cover  lg:bg-no-repeat lg:w-[50%] lg:h-[40vh] transition-transform duration-500 ease-in-out hover:transform hover:scale-125">
          <p className='translate-y-7 text-2xl font-semibold tracking-widest'>Sale</p>
          </div>
          <div className="bg-[url('https://static.wixstatic.com/media/84770f_9a81715dcb4b43fa936d243fcd90e2a9.png/v1/fill/w_289,h_328,al_c,q_90,usm_0.66_1.00_0.01/84770f_9a81715dcb4b43fa936d243fcd90e2a9.webp')] flex flex-col justify-end text-center bg-cover bg-bottom lg:bg-no-repeat lg:w-[50%] lg:h-[40vh] transition-transform duration-500 ease-in-out hover:transform hover:scale-125">
          <p className='bg-black text-white p-3 font-semibold tracking-widest'>MIDI PLEATED SKIRT</p>
          </div>
        </div>
      </div>
  )
}
