import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBn8j6LyOjfSTGf2y-MrRQCooaCRBrIKc8",
  authDomain: "app30dias.firebaseapp.com",
  databaseURL: "https://app30dias.firebaseio.com",
  projectId: "app30dias",
  storageBucket: "app30dias.appspot.com",
  messagingSenderId: "1006812619620"
};

const firebaseAdmin = firebase.initializeApp(config, 'firebaseAdmin');

export default firebaseAdmin;