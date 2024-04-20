// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAybB33mEGoxXLuN24BpzEUBaujFnitmM",
  authDomain: "roadmap-star1.firebaseapp.com",
  projectId: "roadmap-star1",
  storageBucket: "roadmap-star1.appspot.com",
  messagingSenderId: "306275881082",
  appId: "1:306275881082:web:6995b5ef29636f46c9abc3",
  measurementId: "G-KD4ZMRDG93"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = firebase.auth();
export default firebase;