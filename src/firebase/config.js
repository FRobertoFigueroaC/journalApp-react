// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeOU3uwbk-PGn7m2pPNmpexS5vWLLoUY0",
  authDomain: "journal-app-6c3d2.firebaseapp.com",
  projectId: "journal-app-6c3d2",
  storageBucket: "journal-app-6c3d2.appspot.com",
  messagingSenderId: "630167966596",
  appId: "1:630167966596:web:633eaf3c45501e3ea083d1"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDB = getFirestore(firebaseApp);