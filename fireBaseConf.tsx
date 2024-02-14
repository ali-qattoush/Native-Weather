import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCFio51ORThD_By7LZLBLBJQw54woad7z4",
  authDomain: "nativeweather.firebaseapp.com",
  projectId: "nativeweather",
  storageBucket: "nativeweather.appspot.com",
  messagingSenderId: "949635194924",
  appId: "1:949635194924:web:d488cffaece7bebefc7189",
  measurementId: "G-025ZTG3QB7"
};


export const fireApp = initializeApp(firebaseConfig);
