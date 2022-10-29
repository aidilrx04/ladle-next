import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDaaf8MytbOCQ-yLeVQr5DoUeumKq6E8Hw",
    authDomain: "scramble-me-40e8f.firebaseapp.com",
    projectId: "scramble-me-40e8f",
    storageBucket: "scramble-me-40e8f.appspot.com",
    messagingSenderId: "474157322031",
    appId: "1:474157322031:web:f15f13c94fb6ef8fdc1bda"
};

// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// let firebase;
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}
export const db = firebase.firestore();
export const auth = firebase.auth();


// export default app;