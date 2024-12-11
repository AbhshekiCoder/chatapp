import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from  "firebase/storage";
import {getAuth} from "firebase/auth";
import 'firebase/database';
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTFlQLnSF4UqMGhn0VNo7NlSZ8LM33r5w",
  authDomain: "chat-app-4c698.firebaseapp.com",
  databaseURL: "https://chat-app-4c698-default-rtdb.firebaseio.com",
  projectId: "chat-app-4c698",
  storageBucket: "chat-app-4c698.appspot.com",
  messagingSenderId: "288004856629",
  appId: "1:288004856629:web:4506676d01fac277b78a7c",
  measurementId: "G-PB72NS9DSD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const auth = getAuth(app);
const database = getDatabase(app)

 export  {app, auth, database}
 