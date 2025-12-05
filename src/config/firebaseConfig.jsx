import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAESqKdeIT6yhsv5pXt4SEpitiVcLKblGA",
  authDomain: "authifes-72794.firebaseapp.com",
  projectId: "authifes-72794",
  storageBucket: "authifes-72794.firebasestorage.app",
  messagingSenderId: "151149901444",
  appId: "1:151149901444:web:99e84c329320a326c3f4d1"
};
 
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);