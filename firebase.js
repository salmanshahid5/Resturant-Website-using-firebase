import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { getAuth,signInWithEmailAndPassword,onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC-O_FRKRgj2FOzl352w2xmGQjDd4AsY4o",
  authDomain: "foodpanda-a93a3.firebaseapp.com",
  projectId: "foodpanda-a93a3",
  storageBucket: "foodpanda-a93a3.appspot.com",
  messagingSenderId: "819348422008",
  appId: "1:819348422008:web:3b2be8ebaa7107d0189c8d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)


export{
    auth,signInWithEmailAndPassword,onAuthStateChanged 
}