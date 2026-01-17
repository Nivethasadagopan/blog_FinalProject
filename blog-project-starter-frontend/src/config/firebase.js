// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDvPnb1m6JsnwFQYt-n1IXYPW1mQP2nSEY",
  authDomain: "blopfinalproject.firebaseapp.com",
  projectId: "blopfinalproject",
  storageBucket: "blopfinalproject.firebasestorage.app",
  messagingSenderId: "1082519882982",
  appId: "1:1082519882982:web:46fbbdeca0c4373cf63f27",
  measurementId: "G-81MCFG8LCT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

const db = getFirestore(app);

export { auth,db }; // named exports

export default auth;// keeping default export for backward compatibility