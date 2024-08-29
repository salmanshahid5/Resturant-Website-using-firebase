import { auth, onAuthStateChanged,signOut} from "./firebase.js";

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

  document.getElementById('logout')
  .addEventListener("click", () => {
    signOut(auth)
      .then(() => {
        console.log("User logged out successfully.");
        alert("You have been logged out.");
        window.location.href = "index.html"; 
      })
      .catch((error) => {
        // An error happened.
        console.error("Error logging out:", error);
        alert("Error logging out. Please try again.");
      });
  });;
