import 'firebase/compat/storage';
import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { initializeFirestore } from "firebase/firestore";
import { firebaseConfig } from '../config';


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
})
export const authentication = getAuth(app);
export const storage = getStorage(app);
export const imgStorage = firebase.storage;
