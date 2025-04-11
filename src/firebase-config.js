// firebase-config.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Configuración de Firebase que has proporcionado
const firebaseConfig = {
  apiKey: "AIzaSyBcTTg-DfBP2f9qTnEIEFC_tGplL5WFmYU",
  authDomain: "trg-studio-b1b2d.firebaseapp.com",
  projectId: "trg-studio-b1b2d",
  storageBucket: "trg-studio-b1b2d.firebasestorage.app",
  messagingSenderId: "417779597476",
  appId: "1:417779597476:web:760883e6dc13e72710a631",
  measurementId: "G-WFDHXH8D4J"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
const db = getFirestore(app);

// Inicializa Analytics (opcional, si lo deseas)
const analytics = getAnalytics(app);

export { db };