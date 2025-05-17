 // Import the functions you need from the SDKs you need
 import { initializeApp } from "firebase/app";
 import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries
 
 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyBsyuMHsl6tLBqGzE4kondFrtZjZtPuHeo",
   authDomain: "vintagecamera-ab686.firebaseapp.com",
   projectId: "vintagecamera-ab686",
   storageBucket: "vintagecamera-ab686.firebasestorage.app",
   messagingSenderId: "864475977777",
   appId: "1:864475977777:web:2d2287f1fd4c01cc2f5d10"
 };
 
 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 // Inicializar Auth y Provider de Google
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };