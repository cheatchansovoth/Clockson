import React from 'react'

export const Register = () => {
  return (
    <div className='w-full h-[80vh] flex flex-col justify-center items-center space-y-3 '>
        <div className='text-center space-y-10 lg:w-1/2 w-full justify-center items-center flex flex-col bg-slate-700 h-[70vh] text-black'>
         <h1 className='text-3xl font-semibold text-white'>Register</h1>
            <form className='w-full'>
            <div className='flex flex-col space-y-5 w-3/4 lg:w-1/2 mx-auto'>
                <input type='text' placeholder='Fullname' className='bg-gray-400 rounded-2xl focus:rounded-3xl duration-500 focus:bg-gray-500'></input>
                <input type='email' placeholder='Email' className='bg-gray-400 rounded-2xl focus:rounded-3xl duration-500 focus:bg-gray-500'></input>
                <input type='password' placeholder='Password' className='bg-gray-400 rounded-2xl focus:rounded-3xl duration-500 focus:bg-gray-500'></input>
                <input type='password' placeholder='Confirm Password' className='bg-gray-400 rounded-2xl focus:rounded-3xl duration-500 focus:bg-gray-500'></input>
                <div>
                <input type='checkbox' className='bg-gray-400'></input>
                <label>Agree with the term</label>
                </div>
                <button className='bg-gray-400 p-2 rounded-2xl hover:bg-gray-500'>Register</button>
            </div>
            </form>
         </div>

    </div>
  )
}
