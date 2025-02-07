// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyB6Tb5sxN1R77eBqAlyCuGU3XC38N-A5l8",
  authDomain: "task-management-app-4b333.firebaseapp.com",
  projectId: "task-management-app-4b333",
  storageBucket: "task-management-app-4b333.appspot.com",
  messagingSenderId: "335234666446",
  appId: "1:335234666446:web:5eba52d3f03a379625659f",
  measurementId: "G-NLS1FWT6CK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { auth, db, storage };
