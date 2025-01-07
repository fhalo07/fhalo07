import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"; // Add Firestore imports

const firebaseConfig = {
    apiKey: "AIzaSyBB7QoPCF7j5hHp37ZoXESRYDbDxmJvI18",
    authDomain: "login-d6c0c.firebaseapp.com",
    projectId: "login-d6c0c",
    storageBucket: "login-d6c0c.appspot.com", // Corrected 'storageBucket' value
    messagingSenderId: "76381852144",
    appId: "1:76381852144:web:c9cf87f82f8d63ccd84d35",
    measurementId: "G-VR7K6Y9QSS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(); // Initialize Firestore

onAuthStateChanged(auth, (user) => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
        console.log(user);
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    document.getElementById('loggedUserFName').innerText = userData.firstName;
                    document.getElementById('loggedUserEmail').innerText = userData.email;
                    document.getElementById('loggedUserLName').innerText = userData.lastName;
                } else {
                    console.log("No document found matching ID");
                }
            })
            .catch((error) => {
                console.error("Error getting document:", error);
            });
    } else {
        console.log("User ID not found in local storage");
    }
});

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
        .then(() => {
            window.location.href = 'index.html';
        })
        .catch((error) => {
            console.error('Error signing out:', error);
        });
});
