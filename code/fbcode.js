var firebaseConfig = {
    apiKey: "AIzaSyBroxZ7MFy2cXE10I38UY8xTgjnQFAc6dw",
    authDomain: "tienda-de-productos1.firebaseapp.com",
    projectId: "tienda-de-productos1",
    storageBucket: "tienda-de-productos1.appspot.com",
    messagingSenderId: "286525481195",
    appId: "1:286525481195:web:7df03829c4dbdc1e8d5eae"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//firebase const
const db = firebase.firestore()
const storageRef = firebase.storage().ref();

/* const */

const firestoredb = 'Album';
const imageStorage = 'imagesAlbum/'; // remember last /
const videoStorage = 'videosAlbum/'; // remember last /


