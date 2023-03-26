import React from 'react'
import {auth,GoogleAuth} from '../component/firebase';
import {signInWithEmailAndPassword,signInWithPopup,signOut} from 'firebase/auth'
import { useState } from 'react';
import { BsGoogle,BsFacebook,BsTwitter} from "react-icons/bs";
import { Link,useNavigate } from 'react-router-dom';
export const Login = () => {

  const navigate=useNavigate();
  const [Error,setError]=useState("");
    const SignIn= async ()=>
    {
      try{
         await signInWithEmailAndPassword(auth,email,password);
         const user=auth.currentUser;
         console.log(user);
         if(user)
         {
          localStorage.setItem('__userinfo',JSON.stringify(user));
          navigate('/shop');
         }
      }
      catch(err)
      {
        setError('Invalid Credentials');
      }
    };
    const SignInWithGoogle= async ()=>
    {
      try{
      await signInWithPopup(auth,GoogleAuth);
      }
      catch(err)
      {
        setError('Invalid Credentials');
      }
    };

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
  return (
    <div className='w-full h-[80vh] flex flex-col justify-center items-center space-y-3 '>
        <div className='text-center space-y-10 lg:w-1/2 w-full justify-center items-center flex flex-col bg-slate-700 h-[50vh] text-black'>
         <h1 className='text-3xl font-semibold text-white'>Login</h1>
                <div className='flex flex-col space-y-5 w-3/4 sm:w-2/4'>
                <input className='rounded-2xl bg-gray-300 focus:bg-gray-400' type='email' placeholder='email' onChange={(event)=>
                {
                    setEmail(event.target.value)
                }}></input><br/>
                <input className='rounded-2xl bg-gray-300 focus:bg-gray-400' type='password' placeholder='password' onChange={(event)=>
                {
                    setPassword(event.target.value)
                }}></input><br/>
                <button className='bg-slate-400 rounded-2xl font-bold py-2 border-black border-2 hover:bg-black hover:text-white duration-500 ease-in lg:w-2/4 lg:mx-auto' type='submit' onClick={SignIn
                }>Login</button>
                <p className='text-red-600 ease-in duration-500'>{Error}</p>
                <Link to='/resetpassword' className='text-blue-700 cursor-pointer hover:text-blue-900'>Forget password ?</Link>
                <Link to='/register' className='text-blue-700 cursor-pointer hover:text-blue-900'>Register</Link>
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
