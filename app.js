import { auth, signInWithEmailAndPassword } from "./firebase.js";

const login = () => {
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      if (user.email == "admin@gmail.com") {
        location.href = "../dashboard.html";
        email.value = '';
        password.value = '';
      } else {
        alert("You do not have permission to access this page.");
      }
    })
    .catch((error) => {
      // const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
};

const loginbtn = document.getElementById("loginbtn");
loginbtn && loginbtn.addEventListener("click", login);
