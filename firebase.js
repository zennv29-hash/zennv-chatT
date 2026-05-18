import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {

  apiKey: "AIzaSyBCbiNTDFk0ikTJRG_8hWaaOcyJYjS9dtI",

  authDomain: "zennv-chat.firebaseapp.com",

  projectId: "zennv-chat",

  storageBucket: "zennv-chat.firebasestorage.app",

  messagingSenderId: "233720349369",

  appId: "1:233720349369:web:387f9a6a681e70bbfed168",

  measurementId: "G-1PXGM1F61T"

};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);