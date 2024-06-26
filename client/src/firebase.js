// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPLs_VxKfzZDpAI7LoneUom6Co97vXm0g",
  authDomain: "brotein-auth.firebaseapp.com",
  projectId: "brotein-auth",
  storageBucket: "brotein-auth.appspot.com",
  messagingSenderId: "914346592952",
  appId: "1:914346592952:web:98c4df43e8e19c4c35c24d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);