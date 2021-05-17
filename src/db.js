import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';
import "firebase/analytics";

const settings = {timestampsInSnapshots: true};

// Get a Firestore instance

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCDHAgnf2fAkdPSMBLKNtQtmQPAjkxIc2Q",
    authDomain: "help-you-help-us.firebaseapp.com",
    databaseURL: "https://help-you-help-us.firebaseio.com",
    projectId: "help-you-help-us",
    storageBucket: "help-you-help-us.appspot.com",
    messagingSenderId: "994298597409",
    appId: "1:994298597409:web:d3c618a4d3925b69041360",
    measurementId: "G-WM47ZH68LW"
  };
firebase.initializeApp(firebaseConfig);

firebase.firestore().settings(settings);

export default firebase;