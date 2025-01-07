  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";

  const firebaseConfig = {
    apiKey: "AIzaSyBB7QoPCF7j5hHp37ZoXESRYDbDxmJvI18",
    authDomain: "login-d6c0c.firebaseapp.com",
    projectId: "login-d6c0c",
    storageBucket: "login-d6c0c.firebasestorage.app",
    messagingSenderId: "76381852144",
    appId: "1:76381852144:web:c9cf87f82f8d63ccd84d35",
    measurementId: "G-VR7K6Y9QSS"
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);

const username = document.getElementById("username").value;
const password = document.getElementById("password").value;

const password = document.getElementById("submit");

submit.addEventListener('click', function(event){
event.preventDefault();
alert("works")  
})
