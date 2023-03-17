// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider,GoogleAuthProviderG} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAX-hwoo2k66M8nFPEmV1Q54WY5F90iIDo",
  authDomain: "firstfirebaseproject-6a2e6.firebaseapp.com",
  projectId: "firstfirebaseproject-6a2e6",
  storageBucket: "firstfirebaseproject-6a2e6.appspot.com",
  messagingSenderId: "725480197512",
  appId: "1:725480197512:web:eda0f9ac2e1eb8474e3e3d",
  measurementId: "G-CZRFDGJFBG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const GoogleAuth= new GoogleAuthProvider();