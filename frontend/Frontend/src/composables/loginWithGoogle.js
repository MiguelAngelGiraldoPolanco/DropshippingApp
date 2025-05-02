// src/firebase/loginWithGoogle.js
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/firebaseConfig";

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("Usuario logueado:", user);
    return user;
  } catch (error) {
    console.error("Error al iniciar sesión con Google:", error);
    return null;
  }
};
