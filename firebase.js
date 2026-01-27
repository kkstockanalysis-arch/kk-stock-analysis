// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHxK7Zg-JJB4fYiXe2J_Z-wcLeTIdDm1c",
  authDomain: "kk-stock-analysis-d7b43.firebaseapp.com",
  projectId: "kk-stock-analysis-d7b43",
  storageBucket: "kk-stock-analysis-d7b43.firebasestorage.app",
  messagingSenderId: "338926544975",
  appId: "1:338926544975:web:f1598c672a002f706ca23a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firebase Authentication reference
const auth = firebase.auth();
