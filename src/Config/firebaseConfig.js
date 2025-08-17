const firebase = require("firebase/compat/app");
require("firebase/compat/firestore");
const firebaseConFig = {
  apiKey: "AIzaSyCzW2aV5La-iy9kZnPcXI2JZ1KTPZ4aBxM",
  authDomain: "demostudent-e5460.firebaseapp.com",
  projectId: "demostudent-e5460",
  storageBucket: "demostudent-e5460.firebasestorage.app",
  messagingSenderId: "832737956740",
  appId: "1:832737956740:web:9a5e41110e3f8f0368c3d1",
  measurementId: "G-R33QYWV452"
};
firebase.initializeApp(firebaseConFig);
const db = firebase.firestore();
const User = db.collection("Users");
const Otp = db.collection("OTP");
module.exports = {User,Otp};  