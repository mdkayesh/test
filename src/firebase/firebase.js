import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const sectorsColl = collection(db, "sectors");

const getSectors = async () => {
  try {
    const q = query(sectorsColl, orderBy("title", "asc"));
    const res = await getDocs(q);

    const sectors = res.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });

    return sectors;
  } catch (error) {
    return error;
  }
};

const submitData = async (data, userId) => {
  try {
    const userColl = doc(db, "users", userId);
    setDoc(userColl, data);
    return "Successfully submitted your data";
  } catch (error) {
    return "Something went wrong";
  }
};

const logInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const res = await signInWithPopup(auth, provider);
    return res.user;
  } catch (error) {
    console.log(error);
  }
};

const getUserData = async (userId) => {
  try {
    const docRef = doc(db, "users", userId);
    const data = await getDoc(docRef);
    console.log("data", data.data(), userId);
    return { ...data.data(), id: data.id };
  } catch (error) {
    console.log(error);
  }
};

export { getSectors, submitData, logInWithGoogle, getUserData };
