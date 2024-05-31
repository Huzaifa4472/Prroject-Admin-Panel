import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { getRemoteConfig } from "firebase/remote-config";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5CpxfZHLwfsFgaD2aL9A1yzGvqmFwE-Y",
  authDomain: "my-new-app-d0eb8.firebaseapp.com",
  databaseURL: "https://my-new-app-d0eb8-default-rtdb.firebaseio.com",
  projectId: "my-new-app-d0eb8",
  storageBucket: "my-new-app-d0eb8.appspot.com",
  messagingSenderId: "285978478135",
  appId: "1:285978478135:web:4ea682b5f68afc2923a1b2",
  measurementId: "G-M2LKNKM4M2",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
export const database = getDatabase(app);
export const remoteConfig = getRemoteConfig(app);
// remoteConfig.settings.minimumFetchIntervalMillis = 3600000;
// const firebase = await fetchAndActivate(remoteConfig);
