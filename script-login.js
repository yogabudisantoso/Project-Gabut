// function togglePasswordVisibility(passwordId) {
//   const passwordInput = document.getElementById(passwordId);
//   const eyeIcon = document.querySelector(".eye-icon");

//   if (passwordInput.type === "password") {
//     passwordInput.type = "text";
//     eyeIcon.src = "img/eye.png"; // Ganti dengan path gambar mata yang sesuai
//   } else {
//     passwordInput.type = "password";
//     eyeIcon.src = "img/eye-off.png"; // Ganti dengan path gambar mata yang sesuai
//   }
// }

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase,
  set,
  ref,
  update
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import {
  getAuth,
  // createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,  
  signInWithPopup, 
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpPMIH5MezLiECAmWI5mx6wXUOgsCmSdw",
  authDomain: "giving-41912.firebaseapp.com",
  databaseURL: "https://giving-41912-default-rtdb.firebaseio.com",
  projectId: "giving-41912",
  storageBucket: "giving-41912.appspot.com",
  messagingSenderId: "698184237725",
  appId: "1:698184237725:web:26fdee84de071a27660a74",
  measurementId: "G-7JFN2L5ZD0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
// signInWithRedirect(auth, provider);

const provider = new GoogleAuthProvider(app);


// signUp.addEventListener("click", (e) => {
//   var email = document.getElementById("email").value;
//   var password = document.getElementById("password").value;
//   //   var username = document.getElementById("usename").value;
//   createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       // Signed up
//       const user = userCredential.user;

//       set(ref(database, "user/" + user.uid), {
//         password: password,
//         email: email,
//       });

//       alert("user created!");
//       // ...
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       alert(errorMessage);
//       // ..
//     });
// });

login.addEventListener("click", (e) => {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      const dt = new Date();
      update(ref(database, "user/" + user.uid), {
        last_login: dt,
      });

      alert('user loged in!');
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(errorMessage);
    });
});

// const google = document.getElementById("google");

google.addEventListener('click',(e) => {

  signOut(auth).then(() => {
// Sign-out successful.
}).catch((error) => {
// An error happened.
});

// signInWithPopup(auth, provider)
//   .then((result) => {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;
//     // The signed-in user info.
//     const user = result.user;


//     alert(user.displayName);
//     // IdP data available using getAdditionalUserInfo(result)
//     // ...
//   }).catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.customData.email;
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     // ...

//     alert(errorMessage);
//   });
  signInWithRedirect(auth, provider);
  getRedirectResult(auth)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access Google APIs.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
    })