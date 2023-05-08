import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyALYMDy6d5711xrs4XEo6TjB7JUZikMSG0",
  authDomain: "project1-8974f.firebaseapp.com",
  projectId: "project1-8974f",
  storageBucket: "project1-8974f.appspot.com",
  messagingSenderId: "906821922408",
  appId: "1:906821922408:web:5cb633852fc9b1f718d5dd",
  measurementId: "G-G0RX1L71J9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
