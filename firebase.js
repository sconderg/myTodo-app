import firebase from 'firebase'; 

const firebaseConfig = {
    apiKey: "AIzaSyAzVWBB6tzDPz97268WYNO9cgri56ft-f0",
    authDomain: "sconder-todo.firebaseapp.com",
    projectId: "sconder-todo",
    storageBucket: "sconder-todo.appspot.com",
    messagingSenderId: "822663543642",
    appId: "1:822663543642:web:6f96d53477a236624b1163"
};

const app = firebase.apps.length < 1 ? firebase.initializeApp(firebaseConfig) : firebase.app();
const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };