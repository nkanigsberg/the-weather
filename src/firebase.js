import firebase from "firebase/app";
import "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGLQ0nTfj4mfoTHmafn5bUwAJLfz7bf_k",
  authDomain: "weather-app-db102.firebaseapp.com",
  databaseURL: "https://weather-app-db102.firebaseio.com",
  projectId: "weather-app-db102",
  storageBucket: "weather-app-db102.appspot.com",
  messagingSenderId: "43100392282",
  appId: "1:43100392282:web:a7de5bc1a8d3446cb18163",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;