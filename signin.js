<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
  import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBB7QoPCF7j5hHp37ZoXESRYDbDxmJvI18",
    authDomain: "login-d6c0c.firebaseapp.com",
    projectId: "login-d6c0c",
    storageBucket: "login-d6c0c.firebasestorage.app",
    messagingSenderId: "76381852144",
    appId: "1:76381852144:web:c9cf87f82f8d63ccd84d35",
    measurementId: "G-VR7K6Y9QSS"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

const email = document.getElementById('email').value;
const password = document.getElementById('password').value;
const submit = document.getElementById('submit').value;

submit.addEventListener("click",function(event){
const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });  
</script>
