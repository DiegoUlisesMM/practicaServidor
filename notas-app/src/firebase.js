
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAEGErEAeM6uIgaR145gkI6rUZAHJmPNKc",
  authDomain: "test-push-19cb1.firebaseapp.com",
  projectId: "test-push-19cb1",
  storageBucket: "test-push-19cb1.appspot.com",
  messagingSenderId: "441656737676",
  appId: "1:441656737676:web:1e6a76bb5a6709f690a0a9",
  measurementId: "G-G4S095121J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const messaging = getMessaging(app);