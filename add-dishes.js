import {
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  collection,
  db,
  getDocs,
  addDoc,
} from "./firebase.js";

// <------------- store image from firestorage------------>
let uploadFile = (file, name) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `images/${name.split(" ").join("-")}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          resolve(downloadURL);
        });
      }
    );
  });
};

// <------------- get resturants from firestore------------>

const getResturants = async () => {
  const selectRes = document.getElementById("restaurant-name");
  selectRes.innerHTML = "";
  const q = collection(db, "resturants");
  const querySnapshot = await getDocs(q);
  selectRes.innerHTML = `<option selected disabled>Select restaurant</option>`;
  querySnapshot.forEach((doc) => {
    // const data = doc.data();
    console.log(doc.data());
    selectRes.innerHTML += `<option value='${doc.id}'>${
      doc.data().name
    }</option>`;
  });
};

getResturants();

// <------------- get Dishes from firestore------------>

// const getDishes = async () => {
//   const allDishes = document.getElementById("all-dishes");
//   allDishes.innerHTML = "";
//   const q = collection(db, "Dishes");
//   const querySnapshot = await getDocs(q);
//   let index = 0;
//   let restaurants = [];
//   allDishes.innerHTML = ``;
//   querySnapshot.forEach((doc) => {
//     // const data = doc.data();
//     console.log(doc.data());
//     restaurants.push(doc.data())
//     index++;
//     allDishes.innerHTML += `<tr>
//                         <th scope="row">${index}</th>
//                         <td><img class="dish-image" src="${doc.data().image}" alt=""></td>
//                         <td>${doc.data().name}</td>
//                         <td>${doc.data().price}</td>
//                         <td>${doc.data().serving}</td>
//                         <td></td>
//                     </tr>`;
//   });
//   console.log(restaurants);
// };


// getDishes();
const getDishes = async () => {
  const allDishes = document.getElementById("all-dishes");
  allDishes.innerHTML = "";
  
  // Fetch all restaurants first
  const restaurantMap = new Map();
  const restaurantSnapshot = await getDocs(collection(db, "resturants"));
  restaurantSnapshot.forEach((doc) => {
    restaurantMap.set(doc.id, doc.data().name);
  });

  // Fetch all dishes
  const q = collection(db, "Dishes");
  const querySnapshot = await getDocs(q);
  let index = 0;
  let dishes = [];

  allDishes.innerHTML = ``; 

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    dishes.push(data);
    index++;

    // Get the restaurant name from the map
    const restaurantName = restaurantMap.get(data.restaurant) || "Unknown";

    allDishes.innerHTML += `<tr>
                        <th scope="row">${index}</th>
                        <td><img class="dish-image" src="${data.image}" alt=""></td>
                        <td>${data.name}</td>
                        <td>${data.price}</td>
                        <td>${data.serving}</td>
                        <td>${restaurantName}</td> <!-- Add restaurant name here -->
                    </tr>`;
  });

  console.log(dishes);
};

getDishes();

// <------------------ dishes ---------------->

const addDish = document.getElementById("addDish");
addDish.addEventListener("click", async () => {
  const closeBtn = document.getElementById("close-btn");
  const spinner = document.getElementById("dish-spinner");
  const resName = document.getElementById("restaurant-name");
  const dishName = document.getElementById("dish-name");
  const dishPrice = document.getElementById("dish-price");
  const dishServing = document.getElementById("dish-serving");
  const dishImage = document.getElementById("dish-image");
  spinner.style.display = "block";
  const image = await uploadFile(dishImage.files[0], dishName.value);
  const dishDetail = {
    restaurant: resName.value,
    name: dishName.value,
    price: dishPrice.value,
    serving: dishServing.value,
    image,
  };
  const docRef = await addDoc(collection(db, "Dishes"), dishDetail);
  resName.value = "";
  dishName.value = "";
  dishPrice.value = "";
  dishServing.value = "";
  dishImage.value = "";
  spinner.style.display = "none";
  closeBtn.click();
  getDishes()
  console.log(docRef);
});
