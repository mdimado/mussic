


import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import { getAnalytics } from "firebase/analytics";





const firebaseConfig = {
 
  apiKey: "AIzaSyDSePWIC3vjKXwUYKuSpk01vSu6nNBVhNY",
  authDomain: "spotify-clone-5ab74.firebaseapp.com",
  projectId: "spotify-clone-5ab74",
  storageBucket: "spotify-clone-5ab74.appspot.com",
  messagingSenderId: "607253520689",
  appId: "1:607253520689:web:cce297a85fdafa9c2b9010"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app;
