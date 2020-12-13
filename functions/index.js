const functions = require('firebase-functions');

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmbhoJ3ueIYrZYWe5KzGiLOMLnd5-7V68",
  authDomain: "vira-db.firebaseapp.com",
  databaseURL: "https://vira-db-default-rtdb.firebaseio.com",
  projectId: "vira-db",
  storageBucket: "vira-db.appspot.com",
  messagingSenderId: "252309077205",
  appId: "1:252309077205:web:de0ce8e57f996fdf06f65c",
  measurementId: "G-6FT7CDJ9YZ"
};

// Initialize Firebase
  firebase.initializeApp(firebaseConfig);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
