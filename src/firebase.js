import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCvu8IiajFU_lpTOogQ22DfK_rwNSUSw4E",
  authDomain: "project-pizza-51b14.firebaseapp.com",
  projectId: "project-pizza-51b14",
  storageBucket: "project-pizza-51b14.firebasestorage.app",
  messagingSenderId: "1036016957503",
  appId: "1:1036016957503:web:27a8502c54ef7e0962608a",
  measurementId: "G-F9FHMNXK2K"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);


// TODO: Add SDKs for Firebase products that you want to use

