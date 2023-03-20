import React from 'react'
import {auth,GoogleAuth} from '../component/firebase';
import {createUserWithEmailAndPassword,signInWithPopup,signOut} from 'firebase/auth'
import { useState } from 'react';
import { useEffect } from 'react';
import { BsGoogle,BsFacebook,BsTwitter} from "react-icons/bs";
export const Login = () => {
    const SignIn= async ()=>
    {
      try{
      await createUserWithEmailAndPassword(auth,email,password);
      }
      catch(err)
      {
        console.error(err);
      }
    };
    const SignInWithGoogle= async ()=>
    {
      try{
      await signInWithPopup(auth,GoogleAuth);
      }
      catch(err)
      {
        console.error(err);
      }
    };
    const Logout= async ()=>
    {
      try{
        await signOut(auth);
        }
        catch(err)
        {
          console.error(err);
        }
    }

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
  return (
    <div className='w-full h-[80vh] flex flex-col justify-center items-center space-y-3 '>
        <div className='text-center space-y-10 w-1/2 justify-center items-center flex flex-col bg-slate-700 h-[50vh] text-black'>
         <h1 className='text-3xl font-semibold text-white'>Login</h1>
                <div className='flex flex-col space-y-5 w-1/4'>
                <input className='rounded-2xl' type='email' placeholder='email' onChange={(event)=>
                {
                    setEmail(event.target.value)
                }}></input><br/>
                <input className='rounded-2xl' type='password' placeholder='password' onChange={(event)=>
                {
                    setPassword(event.target.value)
                }}></input><br/>
                <button className='bg-slate-400 rounded-2xl font-bold py-2 border-black border-2 hover:bg-black hover:text-white duration-500 ease-in' type='submit' onClick={SignIn
                }>Login</button><br/>
                {/* <button type='submit' onClick={SignInWithGoogle}><BsGoogle/></button> */}
                <div className='flex flex-row items-center justify-center space-x-5'>
                <p className='text-2xl cursor-pointer' onClick={SignInWithGoogle}><BsGoogle/></p>
                <p className='text-2xl'><BsFacebook/></p>
                <p className='text-2xl'><BsTwitter/></p>
                </div>
                </div>
                </div>
    </div>
  )
}
