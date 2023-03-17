import logo from './logo.svg';
import './App.css';
import {auth,GoogleAuth} from '../src/component/firebase';
import {createUserWithEmailAndPassword,signInWithPopup,signOut} from 'firebase/auth'
import { useState } from 'react';
import { useEffect } from 'react';
function App() {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

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
  useEffect(()=>
  {
  },)
  return (
    <div className="App">
      <h1>Firebase</h1>
      <input placeholder='email' onChange={(event)=>
      {
        setEmail(event.target.value)
      }}></input><br/>
      <input placeholder='password' onChange={(event)=>
      {
        setPassword(event.target.value)
      }}></input><br/>
      <button type='submit' onClick={SignIn
      }>Submit</button><br/>
      <button type='submit' onClick={SignInWithGoogle}>SignIn With Google</button>
      <button type='submit' onClick={Logout}>Logout</button>
    </div>
  );
}

export default App;
