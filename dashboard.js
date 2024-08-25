import { auth, onAuthStateChanged } from "./firebase.js";

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log(user.email);
     if(user.email !== 'admin@gmail.com'){
        location.href = '../login/login.html'
     }
    } else {
        console.log('No user is currently logged in.');
        location.href = '../login/login.html';
    }
  });