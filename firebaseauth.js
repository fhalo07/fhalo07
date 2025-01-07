// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBB7QoPCF7j5hHp37ZoXESRYDbDxmJvI18",
  authDomain: "login-d6c0c.firebaseapp.com",
  projectId: "login-d6c0c",
  storageBucket: "login-d6c0c.appspot.com", // Fixed typo here
  messagingSenderId: "76381852144",
  appId: "1:76381852144:web:c9cf87f82f8d63ccd84d35",
  measurementId: "G-VR7K6Y9QSS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Helper function to show messages
function showMessage(message, divId) {
  const messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(() => {
    messageDiv.style.opacity = 0;
  }, 5000);
}

// Sign Up Event Listener
const signUp = document.getElementById("submitSignUp");
signUp.addEventListener("click", async (event) => {
  event.preventDefault();
  const email = document.getElementById("rEmail").value;
  const password = document.getElementById("rPassword").value;
  const firstName = document.getElementById("fName").value;
  const lastName = document.getElementById("lName").value;

  const auth = getAuth();
  const db = getFirestore();

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userData = {
      email: email,
      firstName: firstName,
      lastName: lastName,
    };

    const docRef = doc(db, "users", user.uid);
    await setDoc(docRef, userData);

    showMessage("Account Created Successfully", "signUpMessage");
    window.location.href = "index.html";
  } catch (error) {
    const errorCode = error.code;
    if (errorCode === "auth/email-already-in-use") {
      showMessage("Email Address Already Exists !!!", "signUpMessage");
    } else {
      console.error("Error creating user:", error);
      showMessage("Unable to create user. Please try again.", "signUpMessage");
    }
  }
});

// Sign In Event Listener
const signIn = document.getElementById("submitSignIn");
signIn.addEventListener("click", async (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const auth = getAuth();

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    showMessage("Login is successful", "signInMessage");
    localStorage.setItem("loggedInUserId", user.uid);
    window.location.href = "gallery.html";
  } catch (error) {
    const errorCode = error.code;
    if (errorCode === "auth/wrong-password") {
      showMessage("Incorrect Password", "signInMessage");
    } else if (errorCode === "auth/user-not-found") {
      showMessage("Account does not exist", "signInMessage");
    } else {
      console.error("Error signing in:", error);
      showMessage("An unexpected error occurred. Please try again.", "signInMessage");
    }
  }
});
