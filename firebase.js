import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-storage.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  where,
  query,
  getDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyBiJGQSA9ik7mribyLBjMKW5q0T_2grqLA",
  authDomain: "food-panda-2.firebaseapp.com",
  projectId: "food-panda-2",
  storageBucket: "food-panda-2.appspot.com",
  messagingSenderId: "1067346731195",
  appId: "1:1067346731195:web:7ca623b3750b7f7968499e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)
const storage = getStorage(app);

export {
  auth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  db,
  collection,
  addDoc,
  getDocs,
  where,
  query,
  getDoc,
  doc,
  serverTimestamp,
  updateDoc,
  signOut,
};
