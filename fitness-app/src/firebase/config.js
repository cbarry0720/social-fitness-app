import {initializeApp} from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: 'AIzaSyCNsJElmu3epiowQzjuRsfGbg6okES_IL8',
  authDomain: 'fitluence.firebaseapp.com',
  databaseURL: 'https://fitluence-default-rtdb.firebaseio.com/',
  projectId: 'fitluence',
  storageBucket: 'fitluence.appspot.com',
  messagingSenderId: '472854107183',
  appId: '1:472854107183:ios:54d08869f7a146cad322da',
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app)
const auth = getAuth(app);

export {auth, app, firestore, storage};