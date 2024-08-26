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
  const resList = document.getElementById('res-list'); 
  resList.innerHTML = '';
  const q = collection(db, "resturants");
  const querySnapshot = await getDocs(q);
  
  querySnapshot.forEach((doc) => {
    // const data = doc.data(); 
    console.log(doc.data());
    resList.innerHTML += ` <div class="col mb-4">
                  <div class="card"">
                      <img src="${doc.data().image}"
                          class="card-img-top" alt="..." loading="lazy">
                      <div class="card-body">
                          <h5 class="card-title">${doc.data().name}</h5>
                          <p class="card-text">All variety are available
                          </p>
                          <p>
                              <span class="badge login">Biryani</span>
                              <span class="badge login">Karahi</span>
                              <span class="badge login">Drinks</span>
                          </p>
                          <a href="../dishes.html?restaurant=${doc.id
                }" class="btn signup">View all dishes</a>
                      </div>
                  </div>
                   </div>`
  
  });
};

getResturants();

