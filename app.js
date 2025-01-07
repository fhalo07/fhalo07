// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Signup function
function signup() {
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const message = document.getElementById('signup-message');

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            message.textContent = "Signup successful!";
            message.style.color = "green";
            console.log(userCredential.user);
        })
        .catch((error) => {
            message.textContent = error.message;
            message.style.color = "red";
        });
}

// Login function
function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const message = document.getElementById('login-message');

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            message.textContent = "Login successful!";
            message.style.color = "green";
            console.log(userCredential.user);
        })
        .catch((error) => {
            message.textContent = error.message;
            message.style.color = "red";
        });
}
