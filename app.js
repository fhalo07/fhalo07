// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBB7QoPCF7j5hHp37ZoXESRYDbDxmJvI18",
    authDomain: "login-d6c0c.firebaseapp.com",
    projectId: "login-d6c0c",
    storageBucket: "login-d6c0c.firebasestorage.app",
    messagingSenderId: "76381852144",
    appId: "1:76381852144:web:c9cf87f82f8d63ccd84d35",
    measurementId: "G-VR7K6Y9QSS"
  };

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
