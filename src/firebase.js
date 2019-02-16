import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAZ6WMMMrGFlWoMst3G9CnxKDoz-aD35hk",
  authDomain: "ferabook-ec3ce.firebaseapp.com",
  databaseURL: "https://ferabook-ec3ce.firebaseio.com",
  projectId: "ferabook-ec3ce",
  storageBucket: "ferabook-ec3ce.appspot.com",
  messagingSenderId: "849178175332"
};

firebase.initializeApp(config);

export default firebase;