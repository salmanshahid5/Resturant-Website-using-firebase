import {
  auth,
  signInWithEmailAndPassword,
  collection,
  db,
  getDocs,
} from "./firebase.js";

const login = () => {
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      if (user.email == "admin@gmail.com") {
        location.href = "../dashboard.html";
        email.value = "";
        password.value = "";
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

// <------------- get resturants from firestore------------>

const getResturants = async () => {
  const q = collection(db, "resturants");
  const resList = document.getElementById("res-list");
  resList.innerHTML = "";
  const querySnapshot = await getDocs(q);
  let index = 0;
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    index++;
    resList.innerHTML += `<tr>
                        <th scope="col">${index}</th>
                        <th scope="col"> <img class='res-logo' src="${
                          doc.data().image
                        }" alt=""></th>
                        <th scope="col">${doc.data().name}</th>
                        <th scope="col">${doc.data().address}</th>
                    </tr>`;
  });
};
getResturants();
