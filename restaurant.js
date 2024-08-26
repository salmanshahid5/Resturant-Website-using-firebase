import {
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  collection,
  addDoc,
  db,
  getDocs,
} from "./firebase.js";

const logo = document.getElementById("restaurant-logo");
const selectedlogo = document.getElementById("selected-logo");
let file;

logo.addEventListener("change", (e) => {
  file = e.target.files[0];
  if (file) {
    selectedlogo.style.display = "block";
    selectedlogo.src = URL.createObjectURL(file);
  }
});

// <------------------- store image in storage --------------------->

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

// <------------- submit resturants data from modal ----------->

const submitRestaurant = document.getElementById("submit-restaurant");
submitRestaurant.addEventListener("click", async () => {
  const restaurantSpinner = document.getElementById("restaurant-spinner");
  restaurantSpinner.style.display = "block";

  const name = document.getElementById("restaurant-name");
  const address = document.getElementById("restaurant-address");
  console.log(name.value, address.value);

  if (!file || !name.value || !address.value) {
    alert("Please fill in all fields and select a logo.");
    restaurantSpinner.style.display = "none";
    return;
  }

  try {
    const image = await uploadFile(file, name.value);

    const docRef = await addDoc(collection(db, "resturants"), {
      name: name.value,
      address: address.value,
      image,
    });

    console.log("Document written with ID: ", docRef.id);

    name.value = "";
    address.value = "";
    logo.value = "";
    selectedlogo.style.display = "none";
    const closeBtn = document.getElementById("close-btn");
    getResturants();
    closeBtn.click();
  } catch (error) {
    console.error("Error uploading file or adding document: ", error);
    alert("There was an error. Please try again.");
  } finally {
    restaurantSpinner.style.display = "none";
  }
});
