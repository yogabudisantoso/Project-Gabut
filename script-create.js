import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
    import {
      getDatabase,
      set,
      ref,
    } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
    import {
      getAuth,
      createUserWithEmailAndPassword,
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
    const auth = getAuth();
    const signUp = document.getElementById("signUp");

    signUp.addEventListener("click", async(e) => {
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var name = document.getElementById("nama").value
      //   var username = document.getElementById("usename").value;
        createUserWithEmailAndPassword(auth, email, password, name)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;

          set(ref(database, "user/" + user.uid), {
            password: password,
            email: email,
            nama: name,
          });

          alert("user created!");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
          // ..
        });
    });